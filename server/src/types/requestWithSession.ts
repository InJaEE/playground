import { Request } from 'express';

export default interface RequestWithSession extends Request {
	user?: {
		isAdmin?: boolean;
	};
}
