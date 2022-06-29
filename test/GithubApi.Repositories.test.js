const { expect } = require('chai');
const chaiSubset = require('chai-subset');
const chai = require('chai');
const md5File = require('md5-file');
// eslint-disable-next-line no-undef
chai.use(chaiSubset);
const axios = require('axios');
/* License: MIT
*/

const fs = require('fs');
const https = require('https');

// eslint-disable-next-line no-unused-vars
function download(url, dest, cb) {
  const file = fs.createWriteStream(dest);
  // eslint-disable-next-line no-unused-vars
  const request = https.get(url, (response) => {
    response.pipe(file);
    file.on('finish', () => {
      file.close(cb); // close() is async, call cb after close completes.
    });
  }).on('error', (err) => { // Handle errors
    fs.unlink(dest); // Delete the file async. (But we don't check the result)
    if (cb) cb(err.message);
  });
}

describe('Github Api Test 2', () => {
  describe('testing GET method', () => {
    it('basic features test', async () => {
      const response = await axios.get('https://api.github.com/users/aperdomob');
      expect(response.data.name).to.eql('Alejandro Perdomo');
      expect(response.data.company).to.eql('Perficient Latam');
      expect(response.data.location).to.eql('Colombia');
    });
    it('jasmine repo test', async () => {
      const response = await axios.get('https://api.github.com/users/aperdomob');
      const responseRepo = await axios.get(response.data.repos_url);
      const repository = Array.from(responseRepo.data).find((repo) => repo.name === 'jasmine-json-report');
      expect(repository.full_name).to.eql('aperdomob/jasmine-json-report');
      expect(repository.description).to.eql('A Simple Jasmine JSON Report');
      /* expect(repository.visibility).to.eql('private');
       const dest = './jasmine-json-report.zip';
      download(repository.downloads_url, dest, () => {
      }); */
    });
    it('README test', async () => {
      const response = await axios.get('https://api.github.com/users/aperdomob');
      const responseRepo = await axios.get(response.data.repos_url);
      const repository = Array.from(responseRepo.data).find((repo) => repo.name === 'jasmine-json-report');
      const filesURL = repository.contents_url.replace('{+path}', '');
      const responseFiles = await axios.get(filesURL);
      const readme = Array.from(responseFiles.data).find((file) => file.name === 'README.md');
      expect(readme).to.containSubset({
        name: 'README.md', path: 'README.md', sha: '360eee6c223cee31e2a59632a2bb9e710a52cdc0'
      });
    });
    it('MD5 test', async () => {
      const response = await axios.get('https://api.github.com/users/aperdomob');
      const responseRepo = await axios.get(response.data.repos_url);
      const repository = Array.from(responseRepo.data).find((repo) => repo.name === 'jasmine-json-report');
      const filesURL = repository.contents_url.replace('{+path}', '');
      const responseFiles = await axios.get(filesURL);
      const readme = Array.from(responseFiles.data).find((file) => file.name === 'README.md');
      const dest = './README.md';
      download(readme.download_url, dest, () => {
      });
      const hash = md5File.sync('./README.md');
      expect(hash).to.eql('497eb689648cbbda472b16baaee45731');
    });
  });
});
