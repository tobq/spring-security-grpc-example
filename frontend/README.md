# grpc-boilerplate

## Build Setup

Frontend host to the backend is `127.0.0.1:8080/backend` this is because `prefix` is set to backend on the `envoy.yaml` and envoy port is set to 8080
 
```bash
# install dependencies
$ npm install

# this will look for the proto files in backend/src/main/proto and generate a js and ts files in the /frontend/proto directory
$ npm run proto:grpc-web

# serve with hot reload at localhost:3000
$ npm run dev


# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

NPM packages required for GRPC

    google-protobuf
    grpc
    grpc-web
    mkdirp
    protoc-gen-grpc-web
    ts-protoc-gen
    @improbable-eng/grpc-web
    @types/google-protobuf
    


