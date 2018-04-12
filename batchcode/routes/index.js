'use strict';

const User = require('./User');
const Status = require('./Status');

function router(app){	
	app.use('/v1/user', User);
	app.use('/v1/status', Status);
}

module.exports = router