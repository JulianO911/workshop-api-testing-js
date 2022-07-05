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

describe('Github Api Test 7', () => {
  describe('testing query paramenters', async () => {
    /* test that checks if the response has the default number
    of users (which is 30) */
    it('default users test', async () => {
      const response = await object.get('https://api.github.com/users');
      expect(response.data.length).to.equal(30);
    });
    // test that checks if the response has 10 users
    it('10 users test', async () => {
    /* creates query parameters for the response: since, to the minimum
    id number and per_page to the maximum of users returned */
      const query = {
        since: 0,
        per_page: 10
      };
      // sends the query parameters with the 'params' attribute
      const response = await object.get('https://api.github.com/users', { params: query });
      expect(response.data.length).to.equal(10);
    });
    /* test that checks if the response has 100 users */
    it('100 users test', async () => {
      const query = {
        since: 0,
        per_page: 100
      };
      const response = await object.get('https://api.github.com/users', { params: query });
      expect(response.data.length).to.equal(100);
    });
  });
});
