import fs from 'fs';
import config from '../../../config.json';
import Logger from '../logger/index.js';

const pre = () => {
	process.env.env = config.env ? config.env : 'dev';
	global.log = Logger();
}

pre();

export default pre; 