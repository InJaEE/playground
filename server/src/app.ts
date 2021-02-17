import express from 'express';
import { config } from '@/config/index';
import router from '@/router/index';
import prisma from '@/database';
import logger from '@/utils/logger';
import morgan from 'morgan';
import schedule from '@/schedule/rank';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true,
	}),
);
app.use('/api', router);

prisma.$connect().then(() => {
	logger.info('Prisma connected!');
	schedule();
	app.listen(config.port, () => {
		console.info(`\u001b[96mServer on port at\u001b[00m \u001b[93m${config.port}\u001b[00m`);
	});
});
