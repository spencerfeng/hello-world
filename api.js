const request = require('request');
const callAWSapi = (url, res, count) =>{
    if(count === 3){
      res.send({ error: 'Internal System Error' });
      return;
    }
   request(url, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      res.send(JSON.stringify(response.body));
      return;
    }else{
      callAWSapi(url, res, count + 1);
    }
  })
}

module.exports = {callAWSapi};