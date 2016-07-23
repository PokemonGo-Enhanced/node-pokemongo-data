'use strict';

exports.__esModule = true;
exports.byName = exports.byId = undefined;

var _changeCase = require('change-case');

var _changeCase2 = _interopRequireDefault(_changeCase);

var _moves = require('../moves.json');

var _moves2 = _interopRequireDefault(_moves);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var byId = exports.byId = {};
var byName = exports.byName = {};

_moves2.default.forEach(function (move) {
  var normName = _changeCase2.default.constantCase(move.name);
  var newMove = {
    id: move.id,
    type: move.type,
    name: normName,
    prettyName: move.name
  };

  byId[move.id] = newMove;
  byName[normName] = newMove;
});