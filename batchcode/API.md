## 友信批量注册系统

## 安装

```
cd batchcode
npm install
npm run start
```

打开浏览器：http://127.0.0.1:3000

## API

基础信息

```
baseUrl = "139.196.221.160"
POST /new/index.php/user/addhead HTTP/1.1
Host	139.196.221.160
Content-Type	multipart/form-data; boundary=Boundary+E408C44ADA73F327
Connection	keep-alive
Accept	application/json
User-Agent	Yoosense/1.0 (iPhone; iOS 11.2.6; Scale/2.00)
Accept-Language	zh-Hans-CN;q=1, en-CN;q=0.9
Content-Length	20398
Accept-Encoding	gzip, deflate
```

### 注册

URL	http://139.196.221.160/new/index.php/user/register

req

```
birthday	978192000
head_url	http://139.196.221.160/media/pics/15210984035aaa1ea37ca4b
password	111111
phone	18916844451
roots	北京市 - 东城区
sex	3
user_name	yuhanle
user_type	2
```

resp

```
{
	"status": 0,
	"message": "\u6ce8\u518c\u6210\u529f\uff01",
	"data": {
		"uid": "183"
	}
}
```

### 检查用户名

URL	http://139.196.221.160/new/index.php/user/checkusername

req 

```
user_name	yuhanle
```

resp

```
{
	"status": 0,
	"message": "\u7528\u6237\u540d\u672a\u6ce8\u518c!"
}
```

### 登陆

URL	http://139.196.221.160/new/index.php/user/login

req 

```
password	111111

phone	13373911572
```

resp

```
{
	"status": -2,
	"message": "\u7528\u6237\u540d\u6216\u5bc6\u7801\u6709\u8bef\uff0c\u8bf7\u91cd\u65b0\u767b\u5f55\uff01"
}
```

### 上传头像

URL	http://139.196.221.160/new/index.php/user/addhead

req

```
pic	image.jpg
	Size	19.77 KB (20,243 bytes)
	Content-Type	image/jpg
	Client Path	image.jpg
```

resp

```
{
	"status": 0,
	"message": "\u6dfb\u52a0\u6210\u529f\uff01",
	"data": {
		"pic_url": "http:\/\/139.196.221.160\/media\/pics\/15210984035aaa1ea37ca4b"
	}
}
```

### 更新资料


