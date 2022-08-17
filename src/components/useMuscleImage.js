export default muscle => {
  let paths = []

  paths['abs'] = require('../assets/muscles/abs.png');
  paths['back'] = require('../assets/muscles/back.png');
  paths['biceps'] = require('../assets/muscles/biceps.png');
  paths['chest'] = require('../assets/muscles/chest.png');
  paths['gluteos'] = require('../assets/muscles/gluteos.png');
  paths['legs'] = require('../assets/muscles/legs.png');
  paths['shoulders'] = require('../assets/muscles/shoulders.png');
  paths['triceps'] = require('../assets/muscles/triceps.png');

  return paths[muscle];
}
