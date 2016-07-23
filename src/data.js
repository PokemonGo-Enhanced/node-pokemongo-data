import pokemonList from '../data.json';
import changeCase from 'change-case';

export const byName = {};
export const byNumber = {};

const convertToNumber = ['BaseAttack', 'BaseDefense', 'BaseStamina'];

pokemonList.forEach(pokemon => {
  const normName = changeCase.constantCase(pokemon.Identifier);

  // make sure we have numbers stored
  convertToNumber.forEach(field => {
    pokemon[field] = parseFloat(pokemon[field]);
  });

  // both number / string
  byNumber[pokemon.PkMn] = pokemon;
  byNumber[+pokemon.PkMn] = pokemon;
  byName[normName] = pokemon;
});
