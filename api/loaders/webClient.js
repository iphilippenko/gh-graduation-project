export default (app, express, config) => {
  app.use(express.static(config.CLIENT_BUILD_URL));
  app.get('/*', (req, res, next) => {
    console.log(req.originalUrl);
    if (req.originalUrl.match(/\/api/g)) {
      next();
    } else {
      res.sendFile(path.resolve(config.CLIENT_BUILD_URL, 'index.html'));
    }
  })
};