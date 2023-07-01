const userController = require('../controller/userController');
const {verifyToken} = require('../middleware/verifyToken');

const userRoutes = (app) => {
    app
        .post('/signup',  (req, res, next) => userController.signUp(req, res, next))
        .post('/login',  (req, res, next) => userController.login(req, res, next))
        .put('/update-role', (req, res, next) => userController.updaterole(req, res, next))
        .get('/dashboard', verifyToken, (req, res, next) => userController.dashboardApi(req, res, next))
        .get('/admin', verifyToken, (req, res, next) => userController.adminDetail(req, res, next));
}


module.exports = userRoutes;














// const router = require('express').Router();
// const {signUp, login, updaterole, dashboard} = require('../controller/userController');
// const {verifyToekn} = require('../middleware/verifyToken');

// router.post('/signup', signUp);
// router.post('/login', login);
// router.put('/update-role/:id', updaterole);
// router.get('/dashboard', verifyToekn, (req, res, next) =>  dashboard(req, res, next));

// module.exports = router;
 