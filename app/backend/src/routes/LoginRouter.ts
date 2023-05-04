import * as express from 'express';
import LoginController from '../controllers/LoginController';

import ValidateLogin from '../middlewares/validateLogin';

const router = express.Router();

const loginController = new LoginController();
const body = new ValidateLogin();

router.post('/', body.validate, loginController.login);
router.get('/validate', loginController.validate);

export default router;
