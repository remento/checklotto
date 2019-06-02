// sample callback:
//checkLotto.jsonpResponseHandler({status:'ok',items:[{"title":"Powerball Estimated Jackpot for 06/05/2019","pubDate":"2019-06-02 05:29:27","link":"https://www.txlottery.org/export/sites/lottery/Games/Powerball/","guid":"https://www.txlottery.org/export/sites/lottery/Games/Powerball/","author":"","thumbnail":"","description":"Annuitized: $40 Million Cash Value: $25.9 Million","content":"Annuitized: $40 Million Cash Value: $25.9 Million","enclosure":{},"categories":[]}]})

import config from './config.json';
//const jsonpURL = config.jsonpURL_DEV; // vs jsonpURL_PROD
const jsonpURL = config.jsonpURL_PROD;
const fetchPromise = new Promise((resolve, reject) => {
  // Init global namespace as needed
  window.checkLotto = window.checkLotto || {};
  let checkLotto = window.checkLotto;

  // Setup global handler/callback for jsonp
  // see fetchLottoData.mockResponse.js for sample response
  checkLotto.jsonpResponseHandler = (payload) => {
    if (payload.status === 'ok' && payload.items && payload.items.length) {
      resolve(payload.items);
    } else {
      reject(payload);
    }
  };

  // Inject script tag
  const scriptEl = document.createElement('script');
  scriptEl.src = jsonpURL;
  document.body.appendChild(scriptEl);
});

// Transform the response
const dataPromise = fetchPromise.then(items => {
  // Using reduce as a combination of filter & map
  // Note: mega millions matches two games to one item
  const transformedData = items.reduce((accumulator, item) => {
    config.games.forEach(game => {
      const match = item.title.match(new RegExp(game.rxItem));
      // match is null if regex does not match
      if (match && match.groups) {
        const {groups} = item.description.match(game.rxJackpot), // {annuitized: "1.2", annuitizedScale: "Billion", cashValue: "25.9", cashScale: "Million"}
          {annuitized, annuitizedScale} = groups,
          amt = annuitized * (annuitizedScale==='Billion'?1000000000:1000000);
        accumulator.push({
          name: game.name,
          ...groups, //annuitized, annuitizedScale, cashValue, cashScale
          title: item.title,
          description: item.description,
          about: game.about,
          link: item.link,
          ticketPrice: game.ticketPrice,
          ticketQty: game.ticketQty,
          forDate: match.groups.forDate,
          oddsJackpot: game.oddsJackpot,
          pubDate: item.pubDate,
          weight: (1/game.oddsJackpot) * amt * (1/game.ticketPrice) * game.ticketQty,
          weightDesc: '(1/oddsJackpot) * amt * (1/ticketPrice) * ticketQty',
          amt
        });
      }
    });
    return accumulator;
  }, []);
  return transformedData.sort((a,b) =>{
    return b.weight - a.weight;
  });
});

export default dataPromise;