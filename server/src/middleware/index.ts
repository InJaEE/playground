import express from 'express';
import session from 'express-session';
import FileStore from 'session-file-store';
import logger from 'morgan';
import cors from 'cors';
import config, { frontend } from '../config';
import passport from 'passport';
import passportConfig from '@/passport';

const router = express.Router();
passportConfig();

const store = FileStore(session);

router.use(logger('common'));
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

const frontendURL = frontend.map(value => `http://${value.url}:${value.port}`);
const corsOption = {
	origin(origin, callback) {
		if (frontendURL.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error('not allowed by CORS'));
		}
	},
	credentials: true,
};

router.use(cors(corsOption));
router.use(
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
router.use(passport.initialize());
router.use(passport.session());

export default router;
