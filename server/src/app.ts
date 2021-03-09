import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import FileStore from 'session-file-store';
import config from '@/config/index';
import router from '@/router/index';
import prisma from '@/database';
import logger from '@/utils/logger';
import morgan from 'morgan';
import schedule from '@/schedule';
import cors from 'cors';
import passport from 'passport';
import passportConfig from '@/passport';

require('dotenv').config();

const app = express();
const store = FileStore(session);

app.use('/images', express.static('images'));
app.use(express.json({ limit: 52428800 }));
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true,
	}),
);
app.use(cookieParser(config.secret));
app.use(
	session({
		resave: false,
		saveUninitialized: false,
		secret: config.secret,
		store: new store({ logFn() {} }),
		cookie: {
			httpOnly: false,
			secure: false,
			maxAge: 1000 * 60 * 60 * 2,
		},
	}),
);

app.use(passport.initialize());
app.use(passport.session());
passportConfig();

app.use((req, res, next) => {
	// console.log('req.id :', req.ip);
	// const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	// console.log('ip: ', ip);
	next();
});

app.use('/api', router);

app.response.returnSuccess = function (data) {
	return this.status(200).json({
		error: false,
		...data,
	});
};
app.response.returnError = function (status, message) {
	return this.status(status).json({
		error: true,
		message,
	});
};

prisma.$connect().then(() => {
	logger.info('Prisma connected!');
	schedule();
	app.listen(config.port, '0.0.0.0', () => {
		console.info(`\u001b[96mServer on port at\u001b[00m \u001b[93m${config.port}\u001b[00m`);
	});
});
