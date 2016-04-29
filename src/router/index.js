import requireDir from 'require-dir';
import Router from 'koa-router';

const routes = requireDir('./');
let router = Router();

for (const routerKey in routes) {
	const subroutes = routes[routerKey]['default'];
	if (!subroutes) continue;
	for (let subrouter of subroutes) {
		const path = subrouter.path;
		const paramsKeys = path.match(/:\w+/ig);

		router[subrouter.method](subrouter.path, async (ctx, next) => {
			if (paramsKeys && paramsKeys.length > 0) {
			let params = {};
			for (const paramsKey of paramsKeys) {
				const key = paramsKey.substring(1);
				params[key] = ctx.params[key];
			}
			ctx.body = await subrouter.handler(params);
			} else {
				ctx.body = await subrouter.handler();
			}
		});
	}
}

export default router;