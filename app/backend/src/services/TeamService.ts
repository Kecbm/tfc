import Team from '../database/models/Team';

class TeamService {
  private team: typeof Team;

  constructor() {
    this.team = Team;
  }

  public getAll() {
    return this.team.findAll();
  }

  public getById(id: number) {
    return this.team.findByPk(id);
  }
}

export default TeamService;
