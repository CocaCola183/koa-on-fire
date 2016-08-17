import requireDir from 'require-dir'
import Router from 'koa-router'
import _ from 'lodash'

const routes = requireDir('./')
let router = Router()

for (const routerKey in routes) {

	const subroutes = routes[routerKey]['default']
	if (!subroutes) continue
	for (let subrouter of subroutes) {
		const path = `/${routerKey}${subrouter.path}`
		const paramsKeys = path.match(/:\w+/ig)
		let res

		router[subrouter.method](path, async (ctx, next) => {

			if (paramsKeys && paramsKeys.length > 0) {
				let params = {}
				for (const paramsKey of paramsKeys) {
					const key = paramsKey.substring(1)
					params[key] = ctx.params[key]
				}
				res = await subrouter.handler(_.assign(params, ctx.request.body, ctx.request.query, {ctx: ctx, next: next}))
			} else {
				res = await subrouter.handler(_.assign({}, ctx.request.body, ctx.request.query, {ctx: ctx, next: next}))
			}

			if (res.error == 300) {
				ctx.redirect(res.result)
				return 
			}

			if (subrouter.view) {
				if (res.error > 0) {
					await ctx.render('error', res)
				} else {
					res = _.assign(res, {ua: ua(ctx)}, {isApp: isApp(ctx)})
					await ctx.render(subrouter.view, res)
				}
			} else {
				ctx.body = res
			}
		})
	}
}

export default router;