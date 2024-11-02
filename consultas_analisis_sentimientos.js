use sentimentAnalysisDB; // Crear o cambiar a la base de datos
db.createCollection("sentiments"); // Crear la colección

db.sentiments.find({ "Sentiment": "Excitement" }); // Seleccionar todas las publicaciones con el sentimiento "Excitement"
db.sentiments.find(); // Seleccionar todos los documentos de la colección

/**
 * Inserta un nuevo documento en la colección 'sentiments'.
 */
db.sentiments.insertOne({
  "Text": "Just posted a new photo!",
  "Sentiment": "Neutral",
  "Timestamp": ISODate("2023-10-31T14:15:00Z"),
  "User": "Logan6230",
  "Platform": "Instagram",
  "Hashtags": ["#Photo", "#Nature"],
  "Retweets": 0,
  "Likes": 50,
  "Country": "Spain",
  "Year": 2024, 
  "Month": 10, 
  "Day": 31, 
  "Hour": 14 
});

/**
 * Consulta para buscar publicaciones de un usuario específico.
 */
db.sentiments.find({ "User": "Logan6230" });

/**
 * Actualiza el número de likes de un documento específico.
 */
db.sentiments.updateOne(
  { "User": "Logan6230" }, 
  { $set: { "Likes": 60 } } // Cambiar número de likes a 60
);

/**
 * Elimina el documento cuyo 'User' es 'Logan6230'.
 */
db.sentiments.deleteOne({ "User": "Logan6230" }); 

// Consultas con Filtros y Operadores

/**
 * Consulta para seleccionar publicaciones con sentimiento "Negative" de usuarios en "USA".
 */
db.sentiments.find({
  "Sentiment": "Negative",
  "Country": "USA"
});

/**
 * Consulta para obtener publicaciones que incluyan el hashtag "#Nature".
 * Utiliza el operador '$in' para filtrar documentos que contengan '#Nature' en el array 'Hashtags'.
 */
db.sentiments.find({
  "Hashtags": { $in: ["#Nature"] }
});

/**
 * Consulta para obtener publicaciones con más de 20 retweets.
 */
db.sentiments.find({
  "Retweets": { $gt: 20 }
});

/**
 * Consulta para obtener publicaciones con un sentimiento "Positive" publicadas en Twitter o Instagram.
 * Utiliza el operador '$in' para filtrar documentos donde el campo 'Platform' sea "Twitter" o "Instagram".
 */
db.sentiments.find({
  "Sentiment": "Positive",
  "Platform": { $in: ["Twitter", "Instagram"] }
});

/**
 * Consulta para obtener publicaciones en la colección 'sentiments' donde:
 * - El campo 'Country' es igual a "India".
 * - El número de 'Likes' es mayor a 50.
 * Utiliza el operador de comparación '$gt' para filtrar publicaciones 
 * con más de 50 likes en el país especificado.
 */
db.sentiments.find({
  "Country": "India",
  "Likes": { $gt: 50 }
});

/** Consultas de agregación para calcular estadísticas. */

/**
 * Agrega y cuenta documentos por cada tipo de 'Sentiment'.
 * - '$group' agrupa documentos por 'Sentiment'.
 * - '$sum' cuenta el total de documentos en cada grupo.
 * - '$sort' ordena los resultados en orden descendente por conteo.
 * Resultado: Muestra cada tipo de 'Sentiment' con su respectivo conteo, de mayor a menor.
 */
db.sentiments.aggregate([
  { $group: { _id: "$Sentiment", count: { $sum: 1 } } },
  { $sort: { count: -1 } }
]);

/**
 * Agregación para calcular el total de 'Likes' acumulados por cada país, ordenados de mayor a menor.
 * - Agrupa los documentos por el campo 'Country' utilizando '$group'.
 * - Suma los valores de 'Likes' en cada grupo usando '$sum' y los almacena en el campo 'totalLikes'.
 * - Ordena los resultados en orden descendente por 'totalLikes' utilizando '$sort'.
 */
db.sentiments.aggregate([
  { $group: { _id: "$Country", totalLikes: { $sum: "$Likes" } } },
  { $sort: { totalLikes: -1 } }
]);

/**
 * Calcula el promedio de likes para cada plataforma en la colección 'sentiments'.
 * - Agrupa los documentos por el campo 'Platform'.
 * - Aplica la operación '$avg' sobre el campo 'Likes' para calcular el promedio de likes por plataforma.
 * - Ordena los resultados de mayor a menor en base al promedio de likes.
 */
db.sentiments.aggregate([
  { 
    $group: { 
      _id: "$Platform", 
      avgLikes: { $avg: "$Likes" } 
    } 
  },
  { 
    $sort: { avgLikes: -1 } 
  }
]);

/**
 * Agregación para calcular el promedio de 'Likes' por cada tipo de 'Sentiment' en la colección 'sentiments',
 * ordenando los resultados de mayor a menor promedio de 'Likes'.
 * - Agrupa documentos por el campo 'Sentiment'.
 * - Calcula el promedio de 'Likes' en cada grupo utilizando el operador '$avg'.
 * - Ordena los resultados en orden descendente según el promedio de 'Likes'.
 * El resultado proporciona un documento por cada tipo de 'Sentiment' con el promedio de 'Likes' correspondiente, 
 * ordenado de mayor a menor.
 */
db.sentiments.aggregate([
  { 
    $group: { 
      _id: "$Sentiment", 
      avgLikes: { $avg: "$Likes" } 
    } 
  },
  { 
    $sort: { avgLikes: -1 }  // Orden descendente por el campo 'avgLikes'
  }
]);

/**
 * Agregación para obtener el número máximo de 'Retweets' por cada país
 * en la colección 'sentiments'.
 * - Agrupa los documentos por el campo 'Country'.
 * - Utiliza el operador '$max' para encontrar el valor máximo de 'Retweets'
 *   dentro de cada grupo de país.
 * - Ordena el resultado de mayor a menor según el valor de 'maxRetweets'.
 * Devuelve un documento para cada país con el valor máximo de 'Retweets'.
 */
db.sentiments.aggregate([
  { 
    $group: { 
      _id: "$Country", 
      maxRetweets: { $max: "$Retweets" } 
    } 
  },
  { 
    $sort: { maxRetweets: -1 }  // Orden descendente por 'maxRetweets'
  }
]);
