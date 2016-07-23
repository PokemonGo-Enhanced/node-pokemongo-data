const assert = require('assert');

describe('test formulas', () => {
  const PokemonData = require('../src');

  const SamplePokemon = {
    id: 'redactedid',
    pokemon_id: 'HORSEA',
    cp: 77,
    stamina: 19,
    stamina_max: 19,
    move_1: 'BUBBLE_FAST',
    move_2: 'DRAGON_PULSE',
    height_m: 0.4252958297729492,
    weight_kg: 8.927674293518066,
    individual_attack: 15,
    individual_defense: 1,
    individual_stamina: 15,
    cp_multiplier: 0.2557200491428375,
    pokeball: 'ITEM_POKE_BALL',
    captured_cell_id: 'redactedcellid',
    creation_time_ms: '1469202648753'
  };

  it('returns data by pokemon id', () => {
    assert.equal(PokemonData.data.byName.BULBASAUR.Identifier, 'Bulbasaur');
  });

  it('returns data by pokemon number', () => {
    assert.equal(PokemonData.data.byNumber[1].Identifier, 'Bulbasaur');
    assert.equal(PokemonData.data.byNumber['1'].Identifier, 'Bulbasaur');
  });

  it('returns move by id', () => {
    assert.equal(PokemonData.moves.byId[13].name, 'WRAP');
    assert.equal(PokemonData.moves.byId[13].type, 'Normal');
  });

  it('returns move by name', () => {
    assert.equal(PokemonData.moves.byName['DARK_PULSE'].type, 'Dark');
  });

  it('returns pokemon stats', () => {
    const stats = PokemonData.stats.calc(SamplePokemon, 10);
    const maxStats = PokemonData.stats.calc(SamplePokemon, 40);

    console.log(PokemonData.stats.cpByLevel);
    console.log(PokemonData.stats.levelByCp);

    console.log(stats);
    console.log(maxStats);
  });
});
