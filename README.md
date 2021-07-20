# SLS-UTILS
## Proyecto nodejs serverless enfocado en hacer más eficiente el trabajo cotidiano.
##### Las tecnologías utilizadas son:
- Nodejs v12
- Serverless
- AWS
- Docker

##### Contiene dos endpoint el cual son los siguientes:

- login: Autenticar usuario al sistema
```sh
    El cuerpo del endpoint debe contener email y password.
```
- create_user: Crear usuario.
```sh
    El cuerpo del endpoint debe contener la siguiente estructura json:
    
    {
        "email": "xxxx@xxx.xxx",
        "password": "xxx",
        "name": "xxx",
        "last_name": "xxx",
        "second_last_name": "xxx",
        "dni": "xxx",
        "gender": 2, (1: Masculino, 2: Femenino)
        "business": 0, (Negocio al que pertenece)
        "country": 1, (País al que pertenece)
        "role": "suscriptor" (Rol del usuario. admin o suscriptor)
    }
```

#### Todos los endpoint tienen el siguiente HEADER:
```sh
    x-api-key: xxxxxxxxxxxx
```
#### El header indicado anteriormente lo generará una vez inicializado el proyecto.

# INSTALACIÓN
##### Instalar las siguientes dependencias:
Requiere [Node.js](https://nodejs.org/) v12+.
```sh
- npm install -g serverless
- npm install --save-dev serverless-offline
- sls dynamodb install
- npm install
```
##### Inicializar dynamodb local:
Realizar pasos del proyecto open-source (https://github.com/YoyaTeam/dynamodb-manager).
Dejar el archivo descargado (sls dynamofb install) en la raíz del proyecto, abrir terminal y ejecutar lo siguiente:
```sh
- docker run -t -p 8080:80 taydy/dynamodb-manager
```
Luego podrás visitar http://localhost:8080/ or http://127.0.0.1:8080/ para gestionar DynamoDB local.


Configurar las variables de entornos

```sh
Crear archivos config.prod.json o config.dev.json (según corresponda el ambiente) he ingresar la información necesaria. Un ejemplo de esta información se puede obtener del archivo de example (config/config.env.json) ubicado en el mismo lugar que se debe crear el archivo.
```

Configurar archivo yml

```sh
Una vez creados los archivos config, en el archivo yml tag provider.stage se debe indicar local o prod según ambiente que se quiera lanzar y archivo config configurado en el paso anterior.
```

Iniciar proyecto

```sh
sls offline start
```
