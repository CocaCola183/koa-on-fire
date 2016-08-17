import fs from 'fs';
import config from '../../../config.json';
import Logger from '../logger/index.js';

const configGlobal = () => {
	global.log = Logger(config.log);
}

const pre = () => {
	initLogDir();
}

configGlobal();

export default pre; 