# Using Docker Compose 🚢

## Before Anything

Make sure you have docker and docker-compose installed on your computer

Follow this [guide](https://docs.docker.com/engine/install/)  to get docker installed

Follow this [guide](https://docs.docker.com/compose/install/)  to get docker-compose installed

## Starting compose

```bash
# install dependencies
$ npm run install

# start compose
$ docker-compose up -d
```

## Watching the application logs

```bash
# watching logs
$ docker logs veet -f
```

## Stoping compose

```bash
# development
$ docker-compose down
```
