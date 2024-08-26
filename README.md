# Bautizados-Api
Trabajo final de la materia de Desarrollo de Software Seguro - Grupo 8

## Introducción
Este proyecto es una API para la gestión de bautizados dentro de una parroquia en concreto. En este caso no se especifica la parroquia, a fin de mantener esta información segura. 

Para asegurar la integridad de esta API, se validaron los Endpoints para asegurar que no se tengan accesos indebidos.

## Pasos para utilizar localmente

1. **Instalar las dependencias:** Ejecutar el comando:
    ```bash
    npm install
    ```

2. **Iniciar el servidor:** Ejecutar el comando:
    ```bash
    npm start
    ```
    
    
## Uso de Postman
**Utilizar la colección de Postman:**
De ser necesario, se puede utilizar la colección de Postman almacenado en la ruta 
    ```bash
    ./src/views
    ```
Este archivo contiene una documentación más precisa de todos los endpoints. 

## Pruebas Unitarias
Dentro de Postman, se realizaron pruebas unitarias para cada endpoint para comprobar su funcionamiento.
Estas pruebas pueden ser ejecutas al ejecutar la colección. Solo notar que es necesario tener ciertos elementos dentro de la base de datos para poder ejecutar las de eliminar, principalmente.

## Pruebas de Integración
Para realizar las pruebas de integración, se utilizó Jest, como fue enseñado en clase, para probar todas las partes de la API en conjunto.
Para ejecutar estas pruebas es necesario utilizar el comando:
    ```bash
    npm test
    ```
Esto funciona debido a que estamos utilizando jest para el ambiente de desarrollo.