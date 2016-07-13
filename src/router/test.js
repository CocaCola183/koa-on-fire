const routes = [
	{
		name: '测试',
		path: '/test',
		method: 'get',
		handler: async function () {
			return 'hello test';
		},
	},
	{
		name: '测试',
		path: '/test/:id',
		method: 'get',
		handler: async function ({id}) {
			return `hello ${id}`;
		},
	},
];



export default routes;