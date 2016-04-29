import fs from 'fs';
import config from '../../../config.json';
import Log from '../../../log.js';

const configGlobal = () => {
	global.log = Log(config.log);
}

const pre = () => {
	initLogDir();
}

configGlobal();

export default pre; 