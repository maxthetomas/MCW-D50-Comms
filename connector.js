require('dotenv').config();
import { createConnection } from 'node:net';
import { writeFileSync } from 'node:fs';

let full_data = [];
let connected = null;

const connection = createConnection({  
  host: process.env.HOST,
  port: parseInt(process.env.PORT) || 1024
}, () => { 
  console.log('Connected successfully.'); 
  connected = new Date();
})

connection.on('data', (d) => { 
  full_data.push(new Date().toISOString() + " < " + d.toString('base64'));
  const data = d.toString().replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  console.log(data);
})

process.stdin.addListener('data', (e) => { 
  connection.write(e); 
  full_data.push(new Date().toISOString() + " > " + e.toString('base64'))
})
process.stdin.read();

process.on('SIGINT', () => {
  console.log("Caught interrupt signal, stopping.");

  connection.destroy();
  writeFileSync(`logs/${new Date().toISOString()}.txt`, `Connection from ${connected.toISOString()}. MSGS: ${full_data.length} \n` + full_data.join('\n'));

  process.exit();
});