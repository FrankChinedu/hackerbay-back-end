const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../server');
const { getToken } = require('../../util');
const mock = require('mock-require');
const sinon = require('sinon');

const { expect } = chai;

chai.use(chaiHttp);
let token;

describe('Thumbnail', () => {
    before(() => {
        const user = {
            username: 'angelo'
        };
        token = getToken(user);
    });
    it('should throw appropraite validation error in image_url field is not passee', async () => {
        const data = {};
        const res = await chai
            .request(app)
            .post('/api/v1/thumbnail')
            .set({
                'x-access-token': token
            })
            .send(data);
        expect(res.status).to.eq(400);
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.have.all.keys([
            'message',
            'validation',
            'field'
        ]);
    });
});
