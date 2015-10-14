#!/usr/bin/env node

const Promise = require('bluebird');
const exec = require('child-process-promise').exec;
const diff = require('diff');
const parseXLSX = require('excel');
const fs = Promise.promisifyAll(require('fs'));

const getFirstColValues = require('./utils/getFirstColValues');

fs.readFileAsync('t1.txt', 'utf8', (err, data) => {
  const t1 = data;
  parseXLSX('filelist.xlsx', (err, data) => {
    if(err) throw err;
    console.log(data);
    const firstColsText = getFirstColValues(data).join('\n');
    console.log(typeof firstColsText);
    console.log(typeof t1);
    const di = diff.diffLines(t1, firstColsText);
    console.log(di)
  });
});

// const XLSX = require('xlsx');
//
// const workbook = XLSX.readFile('filelist.xlsx');
// // console.log(workbook.Sheets.Sheet1.D2.v)
// fs.writeFile('workbook.json', JSON.stringify(workbook, null, 2), err => {
//   if (err) throw err;
//   console.log('saved!');
//   fs.readFile('workbook.json', (err, data) => {
//     if (err) throw err;
//     XLSX.writeFile(JSON.parse(data), 'other.xlsx');
//   });
// });

Promise.resolve()
  .then(() => {
    return exec('git rev-list --max-parents=0 HEAD');
  })
  .then(result => {
    console.log(typeof result.stdout)
    console.log(result.stdout);
    return exec(`git diff --name-only ${result.stdout}`);
  })
  .then(result => {
    console.log(typeof result.stdout)
    console.log(result.stdout);
    return fs.writeFileAsync('result.txt', result.stdout, 'utf8');
  })
  .then(() => {
    console.log('Done result.txt!!!!!')
  })
  .catch(err => console.log(err));




const program = require('commander');
const officegen = require('officegen');

const xlsx = officegen('xlsx');

xlsx.on('finalize', written => {
  console.log('Finish to create an Excel file.\nTotal bytes created: ' + written);
});
xlsx.on('error', err => console.log(err));

sheet = xlsx.makeNewSheet();
sheet.name = '日本語のシート名';

sheet.data[0] = [];
sheet.data[0][0] = 1;
sheet.data[1] = [];
sheet.data[1][0] = 'あいう';
sheet.data[2] = [];
sheet.data[2][0] = 'abc';
sheet.data[3] = [];
sheet.data[3][0] = 131234;
sheet.data[4] = [];
sheet.data[4][0] = 'かｋｄｊｋｓｄっｊｆｄｓ';
sheet.data[5] = [];
sheet.data[5][0] = 'あいうえお';
sheet.data[6] = [];
sheet.data[6][0] = 0;

// sheet.setCell('E7', 340);

const out = fs.createWriteStream('filelist.xlsx');

out.on('error', err => console.log(err));

xlsx.generate(out);

program
  .version('0.0.1')
  .option('-B, --base', 'Base file path')
  // .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
  .parse(process.argv);

console.log(program.args.length);
console.log(program);

program.args.forEach(arg => console.log(typeof arg));
