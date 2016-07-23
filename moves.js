const changeCase = require('change-case');
const movesList = require('./moves.json');

module.exports = {};

(module => {
  let byId = {};
  let byName = {};

  movesList.forEach(move => {
    let normName = changeCase.constantCase(move.name);
    byId[move.id] = {
      type: move.type,
      name: normName,
      prettyName: move.name,
    };

    byName[normName] = {
      id: move.id,
      type: move.type,
      prettyName: move.name,
    };
  });

  module.byId = byId;
  module.byName = byName;
})(module.exports);
