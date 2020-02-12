const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../server');
const {getToken} = require('../../util');

const { expect } = chai;

chai.use(chaiHttp);
let token;

describe('Patch', () => {
    before(()=> {
        const user = {
            username: 'angelo'
        }
        token = getToken(user);
    });
    it('should throw appropriate validation error if expected fields are not sent', async() => {
        const data = {
            "data1": {
                "baz": "qux",
                "foo": "bar"
            },
            "data2": [
                {
                    "op": "replace",
                    "path": "/baz",
                    "value": "boo"
                }
            ]
        }
        const res = await chai.request(app).patch('/api/v1/patch').set({
            'x-access-token': token
        }).send(data);
        expect(res.status).to.eq(400);
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.have.all.keys(['message', 'validation', 'field'])
    })

    it('should throw appropriate validation error if appropraite patch fields are not sent', async() => {
        const data = {
            "json": {
                "baz": "qux",
                "foo": "bar"
            },
            "patch": [
                {
                    "ops": "replace",
                    "path": "/baz",
                    "value": "boo"
                }
            ]
        }
        const res = await chai.request(app).patch('/api/v1/patch').set({
            'x-access-token': token
        }).send(data);
        expect(res.status).to.eq(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.all.keys(['message', 'validation', 'field'])
    })

    it('should return the correct json patch', async() => {
        const data = {
            "json": {
                "baz": "qux",
                "foo": "bar"
            },
            "patch": [
                {
                    "op": "replace",
                    "path": "/baz",
                    "value": "boo"
                },
                {
                    "op": "add",
                    "path": "/hello",
                    "value": [
                        "world"
                    ]
                },
                {
                    "op": "remove",
                    "path": "/foo"
                }
            ]
        };
        const result = {
            "data": {
                "baz": "boo",
                "hello": [
                    "world"
                ]
            }
        };
        const res = await chai.request(app).patch('/api/v1/patch').set({
            'x-access-token': token
        }).send(data);
        expect(res.status).to.eq(200);
        expect(res.body).to.be.an('object');
        expect(res.body).deep.equals(result);
    })
    it('should return the correct json patch 2', async() => {
        const data = {
            "json": {
                "orders": [
                    {
                        "id": 123
                    },
                    {
                        "id": 456
                    },
                    {
                        "id": 789
                    }
                ]
            },
            "patch":
                [
                    {
                        "op": "add",
                        "path": "/total",
                        "value": 20
                    },
                    {
                        "op": "add",
                        "path": "/currency",
                        "value": "USD"
                    }
                ]
        }
        const result = {
            "data": {
                "orders": [
                    {
                        "id": 123
                    },
                    {
                        "id": 456
                    },
                    {
                        "id": 789
                    }
                ],
                "total": 20,
                "currency": "USD"
            }
        }
        const res = await chai.request(app).patch('/api/v1/patch').set({
            'x-access-token': token
        }).send(data);
        expect(res.status).to.eq(200);
        expect(res.body).to.be.an('object');
        expect(res.body).deep.equals(result);
    });
    it('should throw error if invalid patch', async() => {
        const data = {
            "json": {
                "orders": [
                    {
                        "id": 123
                    },
                    {
                        "id": 456
                    },
                    {
                        "id": 789
                    }
                ]
            },
            "patch":
                [
                    {
                        "op": "add",
                        "path": "total",
                        "value": 20
                    },
                    {
                        "op": "add",
                        "path": "/currency",
                        "value": "USD"
                    }
                ]
        }
        const res = await chai.request(app).patch('/api/v1/patch').set({
            'x-access-token': token
        }).send(data);
        expect(res.status).to.eq(500);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.all.keys(['message']);
    });
    it('should throw appropraite validattion error if invalid token is passed', async() => {
        const data = {
        }
        const res = await chai.request(app).patch('/api/v1/patch').set({
            'x-access-token': "invalid-token"
        }).send(data);
        expect(res.status).to.eq(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.all.keys(['message']);
        expect(res.body.message).to.eql('Unauthorized access');
    });
    it('should throw appropraite validattion erro if no token is passed', async() => {
        const data = {
        }
        const res = await chai.request(app).patch('/api/v1/patch').set({
        }).send(data);
        expect(res.status).to.eq(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.all.keys(['message']);
        expect(res.body.message).to.eql('Token not available');
    });
});