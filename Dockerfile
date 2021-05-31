FROM nikolaik/python-nodejs:python3.9-nodejs16-alpine

RUN apk update && apk add ca-certificates && update-ca-certificates

RUN mkdir /paper.id-backend
ADD . /paper.id-backend
WORKDIR /paper.id-backend

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.8.0/wait /wait
RUN chmod +x /wait

RUN npm install
RUN npm install -g nodemon
CMD /wait && npm run initialize:db-dev && npm run dev