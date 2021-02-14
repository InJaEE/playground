import { Router } from 'express';
import main from './main.route';
import post from './post.route';
import category from './category.route';

const router = Router();

router.use('/main', main);
router.use('/post', post);
router.use('/category', category);

export default router;
