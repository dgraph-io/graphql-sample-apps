const chalk = require("chalk");

async function overall({ parent }) {
  console.log(chalk.blue("Test package"));
  let paceWeight,
    shootingWeight,
    passingWeight,
    dribblingWeight,
    defenseWeight,
    physicalWeight = 0;

  if (parent.position == "Forward") {
    paceWeight = 0.3;
    shootingWeight = 0.25;
    passingWeight = 0.1;
    dribblingWeight = 0.25;
    defenseWeight = 0.03;
    physicalWeight = 0.07;
  } else if (parent.position == "Midfield") {
    paceWeight = 0.1;
    shootingWeight = 0.15;
    passingWeight = 0.35;
    dribblingWeight = 0.2;
    defenseWeight = 0.1;
    physicalWeight = 0.1;
  } else if (parent.position == "Defense") {
    paceWeight = 0.05;
    shootingWeight = 0.05;
    passingWeight = 0.1;
    dribblingWeight = 0.1;
    defenseWeight = 0.4;
    physicalWeight = 0.3;
  }

  return Math.round(
    parent.pace * paceWeight +
      parent.shooting * shootingWeight +
      parent.passing * passingWeight +
      parent.dribbling * dribblingWeight +
      parent.defending * defenseWeight +
      parent.physical * physicalWeight
  );
}

async function sendTransferRequest({ args, graphql }) {
  // Can send email to the player by calling a service here
  const results = await graphql(
    `
      mutation($player: String!, $currentclub: String!) {
        addTransfer(input: [{ player: $player, currentclub: $currentclub }]) {
          transfer {
            id
            player
            currentclub
          }
        }
      }
    `,
    { player: args.player, currentclub: args.currentclub }
  );
  return results.data.addTransfer.transfer[0].id;
}

async function topForwardPlayers({ dql }) {
  // DQL query for players with shooting higher than 80
  const results = await dql.query(`query queryPlayer {
   queryPlayer(func: type(Player), orderdesc: Player.shooting) @filter(ge(Player.shooting, 80)){
                    name: Player.name
 					position: Player.position
 					shooting: Player.shooting
 					passing: Player.passing
 					club: Player.club,
                    country: Player.country 
       }
       }`);
  return results.data.queryPlayer;
}

self.addGraphQLResolvers({
  "Player.overall": overall,
  "Mutation.sendTransferRequest": sendTransferRequest,
  "Query.topForwardPlayers": topForwardPlayers,
});
