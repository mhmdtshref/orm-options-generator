import { Request, Response } from "express";
import { Post } from '../models';
import { ORMOptionsGenerator } from '../../../src';

const { sequelizeFindOptionsGenerator } = ORMOptionsGenerator;

export class PostController {
    index = async (request: Request, response: Response) => {
        try {
            const options = sequelizeFindOptionsGenerator(request.query);
            const data = await Post.findAll(options);
            response.status(200).json({ status: true, data });
        } catch(error) {
            response.status(400).json({
                success: false,
                error: error?.message,
            });
        }
    }
}