import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

class MatchController {
  private matchService: MatchService;

  constructor() {
    this.matchService = new MatchService();
  }

  public getAll = async (req: Request, res: Response) => {
    const matches = await this.matchService.getAll();

    res.status(200).json(matches);
  };

  public getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const match = await this.matchService.getById(Number(id));

    res.status(200).json(match);
  };

  public update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const match = await this.matchService.update(Number(id));

    res.status(200).json(match);
  };

  public edit = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const match = await this.matchService.edit(homeTeamGoals, awayTeamGoals, Number(id));

    res.status(200).json(match);
  };

  public create = async (req: Request, res: Response) => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;

    if (homeTeam === awayTeam) {
      return res
        .status(401).json({ message: 'It is not possible to create a match with two equal teams' });
    }

    const match = await this
      .matchService
      .create({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress: true });

    res.status(201).json(match);
  };
}

export default MatchController;
