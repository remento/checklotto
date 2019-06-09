import React from 'react';
import styles from './Game.module.css';


// State is managed by parent component Games
class Game extends React.Component {
  
  constructor(props){
    super(props);
    this.props = props;
  }

  render() {
    const g = this.props;
    let topPick = null;
    if (g.topPick){
      topPick = <div className={styles.game}> Top Pick</div>;
    }
    return (
      <div className = {styles.Game}>
        {topPick}
        <ul>
          <li>Prize ${g.annuitized} {g.annuitizedScale}</li>
          <li>Odds: 1 in {g.oddsJackpot}</li>
          <li>Price: ${g.ticketPrice}</li>
          <li>Smart Pick Confidence: <strong>{Math.round(g.weight * 100)}%</strong></li>
        </ul>
      </div>
    );

  }
}

export default Game;