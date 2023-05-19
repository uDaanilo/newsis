FROM node:18

WORKDIR /home/app

COPY . /home/app/

RUN npm i

CMD [ "npm", "run", "dev" ]