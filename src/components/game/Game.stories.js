import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Game from './Game';

export const gameMillion = {
  id: 1,
  annuitized: '10', 
  annuitizedScale: 'million',
  oddsJackpot: 25827165,
  ticketPrice: 1,
  weight: .1,
  topPick: false
}

export const gameBillion = {
  id: 1,
  annuitized: '1.2', 
  annuitizedScale: 'billion',
  oddsJackpot: 25827165,
  ticketPrice: 2,
  weight: .1,
  topPick: false
}

export const gameTopPick = {
  id: 1,
  annuitized: '10', 
  annuitizedScale: 'million',
  oddsJackpot: 25827165,
  ticketPrice: 1,
  weight: .1,
  topPick: true
}


export const actions = {
  onPinTask: action('onPinTask'),
  onArchiveTask: action('onArchiveTask'),
};

storiesOf('Game', module)
  .add('gameMillion', ()=> <Game {...gameMillion} {...actions} />)
  .add('gameBillion', ()=> <Game {...gameBillion} {...actions} />)
  .add('gameTopPick', ()=> <Game {...gameTopPick} {...actions} />)
  //.add('stateExample', ()=> <Game game={{...game, state: 'TOP_PICK'}} {...actions} />)
  
