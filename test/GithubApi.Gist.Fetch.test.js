const { expect } = require('chai');
require('isomorphic-fetch');
const chaiSubset = require('chai-subset');
const chai = require('chai');

chai.use(chaiSubset);
/* Instances from the axios class that has headers attribute
 to do the authentication */
const url = 'https://api.github.com/gists';
const body = {
  description: 'this is a example about promises',
  public: true,
  files: {
    'README.md': {
      content: 'this is a example about promises'
    }
  }
};
describe('Github Api Test with isomorphic fetch', () => {
  describe('testing DELETE method', () => {
    /* test that creates a new gist with post method and checks the
    response status code, the description, the visibility and the files */
    it('Creating gist test', async () => {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `token ${process.env.ACCESS_TOKEN}`
        },
        body: JSON.stringify(body)
      });
      const data = await response.json();
      expect(response.status).to.equal(201);
      expect(data).to.containSubset(body);
    });
    // test that access to the gist and verifies if the gist inf fact was created
    it('Gist existence test', async () => {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `token ${process.env.ACCESS_TOKEN}`
        }
      });
      const data = await response.json();
      expect(
        data.find(
          (actualGist) => actualGist.description === 'this is a example about promises'
        )
      ).to.not.equal(undefined);
    });
    /* test that deletes the gist with the delete method and checks the
    response status code and if in fact the gist doesn't exist */
    it('Deleting gist test', async () => {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `token ${process.env.ACCESS_TOKEN}`
        }
      });
      const data = await response.json();
      const gistId = data.find((gist) => gist.description === 'this is a example about promises').id;
      const responseDelete = await fetch(`${url}/${gistId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `token ${process.env.ACCESS_TOKEN}`
        }
      });
      expect(responseDelete.status).to.equal(204);
      const newResponse = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `token ${process.env.ACCESS_TOKEN}`
        }
      });
      const newData = await newResponse.json();
      expect(
        newData.find(
          (actualGist) => actualGist.description === 'this is a example about promises'
        )
      ).to.equal(undefined);
    });
  });
});
