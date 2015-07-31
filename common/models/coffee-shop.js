module.exports = function(CoffeeShop) {

  CoffeeShop.status = function (cb) {
    var currentDate = new Date(),
      currentHour = currentDate.getHours(),
      OPEN_HOUR = 6,
      CLOSE_HOUR = 20,
      response;
    console.log('Current hour is ' + currentHour);
    if (currentHour > OPEN_HOUR && currentHour < CLOSE_HOUR) {
      response = 'We are open for business';
    } else {
      response = 'Sorry closed now';
    }
    cb(null, response);
  };

  CoffeeShop.remoteMethod('status', {
    http: {path: '/status', verb: 'get'},
    returns: {arg: 'status', type: 'string'}
  });

  CoffeeShop.getName = function (shopId, cb) {
    CoffeeShop.findById(shopId, function (err, instance) {
      var response = "";
      if (instance) response += instance.name;
      cb(null, response);
      console.log(response);
    });
  }

  CoffeeShop.remoteMethod('getName', {
    http: {path: '/getname', verb: 'get'},
    accepts: {arg: 'id', type: 'string', http: { source: 'query' }},
    returns: {arg: 'name', type: 'string'}
  });

};
