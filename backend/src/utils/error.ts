import { NextFunction, Request, Response } from "express";

const errorHandler: any = (method: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await method(req, res, next);
    } catch (error: any) {
      //   console.log(error.message);
      res
        .status(404)
        .json({ success: false, message: error.message, error: error.message });
      next(error);
    }
  };
};

export default errorHandler;
