const expect = require('chai').expect;
const Page = require('../server/config/models/pageModel');

// test data
const body = '↵<div>↵    <h1>Example Domain</h1>↵    <p>This domain is established to be used for illustrative examples in documents. You may use this↵    domain in examples without prior coordination or asking for permission.</p>↵    <p><a href="http://www.iana.org/domains/example">More information...</a></p>↵</div>↵↵↵';
const title = 'Example Domain';
const url = 'http://www.example.com/';
const userId = '136590';
const timeInfo = [1480266663856, 1480266664224, 368];
const data = { userId, url, timeInfo, title, body };
let entryId = '';

// send website to elastic db
describe('Elastic', () => {
  beforeEach((done) => {
    setTimeout(done, 1000);
  });
  it('Should send websites to elastic', (done) => {
    Page.update(url, userId, body, title, timeInfo, (results) => {
      entryId = results._id;
      expect(results.result).to.eql('created');
      done();
    });
  }).timeout(5000);
  it('Should update website information on elastic', (done) => {
    Page.update(url, userId, body, title, timeInfo, (results) => {
      expect(results.result).to.eql(undefined);
      done();
    });
  }).timeout(5000);
  it('Should retrieve website data from elastic', (done) => {
    Page.search('Example', userId, (results) => {
      expect(results.hits.total).to.be.above(0);
      done();
    });
  }).timeout(5000);
  it('Should delete website data from elastic', (done) => {
    Page.delete(userId, entryId, (results) => {
      expect(results.result).to.eql('deleted');
      done();
    });
  }).timeout(5000);
  it('Should not retrieve deleted data', (done) => {
    Page.search('Example', userId, (results) => {
      expect(results.hits.total).to.eql(0);
      done();
    });
  }).timeout(5000);
});
