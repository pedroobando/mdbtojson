import { readFileSync, writeFileSync } from 'fs';
import MDBReader from 'mdb-reader';

import path from 'path';
import { fileURLToPath } from 'url';

const __database = 'Finanzas.mdb';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// console.log('directory-name 👉️', __dirname);

const buffer = readFileSync(`${__dirname}/../mdb/${__database}`);
const reader = new MDBReader(buffer);

const tables = reader.getTableNames(); // ['Cats', 'Dogs', 'Cars']

tables.map((table) => {
  const dataTable = reader.getTable(table).getData();
  writeFileSync(`${__dirname}/../data/${table}.json`, JSON.stringify(dataTable));
});

// const table = reader.getTable('Cats');
// table.getColumnNames(); // ['id', 'name', 'color']
// table.getData(); // [{id: 5, name: 'Ashley', color: 'black'}, ...]
