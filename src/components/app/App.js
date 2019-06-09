import React from 'react';
import Games from '../games/Games';
import request from '../../util/FetchData';
import styles from './App.module.css';

class App extends React.Component {

  constructor (props) {
    super(props);
    const {status = 'loading', urlOverride = null} = props;
    this.state = {status, games:[]};
    request
      .getData(urlOverride)
      .then(games => {
        this.setState({games, status: 'ready'});
      });
    
  }

  render (){
    const 
      status = this.state.status, 
      gameData = this.state.games;
    return (
      <div className = {styles.App}>
        <h1>Lotto Smart Pick!</h1>
        {status === 'ready' ? '' : status}
        <Games games={gameData} />
      </div>
    );
  }

}

export default App;
