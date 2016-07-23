class Stats {
  powerQuotient(pokemon) {
    let atk = pokemon.individual_attack || 0;
    let def = pokemon.individual_defense || 0;
    let sta = pokemon.individual_stamina || 0;
    return (atk + def + sta) / 45;
  }
}


module.exports = new Stats();
