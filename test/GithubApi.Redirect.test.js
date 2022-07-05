const { expect } = require('chai');
const axios = require('axios');
const chaiSubset = require('chai-subset');
const chai = require('chai');

chai.use(chaiSubset);
/* Instances from the axios class that has headers attribute
 to do the authentication */
const object = axios.create({
  headers: {
    Authorization: `token ${process.env.ACCESS_TOKEN}`
  }
});

describe('Github Api Test 6', () => {
  describe('testing HEAD method', async () => {
    /* test that gets a response with HEAD method and check if
     the response path is correct */
    it('HEAD redirection test', async () => {
      const response = await object.head('https://github.com/aperdomob/redirect-test');
      expect(response.request.path).to.equal('/aperdomob/new-redirect-test');
    });
    /* test that gets a response with GET method and
    checks if the data (a html code) contains the href label (which means
    a redirection) has the right link */
    it('GET redirection test', async () => {
      const response = await object.get('https://github.com/aperdomob/redirect-test');
      expect(response.data).to.contains('href="https://github.com/aperdomob/new-redirect-test"');
      expect(response.request.path).to.equal('/aperdomob/new-redirect-test');
    }).timeout(10000000);
  });
});
