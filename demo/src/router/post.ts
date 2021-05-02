import { Router } from 'express';
import { PostController } from '../controller';

const router = Router();

const postController = new PostController();

router.get('/', postController.index);

export const PostRouter = router;