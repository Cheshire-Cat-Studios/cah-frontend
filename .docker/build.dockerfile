FROM node:alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY ./package.json /usr/src/app/

RUN npm install


CMD ["npm", "run", "build"]

#CMD ["npm", "run", "dev"]


RUN #while true; do sleep 100 done;
