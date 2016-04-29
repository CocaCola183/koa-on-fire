import 'babel-polyfill';
import {pre} from './tool/run';
import Koa from 'koa'
import Cheerio from 'cheerio'
import Router from 'koa-router';
import router from './router';
import config from '../config.json';
import favicon from 'koa-favicon';
import ResType from './router/type/ResType';
import cors from 'kcors';
import static_serve from 'koa-serve-static';
import path from 'path';
import FileStreamRotator from 'file-stream-rotator';
import morgan from 'koa-morgan';

const app = new Koa();
const port = process.PORT || 3000;

/* 跨域 */
app.use(cors());

/* 服务器内部错误捕获 */
app.use(async (ctx, next) => {
  try {
    await next(); // next is now a function
  } catch (err) {
  	ctx.body = new ResType(500, err.message, null);
  }
});

/* icon */
app.use(favicon(__dirname + '/../public/favicon.ico'));

/* http log */
app.use(morgan('combined', {
	stream: FileStreamRotator.getStream({
	  date_format: 'YYYY-MM-DD',
	  filename: __dirname + '/../log/http' + '/access-%DATE%.log',
	  frequency: 'daily',
	  verbose: false
	})
}));
 
/* http日志 */
app.use(async function (ctx, next) {
	log.http(`${ctx.request.method} ${ctx.request.url}`);
	await next();
});

/* 路由 */
router.get('/', async (ctx, next) => {
	ctx.body = await pm25.info('hello world');
});
app
  .use(router.routes())
  .use(router.allowedMethods());

/* 静态文件服务 */
app.use(static_serve(path.join(__dirname, '../public')));

/* 404 */
app.use(async (ctx, next) => {
	if (ctx.status == 404) {
		ctx.body = new ResType(404, 'not found', null);
	}
	next();
});

/*start server*/
app.listen(port, () => {
	log.log(`Server is listening on port:${port}`);
});

/*开启定时服务*/
(function () {

})();