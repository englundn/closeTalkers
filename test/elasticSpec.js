// send website to elastic db

const expect = require('chai').expect;
const Page = require('../server/config/models/pageModel');

// Test data

const body = '↵<div>↵    <h1>Example Domain</h1>↵    <p>This domain is established to be used for illustrative examples in documents. You may use this↵    domain in examples without prior coordination or asking for permission.</p>↵    <p><a href="http://www.iana.org/domains/example">More information...</a></p>↵</div>↵↵↵';
const title = 'Example Domain';
const url = 'http://www.example.com/';
const userId = '1111';
const timeInfo = [1480266663856, 1480266664224, 368];
const data = { userId, url, timeInfo, title, body };

describe('Sending websites to elastic', () => {
  it('Should send websites to elastic', (done) => {
    const request = new XMLHttpRequest();
    request.open('POST', 'https://dejavu.ninja/api/chrome', true);
    // request.open('POST', 'http://localhost:3000/api/chrome', true);
    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    request.onreadystatechange = () => {
      if (request.readyState === XMLHttpRequest.DONE) {
        expect(request.status).to.eql(200);
        done();
      }
    };
    request.send(JSON.stringify(data));
  });
  it('Should retrieve website data', (done) => {
    Page.search('Example', '1111', (results) => {
      console.log(results);
      done();
    });
  });
});

// delete website from db


// describe('Spotify Request', () => {
//   it('Should create a new playlist', (done) => {
//     spotifyRequest.makeNewPlaylist(userId, accessToken, playlistName, isPlaylistPublic, (error, results) => {
//       expect(error).to.eql(null);
//       expect(results.type).to.eql('playlist');
//       playlistId = results.id;
//       done();
//     });
//   });
