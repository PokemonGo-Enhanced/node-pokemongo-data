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
  // how much extra attack IA would give
  IVInfluenceAttack: '12%',
  // how much extra defense ID would give
  IVInfluenceDefense: '15%',
  // how much extra stamina IS would give
  IVInfluenceStamina: '25%',
  // how much IVs would contribute to total stats
  IVInfluence: '16%',
  // how much stardust is needed to levelup this pokemon to `maxLevel` thats specified below
  stardustToMax: 268400,
  // how much candies is needed to levelup this pokemon to `maxLevel` thats specified below
  candiesToMax: 298,
  // base values of this pokemon, same for every similar pokemon
  BaseStamina: 60,
  BaseAttack: 122,
  BaseDefense: 100,
  // current cp
  cp: 77,
  // current pokemon level
  level: 7,
  // current stats based on level, IVs & base values
  attack: 35.03364673256874,
  defense: 29.407805651426315,
  stamina: 19.179003685712814,
  currentCpMultiplier: 0.2557200491428375,
  // theoretical max current combat power
  currentCombatPower: 83,
  maxLevel: 79,
  // theoretical max stats of this pokemon based on max level, IVs & base values
  maxAttack: 108.27110137000001,
  maxDefense: 90.88450115,
  maxStamina: 59.272500750000006,
  // theoretical max combat power
  maxCombatPower: 794,
  maxCpMultiplier: 0.79030001,
  // how good are IVs
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
