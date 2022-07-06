const { expect } = require('chai');
const axios = require('axios');

/* Instances from the axios class that has headers attribute
 to do the authentication */
const object = axios.create({
  headers: {
    Authorization: `token ${process.env.ACCESS_TOKEN}`
  }
});

describe('Github Api Test 4', () => {
  describe('testing POST and PATCH method', async () => {
    // Gets repository list and checks if has at least one public repository
    it('User test', async () => {
      const user = await object.get('https://api.github.com/user');
      const repos = await object.get(user.data.repos_url);
      expect(repos.data.find((repo) => repo.private === false)).to.not.equal(undefined);
    });
    // Gets repository list and selects the first one and checks if it is public
    it('Repo test', async () => {
      const user = await object.get('https://api.github.com/user');
      const repos = await object.get(user.data.repos_url);
      const repo = repos.data[0];
      expect(repo.private).to.equal(false);
    });
    /* Gets repository, selects the first one and creates a new issue using POST method
    with the title 'My issue'. Checks if the title is correct and the body is empty */
    it('Issue test', async () => {
      const user = await object.get('https://api.github.com/user');
      const repos = await object.get(user.data.repos_url);
      const repo = repos.data[0];
      const issue = await object.post(`https://api.github.com/repos/${user.data.login}/${repo.name}/issues`, { title: 'My issue' });
      expect(issue.data.title).to.equal('My issue');
      expect(issue.data.body).to.equal(null);
    });
    /* Modifies the issue that has created in order to add a body.
    Checks if the title is the same and the body is correct */
    it('PATCH issue test', async () => {
      const user = await object.get('https://api.github.com/user');
      const repos = await object.get(user.data.repos_url);
      const repo = repos.data[0];
      const issue = await object.get(`https://api.github.com/repos/${user.data.login}/${repo.name}/issues`);
      // Finds the issue that has the title 'My issue' and gets the number.
      const issueNumber = issue.data.find((iss) => iss.title === 'My issue').number;
      const patch = await object.patch(`https://api.github.com/repos/${user.data.login}/${repo.name}/issues/${issueNumber}`, { body: 'My issue body' });
      expect(patch.data.title).to.equal('My issue');
      expect(patch.data.body).to.equal('My issue body');
    });
  });
});
