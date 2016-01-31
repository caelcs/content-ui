FROM node:latest
MAINTAINER Adolfo Custidiano <adolfoecs@gmail.com>

RUN npm install -g bower

WORKDIR /var/www/
ADD . /var/www/

RUN echo '{ "allow_root": true }' > /root/.bowerrc

RUN npm install
RUN bower install

EXPOSE 8888

CMD gulp startLive


