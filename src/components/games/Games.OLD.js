
// props.gameData is a promise which provides: 
// [{
//   gameName: item.gameName,
//   title: item.title,
//   description: item.description,
//   about: item.about,
//   link: item.link,
//   ticketPrice: item.ticketPrice,
//   ticketQty: item.ticketQty,
//   forDate: match.groups.forDate,
//   oddsJackpot: item.oddsJackpot,
//   pubDate: item.pubDate
// },...]


import React from 'react';
import styles from './Games.module.css';
class Games extends React.Component {
  // props.gameData: Promise(data)
  constructor(props) {
    super(props);
    this.state = {games:[]};
    props.gameData.then(games => {
      this.setState({games: games});
    });
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div>
        <h1>Check Lotto!</h1>


        <div className={styles.container}>
          <div className={styles.item}>item 1</div>
          <div className={styles.item}>item 2</div>
          <div className={styles.item}>item 3</div>
          <div className={styles.item}>item 4</div>
          <div className={styles.item}>item 5</div>
        </div>



        <div style={{textAlign:'left'}}>
          <ul>
            {this.state.games.map((g) =>
              <li key={g.name} >
                <h2>{g.name}</h2>
                <ul style={{textAlign:'left'}}>
                  <li>Prize ${g.annuitized} {g.annuitizedScale}</li>
                  <li>Odds: 1 in {g.oddsJackpot}</li>
                  <li>Price: ${g.ticketPrice}</li>
                  <li>Smart Pick Confidence: <strong>{Math.round(g.weight * 100)}%</strong></li>

                  {/* 
                  <li>{g.weightDesc}</li>
                  <li>{g.annuitizedScale}</li>
                  <li>{g.cashValue}</li>
                  <li>{g.cashScale}</li>
                  <li>{g.title}</li>
                  <li>{g.description}</li>
                  <li>{g.about}</li>
                  <li>{g.link}</li>
                  <li>{g.ticketPrice}</li>
                  <li>{g.ticketQty}</li>
                  <li>{g.forDate}</li>
                  <li>{g.oddsJackpot}</li>
                  <li>{g.pubDate}</li> */}
                
                </ul>
              </li>
            )}
          </ul>
        </div>
        
      </div>
    );
  }

}

export default Games;