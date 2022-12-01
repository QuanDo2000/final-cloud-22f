const fs = require('fs');
const fastcsv = require('fast-csv');
const mysql = require('mysql');

require('dotenv').config();

const processData = (filePath, query) => {
  return new Promise((resolve) => {
    console.log('Processing data from ' + filePath + ' ...');

    let stream = fs.createReadStream(filePath);
    let csvData = [];
    let csvStream = fastcsv
      .parse({ trim: true })
      .on('data', (data) => {
        csvData.push(data);
      })
      .on('end', () => {
        csvData.shift();

        conn.query(query, [csvData], (err, res) => {
          console.log(err || res);
        });

        resolve();
      });

    stream.pipe(csvStream);
  });
};

const insertData = async () => {
  let filePath = './400_households.csv';
  let query =
    'INSERT INTO household(Hshd_num, Loyalty_flag, Age_range, Marital_status, Income_range, Homeowner_desc, Hshd_composition, Hshd_size, Children) VALUES ?';
  await processData(filePath, query);
  filePath = './400_transactions.csv';
  query =
    'INSERT INTO transaction(Basket_num, Hshd_num, Date, Product_num, Spend, Units, Store_region, Week_num, Year) VALUES ?';
  await processData(filePath, query);
  filePath = './400_products.csv';
  query =
    'INSERT INTO product(Product_num, Department, Commodity, Brand_type, Natural_organic_flag) VALUES ?';
  await processData(filePath, query);
  return;
};

const initTables = () => {
  conn.query('DROP TABLE IF EXISTS household;', (err) => {
    if (err) {
      console.log('Error: ', err);
      return;
    }
    console.log('Dropped household table if existed.');
  });

  let createStatement =
    'CREATE TABLE household(Hshd_num INT NOT NULL, Loyalty_flag VARCHAR(5), Age_range VARCHAR(20), Marital_status VARCHAR(20), Income_range VARCHAR(20), Homeowner_desc VARCHAR(50), Hshd_composition VARCHAR(20), Hshd_size VARCHAR(5), Children VARCHAR(5));';

  conn.query(createStatement, (err) => {
    if (err) {
      console.log('Error: ', err);
      return;
    }
    console.log('Created household table.');
  });

  conn.query('DROP TABLE IF EXISTS transaction;', (err) => {
    if (err) {
      console.log('Error: ', err);
      return;
    }
    console.log('Dropped transaction table if existed.');
  });

  createStatement =
    'CREATE TABLE transaction(Basket_num INT NOT NULL, Hshd_num INT NOT NULL, Date VARCHAR(20), Product_num INT NOT NULL, Spend DECIMAL(5, 2), Units INT, Store_region VARCHAR(20), Week_num INT, Year INT);';

  conn.query(createStatement, (err) => {
    if (err) {
      console.log('Error: ', err);
      return;
    }
    console.log('Created transaction table.');
  });

  conn.query('DROP TABLE IF EXISTS product;', (err) => {
    if (err) {
      console.log('Error: ', err);
      return;
    }
    console.log('Dropped product table if existed.');
  });

  createStatement =
    'CREATE TABLE product(Product_num INT NOT NULL, Department VARCHAR(20), Commodity VARCHAR(50), Brand_type VARCHAR(20), Natural_organic_flag VARCHAR(5));';

  conn.query(createStatement, (err) => {
    if (err) {
      console.log('Error: ', err);
      return;
    }
    console.log('Created product table.');
  });

  console.log('Finished initialization.');
};

let conn = mysql.createConnection({
  host: 'cloud-database-server.mysql.database.azure.com',
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: 'data',
  port: 3306,
  ssl: { ca: fs.readFileSync('DigiCertGlobalRootCA.crt.pem') },
});

initTables();

insertData().then(() => {
  conn.end((err) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log('Finished.');
  });
});
