import changeCase from 'change-case';
import movesList from '../moves.json';

export const byId = {};
export const byName = {};

movesList.forEach(move => {
  const normName = changeCase.constantCase(move.name);
  const newMove = {
    id: move.id,
    type: move.type,
    name: normName,
    prettyName: move.name
  };

  byId[move.id] = newMove;
  byName[normName] = newMove;
});
