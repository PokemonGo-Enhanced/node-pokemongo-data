import changeCase from 'change-case';
import fastMoves from '../fast-moves.json';
import specialMoves from '../special-moves.json';

export const byId = {};
export const byName = {};

const indexMove = move => {
  const charge = parseInt(move.charge || 0, 10);
  const normName = changeCase.constantCase(move.name);
  const newMove = {
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
    byName[`${normName}_FAST`] = newMove;
  }
};

fastMoves.forEach(indexMove);
specialMoves.forEach(indexMove);
