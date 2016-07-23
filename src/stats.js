import { byName } from './data';

// TODO: this is incorrect, there are constants for each level, need to get exact values
// http://pokemongo.gamepress.gg/cp-multiplier
// determine cp multiplier by level, each 0.5 levels we get:
// 1-10: 0.009426125469
// 10-20: 0.008919025675
// 20-30: 0.008924905903
// 30-40: 0.00445946079
export const cpByLevel = {};
export const levelByCp = {};

let cp = 0;
let i = 1;
while (i <= 40) {
  if (i <= 10) {
    cp += 0.009426125469;
  } else if (i <= 20) {
    cp += 0.008919025675;
  } else if (i <= 30) {
    cp += 0.008924905903;
  } else {
    cp += 0.00445946079;
  }

  cpByLevel[i] = cp;
  levelByCp[cp] = i;

  // get to next level
  i += 0.5;
}

// how perfect pokemon is, IVs
export const powerQuotient = pokemon => {
  const atk = pokemon.individual_attack || 0;
  const def = pokemon.individual_defense || 0;
  const sta = pokemon.individual_stamina || 0;
  return (atk + def + sta) / 45;
};

// current cp, based on when pokemon was caught + how many power ups happened
export const cpMultiplier = pokemon =>
  pokemon.cp_multiplier + (pokemon.additional_cp_multiplier || 0);

// returns pokemons current stats
export const calc = (pokemon, level) => {
  if (level < 1 || level > 40) {
    throw new Error('level must be >= 1 and <= 40');
  }

  const { BaseStamina, BaseAttack, BaseDefense } = byName[pokemon.pokemon_id];

  // current cp of pokemon & max cp of pokemon for current trainer level
  const currentCpMultiplier = cpMultiplier(pokemon);
  const pokemonLevel = levelByCp[currentCpMultiplier];
  const maxCpMultiplier = cpByLevel[level];

  // max stats for current player level
  const maxAttack = (BaseAttack + pokemon.individual_attack) * maxCpMultiplier;
  const maxDefense = (BaseDefense + pokemon.individual_defense) * maxCpMultiplier;
  const maxStamina = (BaseStamina + pokemon.individual_stamina) * maxCpMultiplier;

  // current stats of the pokemon
  const attack = (BaseAttack + pokemon.individual_attack) * currentCpMultiplier;
  const defense = (BaseDefense + pokemon.individual_defense) * currentCpMultiplier;
  const stamina = (BaseStamina + pokemon.individual_stamina) * currentCpMultiplier;

  // max CP for this trainer level
  const maxCombatPower = (maxAttack * (maxDefense ^ 0.5) * (maxStamina ^ 0.5) * (maxCpMultiplier ^ 2)) / 10;

  return {
    level: pokemonLevel,
    attack,
    defense,
    stamina,
    maxAttack,
    maxDefense,
    maxStamina,
    maxCombatPower,
    powerQuotient: powerQuotient(pokemon)
  };
};

