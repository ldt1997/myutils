#!/usr/bin/env node
"use strict";

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _os = require("os");

var _os2 = _interopRequireDefault(_os);

var _colorsCli = require("colors-cli");

var _colorsCli2 = _interopRequireDefault(_colorsCli);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var basepath = "src/pages/";
var cptName = process.argv.splice(2)[0];
var path = cptName.split("/");
var name = path[path.length - 1];
var writes = ["index.js", "Page.jsx", "Page.less", "models/" + name + "Model.js", "services/" + name + "Services.js"];
var reads = [__dirname + "/../src/pages/demo/index.js", __dirname + "/../src/pages/demo/Page.jsx", __dirname + "/../src/pages/demo/Page.less", __dirname + "/../src/pages/demo/models/model.js", __dirname + "/../src/pages/demo/services/services.js"];
var file = [];
var author = _os2.default.homedir().split("\\").pop();

//检测是否存在文件夹
var exists = function exists() {
  return new Promise(function (res) {
    (async function () {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = path[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var a = _step.value;

          _fs2.default.existsSync(basepath + a) ? basepath = "" + basepath + a + "/" : await mkdir(a);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      console.log(_colorsCli2.default.cyan_bt("√ 匹配路径成功"));
      res(basepath);
    })();
  });
};

//建立文件夹
var mkdir = function mkdir(a) {
  return new Promise(function (res, rej) {
    _fs2.default.mkdir(basepath + a, function (err) {
      if (err) rej(err);
      basepath = "" + basepath + a + "/";
      res(basepath);
    });
  }).then(function () {
    _fs2.default.mkdir(basepath + "models", function (err) {
      if (err) console.log(err);
    });
    _fs2.default.mkdir(basepath + "services", function (err) {
      if (err) console.log(err);
    });
  }).catch(function (err) {
    return console.log(err);
  });
};
//读取模板文件内容，并替换为目标组件
var readFile = function readFile() {
  return new Promise(function (res) {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = reads[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var a = _step2.value;

        var text = _fs2.default.readFileSync(a).toString();
        text = text.replace(/time/g, (0, _moment2.default)().format("YYYY/MM/DD")).replace(/temp/g, name).replace(/author/g, author);
        file.push(text);
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    console.log(_colorsCli2.default.cyan_bt("√ 读取模版文件成功"));
    res(file);
  });
};
//生成文件，并填入之前读取的文件内容
var writeFile = function writeFile(file) {
  return new Promise(function (res, rej) {
    (async function () {
      for (var i = 0; i < writes.length; i++) {
        await _fs2.default.writeFile("" + basepath + writes[i], file[i], function (err) {
          if (err) rej(err);
        });
      }
      console.log(_colorsCli2.default.cyan_bt("√ 生成文件成功"));
      res("succ");
    })();
  });
};
async function creatPage() {
  try {
    await exists();
    await readFile();
    await writeFile((await readFile()));
    return console.log(_colorsCli2.default.green("\u221A Successfully created " + name + " page"));
  } catch (err) {
    console.error(err);
  }
}
creatPage();
//# sourceMappingURL=set.js.map