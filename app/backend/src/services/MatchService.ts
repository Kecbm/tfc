import Match from '../database/models/Match';
import Team from '../database/models/Team';
import NewMatch from '../interfaces/NewMatch';
import HttpException from '../utils/HttpException';

class MatchService {
  private match: typeof Match;

  constructor() {
    this.match = Match;
  }

  public getAll() {
    return this.match.findAll({
      include: [
        {
          model: Team,
          as: 'teamHome',
          attributes: ['teamName'],
        },
        {
          model: Team,
          as: 'teamAway',
          attributes: ['teamName'],
        }],
    });
  }

  public getById(id: number) {
    return this.match.findByPk(id);
  }

  public update(id: number) {
    return this.match.update({ inProgress: false }, { where: { id } });
  }

  public edit(homeTeamGoals: number, awayTeamGoals: number, id: number) {
    return this.match.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }

  public async create(match: NewMatch) {
    const teams = await this.match.findAll({
      where: { id: [match.homeTeam, match.awayTeam] },
    });

    if (teams.length !== 2) {
      throw new HttpException(401, 'There is no team with such id!');
    }

    return this.match.create(match);
  }
}

export default MatchService;
