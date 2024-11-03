# Fase 1: MongoDB
## Análisis de Sentimientos con MongoDB

Este repositorio contiene un script de MongoDB (`consultas_analisis_sentimientos.js`) diseñado para ejecutar diversas consultas y operaciones de agregación en una colección de datos de análisis de sentimientos. A través de estas consultas, puedes explorar patrones de sentimientos, calcular estadísticas sobre interacciones y analizar el comportamiento de usuarios en diferentes plataformas.

---

## Tabla de Contenidos

1. [Requisitos Previos](#requisitos-previos)
2. [Configuración de la Base de Datos](#configuración-de-la-base-de-datos)
3. [Uso del Script](#uso-del-script)
4. [Estructura del Script](#estructura-del-script)
5. [Consultas y Operaciones](#consultas-y-operaciones)

---

## Requisitos Previos

- **MongoDB**: Asegúrate de tener MongoDB instalado en tu máquina. Puedes descargarlo desde [MongoDB Download Center](https://www.mongodb.com/try/download/community).
- **Consola de MongoDB**: Requiere acceso a una consola para ejecutar comandos de MongoDB.

## Configuración de la Base de Datos

1. **Ejecutar MongoDB**: Asegúrate de que el servidor MongoDB está en funcionamiento.
2. **Conectarse a MongoDB**: Abre una terminal y escribe `mongo` para iniciar la consola de MongoDB.
3. **Crear la Base de Datos y la Colección**: Usa el script para crear la base de datos `sentimentAnalysisDB` y la colección `sentiments`:

    ```javascript
    use sentimentAnalysisDB;
    db.createCollection("sentiments");
    ```
4. **Importar Datos**: Para realizar el análisis, importa los datos del archivo `sentiment_data.json` en la colección `sentiments`.
   
## Uso del Script

1. **Ejecutar las Consultas**: Copia y pega las consultas del script en la terminal de MongoDB de forma secuencial para obtener los resultados de cada operación.
2. **Personalizar las Consultas**: Ajusta los filtros y campos en las consultas según tus necesidades específicas de análisis.

## Estructura del Script

El archivo `consultas_analisis_sentimientos.js` está organizado en las siguientes secciones, cada una con un conjunto específico de instrucciones:

- **Configuración Inicial**: Configuración de la base de datos y la colección.
- **Operaciones CRUD**: Ejemplos de inserción, actualización y eliminación de documentos.
- **Consultas de Filtrado**: Filtrado de documentos con criterios específicos (por sentimiento, país, etc.).
- **Consultas de Agregación**: Operaciones avanzadas para realizar cálculos y estadísticas, incluyendo conteo de publicaciones y análisis de interacciones.

## Consultas y Operaciones

### Ejemplos de Consultas Incluidas

1. **Filtrado de Publicaciones por Sentimiento y País**: Selecciona publicaciones con sentimiento "Negative" en "USA".

   ```javascript
   db.sentiments.find({ "Sentiment": "Negative", "Country": "USA" });
   ```


