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

const body = { description: 'this is a example about promises', public: true, files: { 'README.md': { content: 'this is a example about promises' } } };

describe('Github Api Test 5', () => {
  describe('testing DELETE method', async () => {
    /* test that creates a new gist with post method and checks the
    response status code, the description, the visibility and the files */
    it('Creating gist test', async () => {
      const gist = await object.post('https://api.github.com/gists', body);
      expect(gist.status).to.equal(201);
      expect(gist.data).to.containSubset(body);
    });
    // test that access to the gist and verifies if the gist inf fact was created
    it('Gist existence test', async () => {
      const gist = await object.get('https://api.github.com/gists');
      expect(gist.data.find((actualGist) => actualGist.description === 'this is a example about promises')).to.not.equal(undefined);
    });
    /* test that deletes the gist with the delete method and checks the
    response status code and if in fact the gist doesn't exist */
    it('Deleting gist test', async () => {
      // eslint-disable-next-line no-unused-vars
      const gists = await object.get('https://api.github.com/gists');
      // gets the gist id and uses to delete the gist with URL
      const gistID = gists.data.find((actualGist) => actualGist.description === 'this is a example about promises').id;
      const gistDelete = await object.delete(`https://api.github.com/gists/${gistID}`);
      expect(gistDelete.status).to.equal(204);
      const newGists = await object.get('https://api.github.com/gists');
      expect(newGists.data.find((actualGist) => actualGist.description === 'this is a example about promises')).to.equal(undefined);
    });
  });
});
