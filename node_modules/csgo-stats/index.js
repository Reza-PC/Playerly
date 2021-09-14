const request = require('superagent');

//Global vars
const BASE_URI = 'http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=730'
const checkID = id => id.match(/[0-9]/)
class csgoStats {
  constructor(rawD) {
    //Save the raw data into a variable.
    this._rawD = rawD

  }

  static get checkID () {
    return checkID;
  }


  static load (auth) {
    if (!auth.key || !auth.id) return;
    let url = this.url = `${BASE_URI}&key=${auth.key}&steamid=${auth.id}`
    return new Promise(async (resolve, reject) => {
      request
        .get(url)
        .set('Accept', 'application/json')
        .end(async (err, res) => {
          if (err) {  reject(err)  } else {
            resolve({
              meta: {
                sourceUrl: url,
                id: auth.id
              },
              body: res.body,
            })
          }
        })
    })
    .catch(e=> console.error(e))
  }


}
module.exports = csgoStats;
