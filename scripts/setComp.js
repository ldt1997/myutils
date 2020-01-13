#!/usr/bin/env node

import fs from "fs";
import moment from "moment";

let basepath = "src/components/";
let cptName = process.argv.splice(2)[0];
let path = cptName.split("/");
let name = path[path.length - 1];
let writes = [`index.js`, "index.less"];
let reads = [
  `${__dirname}/../src/components/compDemo/index.js`,
  `${__dirname}/../src/components/compDemo/index.less`
];
let file = [];
let author = require("os")
  .homedir()
  .split("\\")
  .pop();

//检测是否存在文件夹
let exists = function() {
  return new Promise(res => {
    (async function() {
      for (let a of path) {
        fs.existsSync(basepath + a)
          ? (basepath = `${basepath}${a}/`)
          : await mkdir(a);
      }
      res(basepath);
    })();
  });
};
//建立文件夹
let mkdir = function(a) {
  return new Promise((res, rej) => {
    fs.mkdir(basepath + a, err => {
      if (err) rej(err);
      basepath = `${basepath}${a}/`;
      res(basepath);
    });
  }).catch(err => console.log(err));
};
//读取模板文件内容，并替换为目标组件
let readFile = function() {
  return new Promise(res => {
    for (let a of reads) {
      let text = fs.readFileSync(a).toString();
      text = text
        .replace(/time/g, moment().format("YYYY/MM/DD"))
        .replace(/temp/g, name)
        .replace(/author/g, author);
      file.push(text);
    }
    res(file);
  });
};
//生成文件，并填入之前读取的文件内容
let writeFile = function(file) {
  return new Promise((res, rej) => {
    (async function() {
      for (let i = 0; i < writes.length; i++) {
        await fs.writeFile(`${basepath}${writes[i]}`, file[i], err => {
          if (err) rej(err);
        });
      }
      res("succ");
    })();
  });
};
async function creatPage() {
  try {
    await exists();
    await readFile();
    await writeFile(await readFile());
    return console.log(`Successfully created ${name} components`);
  } catch (err) {
    console.error(err);
  }
}
creatPage();
