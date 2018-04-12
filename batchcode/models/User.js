const db = require('../db/db');

module.exports = db.defineModel('tb_user', {
	id: {
		type: db.INTEGER(50),
		autoIncrement: true,
		unique: true
	},
	password: { 
		type: db.TEXT(16),
		allowNull: true
	},
	phone: { 
		type: db.TEXT(11),
		allowNull: false
	},
	user_name: { 
		type: db.TEXT(10),
		allowNull: true
	},
	user_type: { 
		type: db.BIGINT,
		allowNull: true
	},
	sex: { 
		type: db.BIGINT,
		allowNull: true
	},
	birthday: {
		type: db.BIGINT,
		allowNull: true
	},
	roots: { 
		type: db.TEXT(20),
		allowNull: true
	},
	head_url: {
		type: db.TEXT(100),
		allowNull: true
	}
});