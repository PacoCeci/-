import './style/index.less';

import GameController from './modules/GameController';

const gameController = new GameController();

setInterval(() => {
  gameController.direction;
}, 1000);
