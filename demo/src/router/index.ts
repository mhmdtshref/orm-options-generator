import router, { NextFunction, Router } from 'express';
import { PostRouter } from './post';

const apiRouter = router();

apiRouter.use('/posts', PostRouter)

export default apiRouter;