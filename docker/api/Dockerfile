FROM node:8
RUN apt-get update && apt-get install -y build-essential
RUN npm i -g sails mocha grunt-cli nodejs npm-check-updates nyc eslint htmlhint
RUN mkdir /server
VOLUME ["/server"]
WORKDIR /server
EXPOSE 1337
EXPOSE 27017
