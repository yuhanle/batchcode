'use strict';

const batch = require('../tools/batch');
const batcher = batch.singleton().getInstance();

function status(req, res, next) {	
	res.send({
		status: 0,
		type: 'SUCCESS',
		message: '成功',
		data: {
			status: batcher.status()
		}
	});
}

function start(req, res, next) {
	batcher.start();
	res.send({
		status: 0,
		type: 'SUCCESS',
		message: '成功',
		data: {
			status: batcher.status
		}
	});
}

function stop(req, res, next) {
	batcher.stop();
	res.send({
		status: 0,
		type: 'SUCCESS',
		message: '成功',
		data: {
			status: batcher.status
		}
	});
}

module.exports = {
	status: status,
	start: start,
	stop: stop
}