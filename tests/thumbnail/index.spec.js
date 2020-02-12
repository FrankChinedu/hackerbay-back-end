const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../server');
const {getToken} = require('../../util');
const mock = require('mock-require')
const sinon = require('sinon')

const { expect } = chai;

chai.use(chaiHttp);
let token;

describe('Thumbnail', () => {
    before(()=> {
        const user = {
            username: 'angelo'
        }
        token = getToken(user);
    });
    it('should throw appropraite validation error in image_url field is not passee', async () => {
        const data = {

        }
        const res = await chai.request(app).post('/api/v1/thumbnail').set({
            'x-access-token': token
        }).send(data);
        expect(res.status).to.eq(400);
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.have.all.keys(['message', 'validation', 'field'])
    })
    it('should call the ', async () => {
        // const requestPromise = sinon.spy();
        // mock('request-promise', requestPromise);
        // const imgThumbnail = sinon.spy();
        // mock('image-thumbnail', imgThumbnail);
        // const fs = sinon.spy();
        // mock('fs', fs);
        const data = {
            image_url: `https://images.unsplash.com/photo-1457264635001-828d0cbd483e
            ?ixlib=rb-1.2.1&dpr=2&auto=format&fit=crop&w=416&h=312&q=60`
        }
        const res = await chai.request(app).post('/api/v1/thumbnail').set({
            'x-access-token': token
        }).send(data);

        console.log('---', res.body)
        // expect(requestPromise).to.have.been.calledOnce;
        // expect(imgThumbnail).to.have.been.calledOnce;
        // mock.stopAll()
    })
});