FROM node:argon

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm install -g grunt grunt-cli

COPY package.json /usr/src/app
COPY Gruntfile.js /usr/src/app
RUN npm install
RUN grunt build

COPY . /usr/src/app

EXPOSE 4568

CMD ["npm", "start"]


