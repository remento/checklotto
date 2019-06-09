/**
 * FetchData
 * Loads lottery RSS data via a JSONP proxy
 * Example URL: https://api.rss2json.com/v1/api.json?callback=fetchDataCB.cb0&rss_url=http://www.txlottery.org/export/sites/lottery/rss/tlc_latest.xml
 */

import config from '../config.json';

const namespace = 'fetchDataCB';
const info = ()=>{}; //console.info;
const warn = ()=>{}; //console.warn;

class FetchData {

  constructor() {
    this.state = null; // null, loading, loaded, error
    this.cbCount = -1;
    if (!window[namespace]){
      window[namespace] = {};
    }
    this.callbacks = window[namespace];
    this.lastPromise = null;
  }

  // Returns existing data via promise, requests data if needed
  getData(urlOverride) {
    return this.lastPromise || this.refresh(urlOverride);
  }

  refresh(urlOverride = null) {
    this.cbCount++;
    const 
      cbFnName = 'cb' + this.cbCount,
      cbName = namespace + '.' + cbFnName,
      scriptUrl = urlOverride || `${config.jsonpServiceURL}?callback=${cbName}&rss_url=${config.lottoRSS}`;
    return this.lastPromise = new Promise((resolve,reject)=>{
      // Add a callback to global scope that can triggered by JSONP response
      this.callbacks[cbFnName] = ({status, items}) => {
        if (status === 'ok' && items.length){
          info('FetchData success:', items);
          resolve(items);
        }else {
          warn('FetchData failed:', status);
          reject({status});
        }
      };
      this.injectScript(scriptUrl);
    })
    .then(this.cleanItems);
  }

  injectScript(url){
    if (url === 'NO_CALL'){
      return;
    }
    const scriptEl = document.createElement('script');
    scriptEl.src = url;
    document.body.appendChild(scriptEl);
  }

  cleanItems(items){
    const games = items.reduce((accumulator, item) => {
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
    return games.sort((a,b) => {
      return b.weight - a.weight;
    });
  }
}

const singleInstance = new FetchData();

export default singleInstance;