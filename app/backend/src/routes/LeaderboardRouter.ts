import * as express from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const router = express.Router();

const leaderboardController = new LeaderboardController();

router.get('/home', leaderboardController.home);

export default router;
