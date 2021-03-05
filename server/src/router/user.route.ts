import { Router } from 'express';
import prisma from '@/database';
import passport from 'passport';
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
			res.json({ user: isAdmin });
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

export default router;
