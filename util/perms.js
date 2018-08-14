module.exports = {
  isStaff(s, id) {
    var config = require('../storage/config.json');

    for(var i = 0; i < Object.keys(s).length + 1; i++) {
      if(id === config.owner.id) break;
      else if(id === Object.values(s)[i]) break;
      else if(i === (Object.keys(s).length + 1) - 1 && id !== config.owner.id && id !== Object.values(s)[i]) return false;
      else continue;
    }

    return true;
  }
}
