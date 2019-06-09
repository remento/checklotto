import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import App from './App';

export const appLoading = {games:[], status:'loading', urlOverride:'NO_CALL'};
export const appLoadError = {games:[], status:'loadError', urlOverride:'NO_CALL'};
export const appReady = {games:[], status:'ready', urlOverride:'NO_CALL'};
//export const lifeCycle = {urlOverride:'fetchLottoData.mockResponse.js'};


export const actions = {
  onRefresh: action('onRefresh')
};

storiesOf('App', module)
//  .add('lifeCycle', ()=> <App {...lifeCycle} {...actions} />)
  .add('appLoading', ()=> <App {...appLoading} {...actions} />)
  .add('appLoadError', ()=> <App {...appLoadError} {...actions} />)
  .add('appReady', ()=> <App {...appReady} {...actions} />);
  
  
