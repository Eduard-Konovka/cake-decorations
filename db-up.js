const fs = require('fs');
const db = require('./node/server');

// Указываем входной файл
const FILE_NAME = '...';
const inputFile = `./src/db/${FILE_NAME}.json`;

fs.readFile(inputFile, 'utf-8', async (err, jsonData) => {
  if (err) {
    console.error('Ошибка чтения файла:', err);
    return;
  }

  const jsData = JSON.parse(jsonData);

  console.log(`\nЗагружаем "${FILE_NAME}" в базу данных...\n`);

  for (let i = 0; i < jsData.length; i++) {
    await db.collection(FILE_NAME).doc(jsData[i]._id).set(jsData[i]);
  }

  console.log(`\nДанные "${FILE_NAME}" успешно загружены в базу данных!\n`);
});
