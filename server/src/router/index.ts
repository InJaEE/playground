import { Router } from 'express';
import main from './main.route';
import post from './post.route';
import category from './category.route';
import comment from './comment.route';
import user from './user.route';

const router = Router();

router.use('/main', main);
router.use('/post', post);
router.use('/category', category);
router.use('/comment', comment);
router.use('/user', user);

export default router;
