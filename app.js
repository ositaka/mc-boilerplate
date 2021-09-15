require('dotenv').config();

const logger = require('morgan');
const express = require('express');
const methodOverride = require('method-override');

const port = 3030;
const app = express();
const path = require('path');

const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride());
// app.use(errorHandler());
app.use(express.static(path.join(__dirname, 'public')));

const Prismic = require('@prismicio/client');
const PrismicDOM = require('prismic-dom');
const UAParser = require('ua-parser-js');

const initApi = (req) => {
  return Prismic.getApi(process.env.PRISMIC_ENDPOINT, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    req
  });
};

const handleLinkResolver = (doc) => {
  if (doc.type === '404') {
    return `/${doc.lang}/`;
  }

  if (doc.type === 'home') {
    return `/${doc.lang}/`;
  }

  if (doc.type === 'page') {
    return `/${doc.lang}/${doc.uid}/`
    // if (doc.data.parent_page === undefined) {
    //   return (doc.data.parent_page.id ? `/${doc.lang}/${doc.data.parent_page.uid}/${doc.uid}/` : `/${doc.lang}/${doc.uid}/`)
    // } else {
    // }
  }

  if (doc.type === 'the_media') {
    return `/${doc.lang}/${doc.uid}/`;
  }

  if (doc.type === 'media_page') {
    return (doc.data.parent_page.id ? `/${doc.lang}/${doc.data.parent_page.uid}/${doc.uid}/` : `/${doc.lang}/${doc.uid}/`)
  }

  if (doc.type === 'approach') {
    return `/${doc.lang}/${doc.uid}/`;
  }

  if (doc.type === 'work') {
    return `/${doc.lang}/${doc.uid}/`;
  }

  if (doc.type === 'work_page') {
    return (doc.data.parent_page.id ? `/${doc.lang}/${doc.data.parent_page.uid}/${doc.uid}/` : `/${doc.lang}/${doc.uid}/`)
  }

  if (doc.type === 'the_creators') {
    return `/${doc.lang}/${doc.uid}/`;
  }

  if (doc.type === 'contacts') {
    return `/${doc.lang}/${doc.uid}/`;
  }

  if (doc.type === 'price_packs') {
    return `/${doc.lang}/${doc.uid}/`;
  }

  if (doc.type === 'pack') {
    return (doc.data.parent_page.id ? `/${doc.lang}/${doc.data.parent_page.uid}/${doc.uid}/` : `/${doc.lang}/${doc.uid}/`)
  }

  return `/${doc.lang}/`;
};

