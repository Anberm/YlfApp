const fs = require('fs');
const path = require('path');
var copy = function (src, dst) {
  let paths = fs.readdirSync(src); //同步读取当前目录
  paths.forEach(function (tempPath) {
    var _src = path.join(src, tempPath);
    var _dst = path.join(dst, tempPath);
    fs.stat(_src, function (err, stats) { //stats  该对象 包含文件属性
      if (err) throw err;
      if (stats.isFile()) { //如果是个文件则拷贝 
        let readable = fs.createReadStream(_src); //创建读取流
        let writable = fs.createWriteStream(_dst); //创建写入流
        readable.pipe(writable);
      } else if (stats.isDirectory()) { //是目录则 递归 
        checkDirectory(_src, _dst, copy);
      }
    });
  });
}
var copyFile = function (src, dst) {
  fs.stat(src, function (err, stats) { //stats  该对象 包含文件属性
    if (err) throw err;
    if (stats.isFile()) { //如果是个文件则拷贝 
      let readable = fs.createReadStream(src); //创建读取流
      let writable = fs.createWriteStream(dst); //创建写入流
      readable.pipe(writable);
    } else {
      throw new Error('文件不存在');
    }
  });
}
var checkDirectory = function (src, dst, callback, next = null) {
  fs.access(dst, fs.constants.F_OK, (err) => {
    if (err) {
      fs.mkdirSync(dst);
      callback(src, dst);
    } else {
      callback(src, dst);
    }
    if (next) {
      next();
    }
  });
};
var mkdirsSync = function (dirname) {
  if (fs.existsSync(dirname)) {
    return true;
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }
}
var deleteall = function (tempPath) {
  var files = [];
  if (fs.existsSync(tempPath)) {
    files = fs.readdirSync(tempPath);
    files.forEach(function (file, index) {
      var curPath = path.join(tempPath, file);
      if (fs.statSync(curPath).isDirectory()) { // recurse
        deleteall(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(tempPath);
  }
};

const source_pkg = path.join(__dirname, '../package.json')
const target_pkg = path.join(__dirname, '../app/package.json')
const source_main = path.join(__dirname, '../main.js')
const target_main = path.join(__dirname, '../app/main.js')
const source_cli = path.join(__dirname, '../cli.js')
const target_cli = path.join(__dirname, '../app/cli.js')
const source_addon = path.join(__dirname, '../Addon')
const target_addon = path.join(__dirname, '../app/Addon')
const source_assets = path.join(__dirname, '../assets')
const target_assets = path.join(__dirname, '../app/assets')
const source_scripts = path.join(__dirname, '../scripts')
const target_scirpts = path.join(__dirname, '../app/scripts')

copyFile(source_pkg, target_pkg)
copyFile(source_main, target_main)
copyFile(source_cli, target_cli)
checkDirectory(source_addon, target_addon, copy)
checkDirectory(source_assets, target_assets, copy)
checkDirectory(source_scripts, target_scirpts, copy)

