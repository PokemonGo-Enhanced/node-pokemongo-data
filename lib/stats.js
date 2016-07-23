'use strict';

exports.__esModule = true;
exports.calc = exports.cp = exports.cpMultiplier = exports.powerQuotient = exports.stardustToLevel = exports.candyToLevel = exports.levelByCp = exports.cpByLevel = undefined;

var _leveling = require('../leveling.json');

var _leveling2 = _interopRequireDefault(_leveling);

var _data = require('./data');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Correct spreadsheet
// https://docs.google.com/spreadsheets/d/1xZ1daunztOgvOZxO7ABfJPF41-2mqMDzY1Qs_0OWwq8/edit#gid=320772897
// determine cp multiplier by level, each 0.5 levels we get:
var cpByLevel = exports.cpByLevel = {};
var levelByCp = exports.levelByCp = {};
var candyToLevel = exports.candyToLevel = {};
var stardustToLevel = exports.stardustToLevel = {};

// parse that
_leveling2.default.forEach(function (level) {
  var normalizedLevel = parseInt(level['Pokemon level'], 10);
  var cp = parseFloat(level.TotalCpMultiplier);

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
var powerQuotient = exports.powerQuotient = function powerQuotient(pokemon) {
  var atk = pokemon.individual_attack || 0;
  var def = pokemon.individual_defense || 0;
  var sta = pokemon.individual_stamina || 0;
  return Math.round((atk + def + sta) / 45 * 100);
};

// current cp, based on when pokemon was caught + how many power ups happened
var cpMultiplier = exports.cpMultiplier = function cpMultiplier(pokemon) {
  return pokemon.cp_multiplier + (pokemon.additional_cp_multiplier || 0);
};

// calculate CP
var cp = exports.cp = function cp(multiplier, attack, stamina, defense) {
  return floor(attack * pow(defense, 0.5) * pow(stamina, 0.5) * pow(multiplier, 2) / 10);
};

// returns pokemons current stats
// based on pokemon and player's level
var pow = Math.pow;
var floor = Math.floor;
var calc = exports.calc = function calc(pokemon, _level) {
  if (_level < 1 || _level > 40) {
    throw new Error('level must be >= 1 and <= 40');
  }

  var level = _level === 40 ? 79 : _level * 2;
  var _byName$pokemon$pokem = _data.byName[pokemon.pokemon_id];
  var BaseStamina = _byName$pokemon$pokem.BaseStamina;
  var BaseAttack = _byName$pokemon$pokem.BaseAttack;
  var BaseDefense = _byName$pokemon$pokem.BaseDefense;

  // current cp of pokemon & max cp of pokemon for current trainer level

  var currentCpMultiplier = cpMultiplier(pokemon);
  var pokemonLevel = levelByCp[currentCpMultiplier.toFixed(8)];
  var maxCpMultiplier = cpByLevel[level];

  // current stats of the pokemon
  var attack = BaseAttack + pokemon.individual_attack;
  var defense = BaseDefense + pokemon.individual_defense;
  var stamina = BaseStamina + pokemon.individual_stamina;

  // max CP for this trainer level
  var maxCombatPower = cp(maxCpMultiplier, attack, stamina, defense);
  var currentCombatPower = cp(currentCpMultiplier, attack, stamina, defense);

  // Determine how much grind is needed
  // 'Stardust to this level' cur vs max
  // 'Candies to this level'

  return {
    stardustToMax: stardustToLevel[level] - stardustToLevel[pokemonLevel],
    candiesToMax: candyToLevel[level] - candyToLevel[pokemonLevel],
    BaseStamina: BaseStamina,
    BaseAttack: BaseAttack,
    BaseDefense: BaseDefense,
    cp: pokemon.cp,
    level: pokemonLevel,
    attack: attack * currentCpMultiplier,
    defense: defense * currentCpMultiplier,
    stamina: stamina * currentCpMultiplier,
    currentCpMultiplier: currentCpMultiplier,
    currentCombatPower: currentCombatPower,
    maxLevel: level,
    maxAttack: attack * maxCpMultiplier,
    maxDefense: defense * maxCpMultiplier,
    maxStamina: stamina * maxCpMultiplier,
    maxCombatPower: maxCombatPower,
    maxCpMultiplier: maxCpMultiplier,
    powerQuotient: powerQuotient(pokemon)
  };
};