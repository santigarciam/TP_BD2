<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
  <a href="https://www.postgresql.org/" target="blank"><img src="https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg" width="200" alt="PostgreSQL Logo" /></a>
  <a href="https://www.mongodb.com/" target="blank"><img src="https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg" width="200" alt="MongoDB Logo" /></a>
  <a href="https://redis.io/" target="blank"><img src="https://www.svgrepo.com/show/303460/redis-logo.svg" width="200" alt="Redis Logo" /></a>
</p>

# Trabajo practico final - Base de datos 2

## Integrantes

Tomas Cerdeira - 60051

Santiago Garcia Montagner - 60352

Alfonso Estol - 59782

## Descripcion

Este proyecto resuelve el problema de compartir y memorizar URLs complejas, a traves de la creacion y asociacion a URLs mas cortas y elegidas por el usuario.

Se utilizo posgresql, mongo y redis para llegar a la solucion.

## Instalacion

```bash
$ npm install
```

## Correr las bases de datos en sus puertos por defecto!

- PostgreSQL: 5432
  - En "TP_BD2/src/common/envs/.env" ajustar las variables a la configuracion de PostgreSQL

    * DATABASE_HOST=<HOST_DB>
    * DATABASE_NAME=<NAME_DB>
    * DATABASE_USER=<USER_DB>
    * DATABASE_PASSWORD=<PASSWORD_DB>
    * DATABASE_PORT=5432

- mongoDB: 27017

- Redis: 6379
  - En "TP_BD2/src/common/envs/.env" ajustar las variables a la configuracion de Redis

      * REDIS_URL=<SERVER_URL>

## Ejecuccion

```bash
# Desarrollo
$ npm run start

# watch mode
$ npm run start:dev

# Produccion
$ npm run start:prod
```

## Documentacion

http://localhost:3000/documentation/

## Front end basico de prueba

https://observablehq.com/@tcerdeira/tpe-bd2-grupo-g1-1er-cuatrimestre-2022
