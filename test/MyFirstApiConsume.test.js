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

      it('Consume HEAD Service', async () => {
    
        const response = await axios.head('https://httpbin.org/get');
        expect(response.status).to.equal(200);
      });

      it('Consume PATCH Service', async () => {
        const query = {
            names: ['Julian','Jaime','Ana'],
          };
        const response = await axios.patch('https://httpbin.org/patch', query);
        expect(response.data['json']).to.have.property('names');
        expect(response.data['json']['names'],'No es de tipo arreglo').to.be.an('array');
      });

      it('Consume PUT Service', async () => {
        const query = {
            name: 'Julian',
          };
        const response = await axios.put('https://httpbin.org/put', query);
        expect(response.data['json']).to.have.property('name');
        expect(response.data['json']['name']).to.eql('Julian');
      });

      it('Consume DELETE Service', async () => {
        const query = {
            relationship: {
                names: ['Julian','Ana'],
                status: 'friends',
            }
            };
    
        const response = await axios.delete('https://httpbin.org/delete',{data: query});
        expect(response.status).to.equal(200);
        expect(response.data['json']).to.have.property('relationship');
        expect(response.data['json']['relationship']).to.have.property('names');
        expect(response.data['json']['relationship']).to.have.property('status');
        expect(response.data['json']['relationship']['names']).to.be.an('array');
        expect(response.data['json']['relationship']['status']).to.be.an('string');
      });
});
