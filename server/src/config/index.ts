export const config =
	process.env.NODE_ENV === 'production' ? require('./production.json') : require('./local.json');
