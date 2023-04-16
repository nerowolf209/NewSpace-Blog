FROM node:14
WORKDIR /app
COPY PACKAGE*.JSON ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "node", "app.js"]