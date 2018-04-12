'use strict';

var formidable = require('formidable');
var crypto = require('crypto');
var request = require('request');
var dtime = require('time-formater');
var User = require('../models/User');

function login(req, res, next) {
	const form = new formidable.IncomingForm();
	form.parse(req, function (err, fields, files) {
		if (err) {
			res.send({
				status: 0,
				type: 'FORM_DATA_ERROR',
				message: '表单信息错误'
			})
			return
		}

		const {phone, password, status = 1} = fields;
		try{
			if (!phone) {
				throw new Error('用户名参数错误')
			}else if(!password){
				throw new Error('密码参数错误')
			}
		}catch(err){
			console.log(err.message, err);
			res.send({
				status: 0,
				type: 'GET_ERROR_PARAM',
				message: err.message,
			})
			return
		}
		const newpassword = password;
		User.findAll({
			where: {
				phone: phone
			}
		})
		.then (function (user) {
			console.log(user[0].password);
			if (user[0].password === newpassword) {
				res.send({
					status: 0,
					type: 'SUCCESS',
					message: '成功',
					data: user[0]
				})
			}else {
				res.send({
					status: 0,
					type: 'ERROR_LOGIN_PASSWORD',
					message: '用户名或密码错误'
				})
			}
		})
		.catch(function (err) {
			console.log(err)
			res.send({
				status: 100,
				type: 'ERROR',
				message: '连接数据库失败',
				data: null
			})
		})
	})
}

function list(req, res, next) {
	User.findAll()
		.then(function (userlist) {
		// 遍历修改图像指向可访问的服务器
		for (var i = 0; i < userlist.length; i++) {
			if (userlist[i].head_url) {
				// userlist[i].head_url = 'http://127.0.0.1:3000/static/images/' + userlist[i].head_url;
			}else {
				userlist[i].head_url = null;
			}
		}
		res.send({
			status: 0,
			type: 'SUCCESS',
			message: '成功',
			data: userlist
		})
	}).catch(function (err) {
		console.log(err)
		res.send({
			status: 100,
			type: 'ERROR',
			message: '连接数据库失败',
			data: null
		})
	});	
}

function add(req, res, next) {
	const form = new formidable.IncomingForm();
	form.parse(req, function (err, fields, files) {
		console.log(err)
		if (err) {
			res.send({
				status: 0,
				type: 'FORM_DATA_ERROR',
				message: '表单信息错误'
			})
			return
		}

		const {phone, password, status = 1} = fields;
		try{
			if (!phone) {
				throw new Error('用户名参数错误')
			}else if(!password){
				throw new Error('密码参数错误')
			}
		}catch(err){
			console.log(err.message, err);
			res.send({
				status: 0,
				type: 'GET_ERROR_PARAM',
				message: err.message,
			})
			return
		}
		const newpassword = password;
		var thatRes = res;
		User.findAll({
			where: {
				phone: phone
			}
		})
		.then (function (user) {
			if (user.length) {
				thatRes.send({
					status: 0,
					type: 'ERROR_REGISTER_PASSWORD',
					message: '该账户已注册'
				})
			}else {
				User.create(fields)
				.then(function (res) {
					thatRes.send({
						status: 0,
						type: 'SUCCESS',
						message: '成功',
						data: user[0]
					})
				})
				.catch(function (err) {
					console.log(err)
					thatRes.send({
						status: 100,
						type: 'ERROR',
						message: '连接数据库失败',
						data: null
					})
				})
			}
		})
		.catch(function (err) {
			console.log(err)
			thatRes.send({
				status: 100,
				type: 'ERROR',
				message: '连接数据库失败',
				data: null
			})
		})
	})
}

function update(req, res, next) {
	const form = new formidable.IncomingForm();
	form.parse(req, function (err, fields, files) {
		console.log(err)
		if (err) {
			res.send({
				status: 0,
				type: 'FORM_DATA_ERROR',
				message: '表单信息错误'
			})
			return
		}

		const {phone, head_url, status = 1} = fields;
		try{
			if (!phone) {
				throw new Error('用户名参数错误')
			}else if(!head_url){
				throw new Error('密码参数错误')
			}
		}catch(err){
			console.log(err.message, err);
			res.send({
				status: 0,
				type: 'GET_ERROR_PARAM',
				message: err.message,
			})
			return
		}

		User.update(fields, { 
			where: { 
				phone: phone 
			} 
		})
		.then (function () {
			res.send({
				status: 0,
				type: 'SUCCESS',
				message: '更新数据成功'
			})
		})
		.catch(function (err) {
			console.log(err)
			res.send({
				status: 100,
				type: 'ERROR',
				message: '连接数据库失败',
				data: null
			})
		})
	})
}

module.exports = {
	login: login,
	list: list,
	add: add,
	update: update
}