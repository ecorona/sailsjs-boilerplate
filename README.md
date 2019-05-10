# Iniciar:

## Crear archivo: .env:
```bash
#password inicial para las cuentas creadas
PASSWORD_INICIAL=zarpemos!
#secreto para las sesiones
SESSION_SECRET=6ee81c42-96f2-465f-8c68-ac7caea82cd3
#nombre de la bd en mongo
DB_NAME=sailsjs
#log level de salida
LOG_LEVEL=verbose

```

## Clonar el repositorio:
```bash
foo@bar:~$ git clone https://git.snell.com.mx/ecorona/sailsjs-boilerplate.git
foo@bar:~$ cd sailsjs-boilerplate
foo@bar:~$ npm install
foo@bar:~$ sails lift
```
---
#### Con Docker:
```bash
foo@bar:~$ git clone https://git.snell.com.mx/ecorona/sailsjs-boilerplate.git
foo@bar:~$ cd sailsjs-boilerplate/docker
foo@bar:~$ docker-compose build
```
Editar: **config/datastores.js**
Cambiar:
```js
53:   url: 'mongodb://localhost:27017/' + process.env.DB_NAME,
```
Por:
```js
53:   url: 'mongodb://mongodb:27017/' + process.env.DB_NAME,
```
---
Editar: **config/session.js**
Cambiar:
```js
40:   url: 'mongodb://localhost:27017/' + process.env.DB_NAME,
```
Por:
```js
40:   url: 'mongodb://mongodb:27017/' + process.env.DB_NAME,
```
#### Iniciar:
```bash
foo@bar:~$ docker-compose up
```