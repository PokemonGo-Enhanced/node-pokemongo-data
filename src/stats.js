import leveling from '../leveling.json';
import { byName } from './data';

// Correct spreadsheet
// https://docs.google.com/spreadsheets/d/1xZ1daunztOgvOZxO7ABfJPF41-2mqMDzY1Qs_0OWwq8/edit#gid=320772897
// determine cp multiplier by level, each 0.5 levels we get:
export const cpByLevel = {};
export const levelByCp = {};
export const candyToLevel = {};
export const stardustToLevel = {};

// parse that
leveling.forEach(level => {
  const normalizedLevel = parseInt(level['Pokemon level'], 10);
  const cp = parseFloat(level.TotalCpMultiplier);

  cpByLevel[normalizedLevel] = cp;
  cpByLevel[String(normalizedLevel)] = cp;

  levelByCp[cp.toFixed(8)] = normalizedLevel;
  levelByCp[level.TotalCpMultiplier] = normalizedLevel;

  candyToLevel[normalizedLevel] = level['Candies to this level'];
  candyToLevel[String(normalizedLevel)] = level['Candies to this level'];

  stardustToLevel[normalizedLevel] = level['Stardust to this level'];
  stardustToLevel[String(normalizedLevel)] = level['Stardust to this level'];
});

// how perfect pokemon is, IVs
export const powerQuotient = pokemon => {
  const atk = pokemon.individual_attack || 0;
  const def = pokemon.individual_defense || 0;
  const sta = pokemon.individual_stamina || 0;
  return Math.round((atk + def + sta) / 45 * 100);
};

// current cp, based on when pokemon was caught + how many power ups happened
export const cpMultiplier = pokemon =>
  pokemon.cp_multiplier + (pokemon.additional_cp_multiplier || 0);

// calculate CP
export const cp = (multiplier, attack, stamina, defense) =>
  floor(attack * pow(defense, 0.5) * pow(stamina, 0.5) * pow(multiplier, 2) / 10);

export const relativeInfluence = (...baseStats) => {
  const sum = baseStats.reduce((stat, value) => stat + value, 0);
  return Math.round(((sum + 15 * baseStats.length) / sum - 1) * 100) + '%';
};

// returns pokemons current stats
// based on pokemon and player's level
const { pow, floor } = Math;
export const calc = (pokemon, _level) => {
  if (_level < 1 || _level > 40) {
    throw new Error('level must be >= 1 and <= 40');
  }

  const level = _level === 40 ? 79 : _level * 2;
  const { BaseStamina, BaseAttack, BaseDefense } = byName[pokemon.pokemon_id];

  // current cp of pokemon & max cp of pokemon for current trainer level
  const currentCpMultiplier = cpMultiplier(pokemon);
  const pokemonLevel = levelByCp[currentCpMultiplier.toFixed(8)];
  const maxCpMultiplier = cpByLevel[level];

  // current stats of the pokemon
  const attack = (BaseAttack + pokemon.individual_attack);
  const defense = (BaseDefense + pokemon.individual_defense);
  const stamina = (BaseStamina + pokemon.individual_stamina);

  // max CP for this trainer level
  const maxCombatPower = cp(maxCpMultiplier, attack, stamina, defense);
  const currentCombatPower = cp(currentCpMultiplier, attack, stamina, defense);

  // IV relative influence on base stats

  return {
    IVInfluenceAttack: relativeInfluence(BaseAttack),
    IVInfluenceDefense: relativeInfluence(BaseDefense),
    IVInfluenceStamina: relativeInfluence(BaseStamina),
    IVInfluence: relativeInfluence(BaseAttack, BaseDefense, BaseStamina),
    stardustToMax: stardustToLevel[level] - stardustToLevel[pokemonLevel],
    candiesToMax: candyToLevel[level] - candyToLevel[pokemonLevel],
    BaseStamina,
    BaseAttack,
    BaseDefense,
    cp: pokemon.cp,
    level: pokemonLevel,
    attack: attack * currentCpMultiplier,
    defense: defense * currentCpMultiplier,
    stamina: stamina * currentCpMultiplier,
    currentCpMultiplier,
    currentCombatPower,
    maxLevel: level,
    maxAttack: attack * maxCpMultiplier,
    maxDefense: defense * maxCpMultiplier,
    maxStamina: stamina * maxCpMultiplier,
    maxCombatPower,
    maxCpMultiplier,
    powerQuotient: powerQuotient(pokemon)
  };
};

