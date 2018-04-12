var schedule = require('node-schedule');
var request = require('request');
var randomName = require("chinese-random-name");
var path = require('path');
var fs = require('fs');
var FormData = require('form-data');

var baseUrl = 'http://139.196.221.160/';
var registerUrl = baseUrl + 'new/index.php/user/register';
var addHeadUrl = baseUrl + 'new/index.php/user/addhead';
var loginUrl = baseUrl + 'new/index.php/user/login';

var uPhone = '13373911572';
var ulistCount = 0;
var uStatus = 0;
var uJop = null;

var Singleton = function() {
  var instance;

  function init() {
    function privateMethod() {
        console.log( "I am private" );
    }

    var privateVariable = "Im also private";
    var privateRandomNumber = Math.random();
    return {
        status: function () {
            return uStatus;
        },
        start: function() {
            start();
        },
        stop: function () {
            stop();
        }
    };
  };

  return {
    getInstance: function () {
      if (!instance) {
        instance = init();
      }
      return instance;
    }
  };
}

// 其他方式实现单例
var Singleton1 = (function(){
    function Class(){
        this.status = 0;
    }

    Class.prototype = {
        constructor: Class,
        start: function() {
            start();
        },
        stop: function () {
            stop();
        }
    }
    
    this.getInstance = function() {
        if (_instance === null) {
            _instance = new Class();
        }
        return _instance;
    }    
})();

// 遍历文件夹
var walk = function(dir) {
    var results = [];
    var list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = dir + '/' + file;
        var stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            /* Recurse into a subdirectory */
            results = results.concat(walk(file));
        } else { 
            /* Is a file */
            results.push(file);
        }
    });
    return results;
}

// 上传头像
function yx_addHead(callback) {
    function getRandomArbitrary(min, max) {
        return Math.ceil(Math.random()/max);
    }

    var filePath = path.join(__dirname, '..', '/static/images');
    var list = walk(filePath);
    var randomPath = list[ulistCount++];

    // NOTE: Advanced use-case, for normal use see 'formData' usage above
    var r = request.post(addHeadUrl, function optionalCallback(err, httpResponse, body) {
        if (err) {
            console.log(err);
            return;
        }
        
        var info = JSON.parse(body);
        console.log(info);

        if (info.status == 0) {
            // 调用注册接口
            yx_register(info.data.pic_url, function (err, resp) {
                if (callback) {
                    callback(null, resp)
                }

                // 成功以后 将注册数据保存至数据库中
                register(resp);
            })
        }else {
            if (callback) {
                callback(err, null)
            }
        }
    });

    var form = r.form();
    form.append('pic', fs.createReadStream(randomPath), {filename: 'image.jpg'});
}

// 登陆
function yx_login(){
    request.post({ 
        url: loginUrl, 
        form: { 
            'phone': '13373911572',
            'password': '111111'
        }
    }, 
    function(err, httpResponse, body) { 
        if (err) {
            console.log(err);
            return;
        }
      
        console.log(body);
    });
}

// 友信注册账户 -> 注册账户之前需要先上传头像
// birthday    978192000
// head_url    http://139.196.221.160/media/pics/15210984035aaa1ea37ca4b
// password    111111
// phone   18916844451
// roots   北京市 - 东城区
// sex 3
// user_name   yuhanle
// user_type   2
function yx_register(head_url, callback) {
    const dateTime = new Date().getTime();
    var birthday = Math.floor(dateTime/1000) - 18*365*24*60*60;
    var roots = '北京市 - 东城区';
    var sex = Math.ceil(Math.random()/3.0);
    var user_type = Math.ceil(Math.random()/2.0);
    var phone = uPhone;
    // var password = Math.random().toString(36).substr(2);
    var password = '111111';
    var head_url = head_url;
    var user_name = randomName.generate();

    var data = { 
        'phone': phone,
        'password': password,
        'sex': sex,
        'roots': roots,
        'user_name': user_name,
        'user_type': user_type,
        'birthday': birthday,
        'head_url': head_url
    }

    request.post({ 
        url: registerUrl, 
        form: data
    }, 

    function(err, httpResponse, body) { 
        if (err) {
            console.log(err);
            if (callback) {
                callback(err, null)
            }
            return;
        }
        
        var info = JSON.parse(body);
        console.log(info);
        if (info.status == 0) {
            // 注册成功
            if (callback) {
                callback(null, data)
            }
        }else {
            // 注册失败
            if (callback) {
                callback(err, null)
            }
        }
    });
}

// 更新用户资料
function update(phone) {
    function getRandomArbitrary(min, max) {
        return Math.ceil(Math.random()/max);
    }

    var filePath = path.join(__dirname, '..', '/static/images');
    var list = walk(filePath);

    console.log('更新第' + ulistCount + '张头像');

    var randomFileSplit = list[ulistCount++].split("/");
    var randomFileName = randomFileSplit[randomFileSplit.length - 1];

    var options = {
        url: 'http://127.0.0.1:3000/v1/user/update',
        headers: {
            'User-Agent': 'request'
        },
        method: 'POST',
        form: {
            phone: phone,
            head_url: randomFileName
        }
    };

    function callback(err, resp, body) {
        if (!err && resp.statusCode == 200) {
            var info = JSON.parse(body);
            console.log(info.message);
        }
    };

    request(options, callback)
}

// 注册用户
function register(resp) {
    var options = {
        url: 'http://127.0.0.1:3000/v1/user/register',
        headers: {
            'User-Agent': 'request'
        },
        method: 'POST',
        form: resp
    };

    function callback(err, resp, body) {
        if (!err && resp.statusCode == 200) {
            var info = JSON.parse(body);
            console.log(info.message);
        }

        uPhone++;
    };

    request(options, callback)
}

function scheduleCronstyle(){
    uJop = schedule.scheduleJob('30 * * * * *', function(){
        console.log('scheduleCronstyle:' + new Date());
        yx_addHead(function (err, resp) {

        });
    }); 
}

function queryLastUname(callback2) {
    var options = {
        url: 'http://127.0.0.1:3000/v1/user/list',
        headers: {
            'User-Agent': 'request'
        },
        method: 'GET'
    };

    function callback(err, resp, body) {
        if (!err && resp.statusCode == 200) {
            var info = JSON.parse(body);       
            if (callback2) {
                callback2(info)
            }
        }
    };

    request(options, callback)
}

// 启动注册账号服务
function start() {
    // 查询当前注册到第几位用户
    queryLastUname(function (res) {
        if (res.data.length) {
            ulistCount = res.data.length; 
            uPhone = res.data[res.data.length-1].phone++;
        }else {
            ulistCount = 0; 
            uPhone = '13373911572';
        }        

        yx_addHead(function (err, resp) {

        });

        uStatus = 1;
        scheduleCronstyle();
        console.log('注册服务开启...');
    });    
}

function stop() {
    uJop.cancel();
    uStatus = 0;
    console.log('注册服务停止...');
}

module.exports = {
    singleton: Singleton
};
