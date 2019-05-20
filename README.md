# Iniciar:

## Clonar el repositorio:
```bash
foo@bar:~$ git clone https://github.com/ecorona/sailsjs-boilerplate.git
foo@bar:~$ cd sailsjs-boilerplate
```

## Crear archivo: .env en la raíz del proyecto:
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

### Iniciar localmente (Ver instrucciones en config/datastores.js, config/sessions.js y config/sockets.js:
```bash
foo@bar:~$ npm install
foo@bar:~$ sails lift
```

---

### Iniciar con Docker (Debes tener docker-compose instalado):
```bash
foo@bar:~$ cd docker
foo@bar:~$ docker-compose build
foo@bar:~$ docker-compose up
```
