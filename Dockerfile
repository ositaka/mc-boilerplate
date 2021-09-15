FROM node:14

WORKDIR /app
COPY . .

RUN echo "Running the dockerfile"
RUN npm run backend:build
EXPOSE 3000
