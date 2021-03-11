import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';
import appRoot from 'app-root-path';
import path from 'path';

const { combine, timestamp, printf, label } = winston.format;

const logFormat = printf(({ level, message, label, timestamp }) => {
	return `${timestamp} [${label}] ${level}: ${message}`;
});
const dirname = path.join(appRoot.path, 'logs');
const datePattern = 'YYYY-MM-DD';

// error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
const logger = winston.createLogger({
	format: combine(
		label({
			label: 'Playground',
		}),
		timestamp({
			format: 'YYYY-MM-DD HH:mm:ss',
		}),
		logFormat,
	),
	transports: [
		new winstonDaily({
			level: 'info',
			datePattern,
			dirname,
			filename: `%DATE%.log`,
			maxFiles: 30,
			zippedArchive: true,
		}),
		new winstonDaily({
			level: 'error',
			datePattern,
			dirname,
			filename: `%DATE%.error.log`,
			maxFiles: 30,
			zippedArchive: true,
		}),
	],
	exceptionHandlers: [
		// uncaught exception
		new winstonDaily({
			level: 'error',
			datePattern,
			dirname,
			filename: `%DATE%.exception.log`,
			maxFiles: 30,
			zippedArchive: true,
		}),
	],
});

if (process.env.NODE_ENV !== 'production') {
	logger.add(
		new winston.transports.Console({
			format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
		}),
	);
}

export default logger;
