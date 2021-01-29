FROM node:lts-alpine3.9
RUN apk add protobuf
WORKDIR /usr/src/app
RUN mkdir /usr/src/app/proto-files
COPY ./src/main/proto ./proto-files
RUN cd proto-files && ls -a
COPY ./frontend/package.json .
RUN  npm install
COPY ./frontend .
RUN npm run proto:docker

RUN ls -a

EXPOSE 3000
CMD ["npm", "run", "dev"]
