export default process.env.NODE_ENV === 'production'
	? require('./production.json')
	: require('./local.json');
