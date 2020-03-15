export default (validator, ...args) => (req, res, next) => {
  const validatorFnc =
    args.length > 0 ? validator(...args.map(arg => arg(req))) : validator;

  if (!validatorFnc(req.body)) {
    throw {
      name: 'ValidationError',
      message: validatorFnc.errors,
    };
  }
  next();
};
