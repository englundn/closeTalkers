const expect = require('chai').expect;

describe('Server', () => {
  it('Swole check', (done) => {
    expect(!!'swole').to.be.true;
    done();
  });
});
