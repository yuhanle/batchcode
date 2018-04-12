import axios from 'axios';
import env from '../config/env';

let util = {

};
util.title = function(title) {
    title = title ? title + ' - Home' : '账号显示系统';
    window.document.title = title;
};

const ajaxUrl = env === 'development' ?
    'http://127.0.0.1:3000' :
    env === 'production' ?
    'http://127.0.0.1:3000' :
    'http://127.0.0.1:3000';

util.ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: 30000
});

export default util;