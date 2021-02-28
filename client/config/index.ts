import local from './local';
import prod from './production';

let config = {};

if (process.env.NODE_ENV === 'production') {
	config = prod;
} else {
	config = local;
}

export default config;
