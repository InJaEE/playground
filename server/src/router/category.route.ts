import { Router } from 'express';
import prisma from '@/database';
const router = Router();

router.post('/', async (req, res) => {
	const { name, type } = req.body;
	// type blog, ...
	const result = await prisma.category.create({
		data: {
			name,
			type,
		},
	});
	res.json({ result });
});

export default router;
