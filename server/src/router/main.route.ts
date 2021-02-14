import { Router } from 'express';
import prisma from '@/database';
const router = Router();

router.get('/', async (req, res) => {
	res.send('Hello!');
});

export default router;
