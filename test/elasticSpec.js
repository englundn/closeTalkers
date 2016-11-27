// send website to elastic db

const chromeController = require('../server/config/controllers/chrome');

// Test data

const body = '↵<div>↵    <h1>Example Domain</h1>↵    <p>This domain is established to be used for illustrative examples in documents. You may use this↵    domain in examples without prior coordination or asking for permission.</p>↵    <p><a href="http://www.iana.org/domains/example">More information...</a></p>↵</div>↵↵↵';
const title = 'Example Domain';
const url = 'http://www.example.com/';
const userId = '1111';
const timeInfo = [1480266663856, 1480266664224, 368];
const data = { userId, url, timeInfo, title, body };

describe('Sending websites to elastic', () => {
  it('Should send websites to elastic', (done) => {

  });
});


// retrieve website from elastic db


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
