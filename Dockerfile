FROM node:14
WORKDIR /app
COPY ["PACKAGE.json", "package-lock.JSON",  "./"]
RUN npm install
COPY . .
ENV NODE_ENV=production
EXPOSE 8080
CMD [ "node", "app.js"]