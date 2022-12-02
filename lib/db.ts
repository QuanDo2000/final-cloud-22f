import mysql from 'serverless-mysql';
import * as fs from 'fs';

const conn = mysql({
  config: {
    host: 'cloud-database-server.mysql.database.azure.com',
    user: process.env.DB_USER,
    // user: 'root',
    password: process.env.DB_PWD,
    // password: 'quan',
    database: 'data',
    port: 3306,
    ssl: { ca: fs.readFileSync('./mysql/DigiCertGlobalRootCA.crt.pem') },
  },
});

export type DbQuery = {
  query: string;
  values: Object[];
};

export default async function executeQuery({ query, values }: DbQuery) {
  try {
    const results = await conn.query(query, values);
    await conn.end();
    return results;
  } catch (err) {
    return { err };
  }
}
