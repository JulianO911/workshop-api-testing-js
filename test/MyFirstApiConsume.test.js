const axios = require('axios');
const { expect } = require('chai');
const { StatusCodes } = require('http-status-codes');

describe('First Api Tests', () => {
  it('Consume GET Service', async () => {
    const response = await axios.get('https://httpbin.org/ip');

    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.data).to.have.property('origin');
  });

  it('Consume GET Service with query parameters', async () => {
    const query = {
      name: 'John',
      age: '31',
      city: 'New York'
    };

    const response = await axios.get('https://httpbin.org/get', { query });

    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.config.query).to.eql(query);
  });

  it('Success test from head request', async () => {
    const response = await axios.head('https://httpbin.org/get');
    expect(response.status).to.equal(200);
  });

  it('Attributes and type test from patch request', async () => {
    const response = await axios.patch('https://httpbin.org/patch', {
      names: ['Julian', 'Jaime', 'Ana']
    });
    expect(JSON.parse(response.data.data)).to.have.property('names');
    expect(JSON.parse(response.data.data).names).to.be.an('array');
  });

  it('Attributes and value test from put request', async () => {
    const response = await axios.put('https://httpbin.org/put', {
      name: 'Julian'
    });
    expect(JSON.parse(response.data.data)).to.have.property('name');
    expect(JSON.parse(response.data.data).name).to.eql('Julian');
  });

  it('Relationship attributes and type test from delete request', async () => {
    const response = await axios.delete('https://httpbin.org/delete', {
      data: {
        relationship: {
          names: ['Julian', 'Ana'],
          status: 'friends'
        }
      }
    });
    expect(response.status).to.equal(200);
    expect(JSON.parse(response.data.data).relationship).to.have.all.keys('names', 'status');
    expect(JSON.parse(response.data.data).relationship.names).to.be.an('array');
    expect(JSON.parse(response.data.data).relationship.status).to.be.an('string');
  });
});
