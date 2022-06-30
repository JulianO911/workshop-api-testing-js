// Libararies
const { expect } = require('chai');
const chaiSubset = require('chai-subset');
const chai = require('chai');
const md5 = require('md5');
// eslint-disable-next-line no-undef
chai.use(chaiSubset);
const axios = require('axios');

// Github API Authentication
describe('Github Api Test', () => {
  describe('Authentication', () => {
    it('Via OAuth2 Tokens by Header', async () => {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.get('https://api.github.com/users/aperdomob', {
        headers: {
          Authorization: `token ${process.env.ACCESS_TOKEN}`
        }
      });
    });
  });
});
describe('Github Api Test 2', () => {
  describe('testing GET method', () => {
    // Test used for checking the name, company and location of the github user
    it('basic features test', async () => {
      const response = await axios.get('https://api.github.com/users/aperdomob');
      expect(response.data.name).to.eql('Alejandro Perdomo');
      expect(response.data.company).to.eql('Perficient Latam');
      expect(response.data.location).to.eql('Colombia');
    });
    /* Test used for get the jasmine repository, check it full name, description
    and visibility and then donwload it and check if it was downloaded into a zip */
    it('jasmine repo test', async () => {
      const response = await axios.get('https://api.github.com/users/aperdomob');
      // get the response from url repositories
      const responseRepo = await axios.get(response.data.repos_url);
      /* check the data feature that contains the list of repositories,
      parse to an array, and with the find method search the jasmine repository */
      const repository = Array.from(responseRepo.data).find((repo) => repo.name === 'jasmine-json-report');
      expect(repository.full_name).to.eql('aperdomob/jasmine-json-report');
      expect(repository.description).to.eql('A Simple Jasmine JSON Report');
      // download the repository with axios get method
      const downloadRepo = await axios.get(`${repository.svn_url}/archive/${repository.default_branch}.zip`);
      expect(downloadRepo.headers['content-type']).to.eql('application/zip');
      expect(repository.visibility).to.eql('public');
    });
    /* Test used for get the README from the contents' repository and check
     it name, path and sha attributes */
    it('README test', async () => {
      const response = await axios.get('https://api.github.com/users/aperdomob');
      const responseRepo = await axios.get(response.data.repos_url);
      const repository = Array.from(responseRepo.data).find((repo) => repo.name === 'jasmine-json-report');
      /* The contents_url attribute get a url with a list of files in the repository.
       Since i don't need the path part i replaced with empty space */
      const filesURL = repository.contents_url.replace('{+path}', '');
      // Get the response that returns the list of files and search the README one
      const responseFiles = await axios.get(filesURL);
      const readme = Array.from(responseFiles.data).find((file) => file.name === 'README.md');
      expect(readme).to.containSubset({
        name: 'README.md', path: 'README.md', sha: '360eee6c223cee31e2a59632a2bb9e710a52cdc0'
      });
    });
    // Test used for check the MD5 hash number from the README file
    it('MD5 test', async () => {
      const response = await axios.get('https://api.github.com/users/aperdomob');
      const responseRepo = await axios.get(response.data.repos_url);
      const repository = Array.from(responseRepo.data).find((repo) => repo.name === 'jasmine-json-report');
      const filesURL = repository.contents_url.replace('{+path}', '');
      const responseFiles = await axios.get(filesURL);
      const readme = Array.from(responseFiles.data).find((file) => file.name === 'README.md');
      /* The README download URL contains information about the content file. With the
      md5 dependency can extract his MD5 hash number */
      const downloadReadme = await axios.get(readme.download_url);
      const fileContent = downloadReadme.data;
      expect(md5(fileContent)).to.eql('497eb689648cbbda472b16baaee45731');
    });
  });
});
