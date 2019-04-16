# mtk

## Details

### Ports:

    - mtk-api-gateway: 3002
    - mtk-microservice: 3001

## Installation and startup (local)

- to install and start both services, run in each directory:
```
    $ npm install

    $ npm run prestart:prod

    $ npm start
```
- mtk-api-gateway has a client that has to be built before          starting the service with command:

```
    $ cd client && npm run build
```

## Installation and startup (Docker)

### Build images

- assuming you are in the root directory:

```
    docker build -t mtk-api-gateway mtk-api-gateway

    docker build -t mtk-microservice mtk-microservice
```
### Run images

```
    docker run --network=host  mtk-microservice

    docker run --network=host  mtk-api-gateway
```

## Testing

- in each directory run:

```
    # unit tests
    $ npm run test

    # e2e tests
    $ npm run test:e2e

    # test coverage
    $ npm run test:cov
```

## Docker compose

- In the root directory, run: `docker-compose up`.

