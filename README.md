# Node Pokemongo data

Provides useful utility functions to calculate pokemon's data. Granted sample input of:

```js
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
  individual_defense: 15,
  individual_stamina: 15,
  cp_multiplier: 0.2557200491428375,
  pokeball: 'ITEM_POKE_BALL',
  captured_cell_id: 'redactedcellid',
  creation_time_ms: '1469202648753'
};
```

You can perform the following operations:

### stats.calc(pokemon, currentProfileLevel)

```js
const PokemonData = require('pokemongo-data');
const stats = PokemonData.stats.calc(SamplePokemon, 40);
```

Stats would contain the following response:

```js
{
  stardustToMax: 268400,
  candiesToMax: 298,
  BaseStamina: 60,
  BaseAttack: 122,
  BaseDefense: 100,
  cp: 77,
  level: 7,
  attack: 35.03364673256874,
  defense: 29.407805651426315,
  stamina: 19.179003685712814,
  currentCpMultiplier: 0.2557200491428375,
  currentCombatPower: 83,
  maxLevel: 79,
  maxAttack: 108.27110137000001,
  maxDefense: 90.88450115,
  maxStamina: 59.272500750000006,
  maxCombatPower: 794,
  maxCpMultiplier: 0.79030001,
  powerQuotient: 100
}
```

### Roadmap

- [x] readme > stats.calc()
- [ ] readme > stats.cpByLevel
- [ ] readme > stats.levelByCp
- [ ] readme > stats.candyToLevel
- [ ] readme > stats.stardustToLevel
- [ ] readme > moves.byId
- [ ] readme > moves.byName
- [ ] readme > data.byName
- [ ] readme > data.byNumber
