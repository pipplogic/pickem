export default (state = new Map(), action = {}) => {
  switch (action.type) {
    case "TEAMS": {
      return new Map(action.teams.map(team => [team.teamId, team]));
    }
    default: {
      return state;
    }
  }
};
