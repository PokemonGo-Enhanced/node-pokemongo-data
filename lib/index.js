'use strict';

exports.__esModule = true;
exports.data = exports.moves = exports.stats = undefined;

var _stats2 = require('./stats');

var _stats = _interopRequireWildcard(_stats2);

var _moves2 = require('./moves');

var _moves = _interopRequireWildcard(_moves2);

var _data2 = require('./data');

var _data = _interopRequireWildcard(_data2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.stats = _stats;
exports.moves = _moves;
exports.data = _data;