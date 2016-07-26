'use strict';

exports.__esModule = true;
exports.byNumber = exports.byName = undefined;

var _data = require('../data.json');

var _data2 = _interopRequireDefault(_data);

var _changeCase = require('change-case');

var _changeCase2 = _interopRequireDefault(_changeCase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var byName = exports.byName = {};
var byNumber = exports.byNumber = {};

var convertToNumber = ['PkMn', 'EvolvesFrom', 'EvolvesTo', 'EvoChainID', 'EvoStage', 'BaseAttack', 'BaseDefense', 'BaseStamina', 'BaseCaptureRate', 'BaseFleeRate', 'CollisionRadiusM', 'CollisionHeightM', 'CollisionHeadRadiusM', 'AttackTimerS', 'PokemonClass', 'PokedexHeightM', 'PokedexWeightKg', 'CandyToEvolve'];

var nullable = ['EvolvesFrom', 'EvolvesTo'];

_data2.default.forEach(function (pokemon) {
  var normName = _changeCase2.default.constantCase(pokemon.Identifier);
  var shouldBeNumbers = ['PkMn', 'EvolvesFrom', 'EvolvesTo', 'EvoChainID', 'EvoStage'];

  // make sure we have numbers stored
  convertToNumber.forEach(function (field) {
    pokemon[field] = parseFloat(pokemon[field]);
  });

  nullable.forEach(function (field) {
    if (!pokemon[field]) pokemon[field] = null;
  });

  // both number / string
  byNumber[pokemon.PkMn] = pokemon;
  byNumber[+pokemon.PkMn] = pokemon;
  byName[normName] = pokemon;
});