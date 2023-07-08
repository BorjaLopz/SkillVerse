# ⚙ Inicialización

- Posicíonate en la carpeta ./Backend y abre la terminal.

## Archivo .env

- El archivo .env no se mostrará ya que está incluido en el .gitignore.
- La información contenida no es sensible ya que se trata de un proyecto de ejemplo, pero por convención lo introducimos de esta forma.
- La información necesaria se puede encontrar en el archivo .env.example.

## NPM necesarios

- Debes instalar primero los módulos necesarios:

```
npm install
```

## Base de datos

- Es necesario tener previamente configurado el archivo .env.
- Para crear la base de datos con las tablas vacías:

```
node db/initDB
```

- Para crear la base de datos con 20 usuarios aleatorios:

```
node db/initDB --data
```

## Servidor

- Para iniciar el servidor:

```
npm start
```
