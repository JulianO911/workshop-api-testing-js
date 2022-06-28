const { StatusCodes } = require('http-status-codes');
const { expect } = require('chai');
const axios = require('axios');

const urlBase = 'https://api.github.com';
const githubUserName = 'JulianO911';
const repository = 'workshop-api-testing-js';

describe('Github Api Test', () => {
  describe('Authentication', () => {
    it('Via OAuth2 Tokens by Header', async () => {
      const response = await axios.get(`${urlBase}/repos/${githubUserName}/${repository}`, {
        headers: {
          Authorization: `token ${process.env.ACCESS_TOKEN}`
        }
      });
      it('Via OAuth2 Tokens by parameter', async () => {
        const response2 = await axios.get(
          `${urlBase}/repos/${githubUserName}/${repository}`,
          { access_token: process.env.ACCESS_TOKEN }
        );

        expect(response2.status).to.equal(StatusCodes.OK);
        expect(response2.data.description).equal('This is a Workshop about Api Testing in JavaScript');
      });

      expect(response.status).to.equal(StatusCodes.OK);
      expect(response.data.description).equal('This is a Workshop about Api Testing in JavaScript');
    });
  });
});
