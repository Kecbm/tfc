import Match from '../database/models/Match';
import Team from '../database/models/Team';

class LeaderboardService {
  private leaderboard: any[];
  private match: typeof Match;
  private team: typeof Team;
  private matches: Match[];

  constructor() {
    this.match = Match;
    this.team = Team;
  }

  private teamPoints(id: number) {
    let totalVictories = 0; let totalDraws = 0; let totalLosses = 0;
    let goalsFavor = 0; let goalsOwn = 0; let totalGames = 0;
    this.matches.forEach((match) => {
      if (match.homeTeam === id) {
        totalGames += 1;
        if (match.homeTeamGoals === match.awayTeamGoals) {
          totalDraws += 1; goalsFavor += match.homeTeamGoals; goalsOwn += match.awayTeamGoals;
        } else if (match.homeTeamGoals > match.awayTeamGoals) {
          totalVictories += 1; goalsFavor += match.homeTeamGoals; goalsOwn += match.awayTeamGoals;
        } else {
          totalLosses += 1; goalsFavor += match.homeTeamGoals; goalsOwn += match.awayTeamGoals;
        }
      }
    });
    const goalsBalance = goalsFavor - goalsOwn; const total = (totalGames * 3);
    const totalPoints = (totalVictories * 3) + totalDraws;
    const efficiency = +((totalPoints / total) * 100).toFixed(2);
    return { totalPoints, totalVictories, totalDraws, totalLosses, goalsFavor, goalsOwn, goalsBalance, efficiency };
  }

  public async home() {
    const teams = await this.team.findAll();
    this.matches = await this.match.findAll({ where: { inProgress: false } });

    this.leaderboard = teams.map((team) => ({
      name: team.teamName,
      totalGames: this.matches
        .filter((match) => match.homeTeam === team.id && match.inProgress === false).length,
      ...this.teamPoints(team.id),
    }));

    return this.leaderboard.sort((a, b) => b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor);
  }
}

export default LeaderboardService;
