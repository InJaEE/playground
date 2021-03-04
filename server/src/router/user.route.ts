import { Router } from 'express';
import prisma from '@/database';
import bcrypt from 'bcrypt';
const router = Router();

router.post('/login', async (req, res) => {
	const { password } = req.body;

	const admin = await prisma.user.findFirst({
		where: {
			role: 'admin',
		},
	});

	const confirmPassword = await bcrypt.compare(password, admin.password);
	if (confirmPassword) {
		res.json({ success: true });
	} else {
		res.json({ error: true });
	}
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
