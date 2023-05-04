import * as express from 'express';
import ValidateJWT from '../utils/validateJWT';
import MatchController from '../controllers/MatchController';

const router = express.Router();

const matchController = new MatchController();
const validateJwt = new ValidateJWT();

router.get('/', matchController.getAll);
router.get('/:id', matchController.getById);
router.patch('/:id/finish', matchController.update);
router.patch('/:id', matchController.edit);
router.post('/', validateJwt.validate, matchController.create);

export default router;
