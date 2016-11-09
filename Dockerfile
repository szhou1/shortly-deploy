FROM node:argon

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm install -g grunt grunt-cli

COPY package.json /usr/src/app
RUN npm install

COPY . /usr/src/app

EXPOSE 4568

CMD ["npm", "start"]

