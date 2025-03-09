import mongoose from 'mongoose';
import { TErrorSource } from '../interface/error';

const handleDuplicateError = (err: any) => {
  const match = err.message.match(/"([^"]+)"/);
  const errorSources: TErrorSource = [
    {
      path: '',
      message: `${match[1]} is Already Exists`,
    },
  ];
  const statusCode = 409;
  return {
    statusCode,
    message: 'DuplicateError',
    errorSources,
  };
};
export default handleDuplicateError;
