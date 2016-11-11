'use strict';

var rp = require('request-promise');
var ES = require('./config.js');

var URL = 'http://1b4f84fecd657bad91626e9aa8f74e59.us-west-1.aws.found.io:9200/test/test/AVhQ8_qA6vD3_5aG54Q7';

module.exports = function () {
  var options = {
    method: 'POST',
    uri: URL,
    auth: {
      user: ES.user,
      pass: ES.password
    },
    // body: {
    //   title,
    //   text,
    // },
    json: true
  };

  rp(options).then(function (body) {
    console.log(body);
  });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZlci9jb25maWcvcG9zdERhdGEuanMiXSwibmFtZXMiOlsicnAiLCJyZXF1aXJlIiwiRVMiLCJVUkwiLCJtb2R1bGUiLCJleHBvcnRzIiwib3B0aW9ucyIsIm1ldGhvZCIsInVyaSIsImF1dGgiLCJ1c2VyIiwicGFzcyIsInBhc3N3b3JkIiwianNvbiIsInRoZW4iLCJib2R5IiwiY29uc29sZSIsImxvZyJdLCJtYXBwaW5ncyI6Ijs7QUFDQSxJQUFNQSxLQUFLQyxRQUFRLGlCQUFSLENBQVg7QUFDQSxJQUFNQyxLQUFLRCxRQUFRLGFBQVIsQ0FBWDs7QUFFQSxJQUFNRSxNQUFNLG9HQUFaOztBQUVBQyxPQUFPQyxPQUFQLEdBQWlCLFlBQU07QUFDckIsTUFBTUMsVUFBVTtBQUNkQyxZQUFRLE1BRE07QUFFZEMsU0FBS0wsR0FGUztBQUdkTSxVQUFNO0FBQ0pDLFlBQU1SLEdBQUdRLElBREw7QUFFSkMsWUFBTVQsR0FBR1U7QUFGTCxLQUhRO0FBT2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQUMsVUFBTTtBQVhRLEdBQWhCOztBQWNBYixLQUFHTSxPQUFILEVBQ0dRLElBREgsQ0FDUSxVQUFDQyxJQUFELEVBQVU7QUFDZEMsWUFBUUMsR0FBUixDQUFZRixJQUFaO0FBQ0QsR0FISDtBQUlELENBbkJEIiwiZmlsZSI6InBvc3REYXRhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5jb25zdCBycCA9IHJlcXVpcmUoJ3JlcXVlc3QtcHJvbWlzZScpO1xuY29uc3QgRVMgPSByZXF1aXJlKCcuL2NvbmZpZy5qcycpO1xuXG5jb25zdCBVUkwgPSAnaHR0cDovLzFiNGY4NGZlY2Q2NTdiYWQ5MTYyNmU5YWE4Zjc0ZTU5LnVzLXdlc3QtMS5hd3MuZm91bmQuaW86OTIwMC90ZXN0L3Rlc3QvQVZoUThfcUE2dkQzXzVhRzU0UTcnO1xuXG5tb2R1bGUuZXhwb3J0cyA9ICgpID0+IHtcbiAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICB1cmk6IFVSTCxcbiAgICBhdXRoOiB7XG4gICAgICB1c2VyOiBFUy51c2VyLFxuICAgICAgcGFzczogRVMucGFzc3dvcmQsXG4gICAgfSxcbiAgICAvLyBib2R5OiB7XG4gICAgLy8gICB0aXRsZSxcbiAgICAvLyAgIHRleHQsXG4gICAgLy8gfSxcbiAgICBqc29uOiB0cnVlLFxuICB9O1xuXG4gIHJwKG9wdGlvbnMpXG4gICAgLnRoZW4oKGJvZHkpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGJvZHkpO1xuICAgIH0pO1xufTtcbiJdfQ==