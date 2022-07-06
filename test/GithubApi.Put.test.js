// Libraries
const { expect } = require('chai');
const axios = require('axios');

/* Instance from the axios class that has headers attribute
 to do the authentication */
const object = axios.create({
  headers: {
    Authorization: `token ${process.env.ACCESS_TOKEN}`
  }
});

describe('Github Api Test 3', () => {
  describe('testing PUT method', () => {
    /* Test used for following aperdomo user with the axios put method
     and check with the status if the response works correctly and if his body
     is empty */
    it('PUT method', async () => {
      const response = await object.put('https://api.github.com/user/following/aperdomob');
      expect(response.status).to.equal(204);
      expect(response.data).to.equal('');
    });
    /* Test used to verify in the list of people that i follow if
    aperdomob is in */
    it('Follower test', async () => {
      const response = await object.get('https://api.github.com/user/following');
      expect(response.data.find((user) => user.login === 'aperdomob')).to.not.eql(undefined);
    });
  });
  describe('Testing idempotence', () => {
    /* Test used for following aperdomo user with the axios put method
     and check with the status if the response works correctly and if his body
     is empty */
    it('PUT method', async () => {
      const response = await object.put('https://api.github.com/user/following/aperdomob');
      expect(response.status).to.equal(204);
      expect(response.data).to.equal('');
    });
    /* Test used to verify in the list of people that i follow if
    aperdomob is in */
    it('Follower test', async () => {
      const response = await object.get('https://api.github.com/user/following');
      expect(response.data.find((user) => user.login === 'aperdomob')).to.not.eql(undefined);
    });
  });
});
