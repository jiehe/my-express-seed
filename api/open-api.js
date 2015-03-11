
var formidable = require("formidable");
var util = require('util');
var fs = require('fs');
var api = {};

/**
 * 上传文件
 * @type {{}}
 */
api.uploadFile = function(req, res) {
  var form = new formidable.IncomingForm();
  form.encoding = 'utf-8';
  form.keepExtensions = true;
  form.uploadDir = "./public/upload";
  form.parse(req, function(err, fields, files) {
    res.writeHead(200, {'content-type': 'text/plain'});
    //fs.renameSync(files.upload.path, './public/upload/abc.gif'); 重命名
    res.write('received upload:\n\n');
    res.end(util.inspect({fields: fields, files: files}));
    /**
     * received upload:
     *
     { fields: { user: '' },
       files:
        { upload:
           { domain: null,
             _events: {},
             _events: {},
             _maxListeners: 10,
             size: 25622,
             path: 'C:\\Users\\dong\\AppData\\Local\\Temp\\upload_c35a90ca3ad859799045f14263912394.gif',
             name: 'QQ图片20141215163209.gif',
             type: 'image/gif',
             hash: null,
             lastModifiedDate: Wed Mar 11 2015 12:27:40 GMT+0800 (中国标准时间),
             _writeStream: [Object] } } }
     */
  });
}


module.exports = api;