import * as express from 'express';
import TeamController from '../controllers/TeamController';

const router = express.Router();

const teamController = new TeamController();

router.get('/', teamController.getAll);
router.get('/:id', teamController.getById);

export default router;
