export const powerQuotient = (pokemon) => {
  const atk = pokemon.individual_attack || 0;
  const def = pokemon.individual_defense || 0;
  const sta = pokemon.individual_stamina || 0;
  return (atk + def + sta) / 45;
};
