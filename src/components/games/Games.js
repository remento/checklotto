import React from 'react';
import styles from './Games.module.css';
import Game from '../game/Game';

class Games extends React.Component {
  
  constructor (props) {
    super(props);
    this.props = props;
  }

  render() {
    const games = this.props.games;
    //{styles.games}
    return (
      <div className = {styles.Games}>
        {games.map(g=>{
          return <Game {...g}/>;
        })}
      </div>
    );
  }
}

export default Games;