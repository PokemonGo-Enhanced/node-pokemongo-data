import pokemonList from '../data.json';
import changeCase from 'change-case';

export const byName = {};
export const byNumber = {};

const convertToNumber = ['PkMn', 'EvolvesFrom', 'EvolvesTo', 'EvoChainID',
  'EvoStage', 'BaseAttack', 'BaseDefense', 'BaseStamina', 'BaseCaptureRate',
  'BaseFleeRate', 'CollisionRadiusM', 'CollisionHeightM', 'CollisionHeadRadiusM',
  'AttackTimerS', 'PokemonClass', 'PokedexHeightM', 'PokedexWeightKg', 'CandyToEvolve'
];

const nullable = ['EvolvesFrom', 'EvolvesTo']

pokemonList.forEach(pokemon => {
  const normName = changeCase.constantCase(pokemon.Identifier);
  let shouldBeNumbers = [
    'PkMn', 'EvolvesFrom', 'EvolvesTo', 'EvoChainID', 'EvoStage',
  ]

  // make sure we have numbers stored
  convertToNumber.forEach(field => {
    pokemon[field] = parseFloat(pokemon[field]);
  });

  nullable.forEach(field => {
    if (!pokemon[field])
      pokemon[field] = null;
  });

  // both number / string
  byNumber[pokemon.PkMn] = pokemon;
  byNumber[+pokemon.PkMn] = pokemon;
  byName[normName] = pokemon;
});
