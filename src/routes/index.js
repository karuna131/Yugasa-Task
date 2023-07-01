// routes call
const userRoutes = require('./userRoutes');

const routes = (app, router) => {
  app.use(router);
  app.use((req, res, next) => {
    const error = new Error('Not found.');
    error.status = 404;
    next(error);
  });
  app.use((error, req, res, next) => {
    return res.status(error.status || 500).send({message: error.message});
  });

  userRoutes(router);
};

module.exports = routes;
