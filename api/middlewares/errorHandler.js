export const errorHandler = (e, req, res, next) => {
  const badRequestErrorsNames = ['ValidationError', 'MongoError'];
  if (e.name && badRequestErrorsNames.includes(e.name)) {
    res.status(400).json({
      message: e.message,
    });
  } else {
    res.status(500).json({
      message: e.message || e,
    });
  }
  next();
};

export function badRequestException(message) {
  throw {
    name: 'ValidationError',
    message,
  };
}

export const catchError = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
