import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

class LeaderboardController {
  private leaderboardService: LeaderboardService;

  constructor() {
    this.leaderboardService = new LeaderboardService();
  }

  public home = async (req: Request, res: Response) => {
    const leaderboard = await this.leaderboardService.home();

    return res.status(200).json(leaderboard);
  };
}

export default LeaderboardController;
