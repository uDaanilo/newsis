FROM node:18

WORKDIR /home/app

COPY . /home/app/
RUN apt update && \
  apt install -y wget netcat && \
  wget -q -O /usr/bin/wait-for https://raw.githubusercontent.com/eficode/wait-for/v2.2.3/wait-for && \
  chmod +x /usr/bin/wait-for
RUN npm i

CMD [ "npm", "run", "dev" ]