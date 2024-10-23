import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidId = (req, res, next) => {
  const { studentId } = req.params;

  if (!isValidObjectId(studentId) !== true) {
    throw createHttpError(400, 'Id is not valid!');
  }
  next();
};
