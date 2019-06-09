import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Games from './Games';

export const games = [{
  id: 1,
  annuitized: '10', 
  annuitizedScale: 'million',
  oddsJackpot: 25827165,
  ticketPrice: 1,
  weight: .1,
  topPick: false
},{
  id: 2,
  annuitized: '1.2', 
  annuitizedScale: 'billion',
  oddsJackpot: 125827165,
  ticketPrice: 2,
  weight: .3,
  topPick: true
},{
  id: 3,
  annuitized: '10', 
  annuitizedScale: 'million',
  oddsJackpot: 25827165,
  ticketPrice: 3,
  weight: .05,
  topPick: false
}];

export const actions = {
  onRefresh: action('onRefresh'),
};

storiesOf('Games', module)
  .add('default', ()=> <Games games={games} {...actions} />)
  // .add('topPick', ()=> <Game game={{...game, state: 'TOP_PICK'}} {...actions} />)
  
