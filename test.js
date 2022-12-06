import { readFileSync, writeFile } from "fs";
var args = process.argv;

// 可以使用循环迭代所有的命令行参数（包括node路径和文件路径）
args.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});