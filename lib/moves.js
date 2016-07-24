'use strict';

exports.__esModule = true;
exports.byName = exports.byId = undefined;

var _changeCase = require('change-case');

var _changeCase2 = _interopRequireDefault(_changeCase);

var _fastMoves = require('../fast-moves.json');

var _fastMoves2 = _interopRequireDefault(_fastMoves);

var _specialMoves = require('../special-moves.json');

var _specialMoves2 = _interopRequireDefault(_specialMoves);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var byId = exports.byId = {};
var byName = exports.byName = {};

var indexMove = function indexMove(move) {
  var charge = parseInt(move.charge || 0, 10);
  var normName = _changeCase2.default.constantCase(move.name);
  var newMove = {
    id: parseInt(move.id, 10),
    type: move.type,
    name: normName,
    prettyName: move.name,
    power: parseInt(move.power, 10),
    charge: parseInt(move.charge || 0, 10)
  };

  // duplicate for num/str lookup
  byId[move.id] = newMove;
  byId[newMove.id] = newMove;

  // duplicate for easier lookup
  byName[normName] = newMove;
  byName[move.name] = newMove;

  // add _FAST postfix
  if (charge === 0) {
    byName[normName + '_FAST'] = newMove;
  }
};

_fastMoves2.default.forEach(indexMove);
_specialMoves2.default.forEach(indexMove);