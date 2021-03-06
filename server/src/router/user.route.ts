import { Router } from 'express';
import prisma from '@/database';
import passport from 'passport';
import requestWithSession from '@/types/requestWithSession';
const router = Router();

router.post('/login', async (req, res, next) => {
	passport.authenticate('local', (err, isAdmin) => {
		console.log('isAdmin', isAdmin);
		if (err) {
			return next(err);
		}
		return req.login(isAdmin, loginError => {
			if (loginError) {
				console.error(loginError);
				return next(loginError);
			}
			res.json({ isAdmin });
		});
	})(req, res, next);
});

// router.post('/createUser', async (req, res) => {
// 	const { password } = req.body;
// 	const hashedPwd = await bcrypt.hash(password, 10);
// 	await prisma.user.create({
// 		data: {
// 			userEmail: 'admin@injae.com',
// 			password: hashedPwd,
// 			role: 'admin',
// 		},
// 	});
// 	res.send('GOOD');
// });

router.post('/sessionCheck', async (req: requestWithSession, res) => {
	if (req.user?.isAdmin) {
		res.json({ isAdmin: true });
	} else {
		res.json({ isAdmin: false });
	}
});

export default router;
