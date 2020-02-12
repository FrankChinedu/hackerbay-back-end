const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../server');

const { expect } = chai;

chai.use(chaiHttp);
describe('Authentication', () => {
    it('should return 404 if route does not exist', async () => {
        const res = await chai.request(app).get('/does-not-exist');
        expect(res.status).to.eq(404);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('Not Found');
    });

    it('should successfully login a user', async () => {
        const user = {
            username: 'newuser',
            password: 'secret'
        };
        const res = await chai
            .request(app)
            .post('/api/v1/login')
            .send({ ...user });
        expect(res.status).to.eql(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.all.keys(['token']);
        expect(res.body.token).to.be.a('string');
    });

    it('should throw validation error if the appropraie body is not sent', async () => {
        const user = {};
        const res = await chai
            .request(app)
            .post('/api/v1/login')
            .send({ ...user });
        expect(res.status).to.eql(400);
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.be.an('object');
        expect(res.body[0]).to.have.all.keys([
            'message',
            'validation',
            'field'
        ]);
    });
});