app.use((req, res, next) => {
  const ua = UAParser(req.headers['user-agent']);

  res.locals.isDesktop = ua.device.type === undefined;
  res.locals.isPhone = ua.device.type === 'mobile';
  res.locals.isTablet = ua.device.type === 'tablet';

  res.locals.Link = handleLinkResolver;

  res.locals.Numbers = (index) => {
    return index == 0
      ? 'One'
      : index == 1
        ? 'Two'
        : index == 2
          ? 'Three'
          : index == 3
            ? 'Four'
            : '';
  };

  res.locals.PrismicDOM = PrismicDOM;

  next();
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const handleRequest = async (api, lang) => {
  const intro = await api.getSingle('intro', { lang });
  const footer = await api.getSingle('footer', { lang });
  const navigation = await api.getSingle('nav_test', { lang });
  const preloader = await api.getSingle('preloader', { lang });

  console.log('——————— Normal NAME', navigation.data.nav[0].primary.label[0].text)
  console.log('——————— Normal LINK', navigation.data.nav[0].primary.link.uid)
  console.log('——————— Parent NAME', navigation.data.nav[1].primary.label[0].text)
  console.log('——————— Parent LINK', navigation.data.nav[1].primary.link.uid)
  console.log('——————— Sub NAME', navigation.data.nav[1].items[0].sub_nav_link_label[0].text)
  console.log('——————— Sub LINK', navigation.data.nav[1].items[0].sub_nav_link.uid)

  const assets = [];

  intro.data.gallery.forEach((item) => {
    assets.push(item.image.url);
  });

  return {
    assets,
    intro,
    footer,
    navigation,
    preloader
  };
};


app.get('/', async (req, res) => {
  res.redirect('/en-gb')
})

app.get('/:lang/', async (req, res) => {
  const lang = req.params.lang;
  const api = await initApi(req);
  const defaults = await handleRequest(api, lang);

  const home = await api.getSingle('home', { lang });

  if (home) {
    altLangs = home.alternate_languages
    meta = home.data.seo[0]

    // const { results: approach } = await api.query(Prismic.Predicates.at('document.type', 'approach'), { lang })
    // workflow = approach[0].data.workflow

    // const { results: globals } = await api.query(Prismic.Predicates.at('document.type', 'globals'), { lang })
    // const { results: packs } = await api.query(Prismic.Predicates.at('document.type', 'pack'), {
    //   lang,
    //   orderings: '[my.pack.homepage_order]'
    // })

    res.render('pages/home', {
      ...defaults,
      altLangs,
      // globals,
      lang,
      meta,
      home,
      // workflow,
      // packs
    });

  }

  else {
    console.log("_404")
    // res.status(404).render("./error_handlers/_404");
  }

});

app.get('/:lang/:uid/', async (req, res) => {
  const lang = req.params.lang;
  const uid = req.params.uid;
  const api = await initApi(req);
  const defaults = await handleRequest(api, lang);

  // const the_media = await api.getByUID('the_media', uid, { lang });
  // const approach = await api.getByUID('approach', uid, { lang });
  // const work = await api.getByUID('work', uid, { lang });
  // const the_creators = await api.getByUID('the_creators', uid, { lang });
  // const price_packs = await api.getByUID('price_packs', uid, { lang });
  const page = await api.getByUID('page', uid, { lang });
  const contacts = await api.getByUID('contacts', uid, { lang });


  if (page) {
    if (page.data.parent_page) {
      res.redirect(`/${page.lang}/${page.data.parent_page.uid}/${page.uid}/`)
    }

    const { results: parent_en } = await api.query(Prismic.Predicates.at('document.type', 'page'), { lang: "en-gb" })
    const { results: parent_pt } = await api.query(Prismic.Predicates.at('document.type', 'page'), { lang: "pt-pt" })


    altLangs = page.alternate_languages
    meta = page.data.seo[0]

    // const { results: globals } = await api.query(Prismic.Predicates.at('document.type', 'globals'), { lang })

    res.render('pages/pages', {
      ...defaults,
      altLangs,
      lang,
      meta,
      // globals,
      page,
      parent_en,
      parent_pt
    });
  }

  else if (contacts) {
    altLangs = contacts.alternate_languages
    meta = contacts.data.seo[0]

    // const { results: globals } = await api.query(Prismic.Predicates.at('document.type', 'globals'), { lang })

    res.render('pages/contacts', {
      ...defaults,
      altLangs,
      lang,
      meta,
      // globals,
      contacts,
    });
  }

  else {
    console.log("_404")
    // res.status(404).render("./error_handlers/_404");
  }

  // if (the_media) {
  //   altLangs = the_media.alternate_languages
  //   meta = the_media.data.seo[0]

  //   ads = the_media.data.marquee_ads[0]
  //   design = the_media.data.marquee_design[0]
  //   web = the_media.data.marquee_web[0]

  //   res.render('pages/the_media', {
  //     ...defaults,
  //     altLangs,
  //     lang,
  //     meta,
  //     the_media,
  //     ads,
  //     design,
  //     web,
  //   });

  // }

  // else if (approach) {
  //   altLangs = approach.alternate_languages
  //   meta = approach.data.seo[0]

  //   res.render('pages/approach', {
  //     ...defaults,
  //     altLangs,
  //     lang,
  //     meta,
  //     approach,
  //   });

  // }

  // else if (work) {
  //   altLangs = work.alternate_languages
  //   meta = work.data.seo[0]

  //   res.render('pages/work', {
  //     ...defaults,
  //     altLangs,
  //     lang,
  //     meta,
  //     work,
  //   });

  // }

  // else if (the_creators) {
  //   altLangs = the_creators.alternate_languages
  //   meta = the_creators.data.seo[0]

  //   res.render('pages/the_creators', {
  //     ...defaults,
  //     altLangs,
  //     lang,
  //     meta,
  //     the_creators,
  //   });

  // }

  // else if (price_packs) {
  //   altLangs = price_packs.alternate_languages
  //   meta = price_packs.data.seo[0]

  //   const { results: packs } = await api.query(Prismic.Predicates.at('document.type', 'pack'), {
  //     lang,
  //     fetchLinks: 'pack.title',
  //     orderings: '[document.first_publication_date]',
  //   })

  //   res.render('pages/price_packs', {
  //     ...defaults,
  //     altLangs,
  //     lang,
  //     meta,
  //     price_packs,
  //     packs,
  //   });

  // }

});


app.get('/:lang/:parent_page/:uid/', async (req, res) => {
  const lang = req.params.lang;
  const api = await initApi(req);
  const defaults = await handleRequest(api, lang);
  const uid = req.params.uid;

  // const _404 = await api.getSingle('404', { lang });
  // const media_page = await api.getByUID('media_page', uid, { lang });
  // const pack = await api.getByUID('pack', uid, { lang });
  // const work_page = await api.getByUID('work_page', uid, { lang });
  // const work_page = await api.getByUID('work_page', uid, { lang });
  const page = await api.getByUID('page', uid, { lang });

  // if (media_page) {
  //   altLangs = media_page.alternate_languages
  //   meta = media_page.data.seo[0]

  //   const { results: parent_en } = await api.query(Prismic.Predicates.at('document.type', 'the_media'), { lang: "en-gb" })
  //   const { results: parent_pt } = await api.query(Prismic.Predicates.at('document.type', 'the_media'), { lang: "pt-pt" })

  //   const { results: price_packs } = await api.query(Prismic.Predicates.at('document.type', 'price_packs'), { lang })
  //   parent_page__pack = price_packs[0].uid

  //   const { results: packs } = await api.query(Prismic.Predicates.at('document.type', 'pack'), { lang })

  //   res.render('pages/media_page', {
  //     ...defaults,
  //     _404,
  //     altLangs,
  //     lang,
  //     meta,
  //     parent_en,
  //     parent_pt,
  //     parent_page__pack,
  //     media_page,
  //     packs
  //   });

  // }

  // else if (pack) {
  //   altLangs = pack.alternate_languages
  //   meta = pack.data.seo[0]

  //   const { results: packs } = await api.query(Prismic.Predicates.at('document.type', 'pack'), {
  //     lang,
  //     fetchLinks: 'pack.title',
  //     orderings: '[document.first_publication_date]',
  //   })

  //   const { results: globals } = await api.query(Prismic.Predicates.at('document.type', 'globals'), { lang })
  //   const { results: parent_en } = await api.query(Prismic.Predicates.at('document.type', 'price_packs'), { lang: "en-gb" })
  //   const { results: parent_pt } = await api.query(Prismic.Predicates.at('document.type', 'price_packs'), { lang: "pt-pt" })

  //   console.log(globals[0].data.contacts[0])

  //   res.render('pages/pack', {
  //     ...defaults,
  //     _404,
  //     altLangs,
  //     globals,
  //     lang,
  //     meta,
  //     parent_en,
  //     parent_pt,
  //     pack,
  //     packs,
  //   });
  // }

  // else if (work_page) {
  //   altLangs = work_page.alternate_languages
  //   meta = work_page.data.seo[0]

  //   const { results: parent_en } = await api.query(Prismic.Predicates.at('document.type', 'work_page'), { lang: "en-gb" })
  //   const { results: parent_pt } = await api.query(Prismic.Predicates.at('document.type', 'work_page'), { lang: "pt-pt" })
  //   const { results: globals } = await api.query(Prismic.Predicates.at('document.type', 'globals'), { lang })


  //   console.log(globals)

  //   res.render('pages/work_page', {
  //     ...defaults,
  //     _404,
  //     altLangs,
  //     globals,
  //     lang,
  //     meta,
  //     parent_en,
  //     parent_pt,
  //     work_page,
  //   });
  // }

  if (page) {
    altLangs = page.alternate_languages
    meta = page.data.seo[0]

    const { results: parent_en } = await api.query(Prismic.Predicates.at('document.type', 'page'), { lang: "en-gb" })
    const { results: parent_pt } = await api.query(Prismic.Predicates.at('document.type', 'page'), { lang: "pt-pt" })
    // const { results: globals } = await api.query(Prismic.Predicates.at('document.type', 'globals'), { lang })

    res.render('pages/pages', {
      ...defaults,
      // _404,
      altLangs,
      // globals,
      lang,
      meta,
      parent_en,
      parent_pt,
      page,
    });
  }

  else {
    console.log("_404")
    res.status(404).render("pages/_404");
  }
});


/***
 * Forms
 * & E-Mails
 */
app.post('/send', (req, res) => {
  const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

  console.log("form sent")


  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp-relay.sendinblue.com',
    port: 587
    ,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'nuno@mediacreators.studio', // generated ethereal user
      pass: '72QGxIWOYTfRtjKV'  // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Media Creators Studio" <info@mediacreators.studio>', // sender address
    to: `${req.body.email}, info@mediacreators.studio`, // list of receivers
    bcc: 'ositaka@gmail.com', // list of receivers
    subject: 'New Contact Message', // Subject line
    text: 'Hello world?', // plain text body
    html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    res.render('pages/email_sent', {
      msg: 'Email has been sent',
      output
    });
  });
});


app.post('/send-pack', (req, res) => {
  const output = `
    <p>New "${req.body.form}" pack request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Company: ${req.body.company}</li>
      <li>Email: ${req.body.email}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    <hr />
    <h4>Price: €${req.body.price}</h4>
  `;

  console.log("form sent")

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp-relay.sendinblue.com',
    port: 587
    ,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'nuno@mediacreators.studio', // generated ethereal user
      pass: '72QGxIWOYTfRtjKV'  // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Media Creators Studio" <info@mediacreators.studio>', // sender address
    to: `${req.body.email}, info@mediacreators.studio`, // list of receivers
    bcc: 'ositaka@gmail.com', // list of receivers
    subject: `New "${req.body.form}" pack request`, // Subject line
    text: 'Hello world?', // plain text body
    html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    res.render('pages/email_sent', {
      msg: 'Email has been sent',
      output
    });
  });
});


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
