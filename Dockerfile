FROM openjdk:8-alpine

RUN apk add bash

ADD . /demo

CMD /bin/bash

WORKDIR /demo