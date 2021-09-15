const request = require('supertest');
const app = require('../server/server');

describe("Server", () => {

    describe('Login', () => {
        it('get access', (done) => {
            request(app)
              .post('/login')
              .send({email: 'edgar@rios.navarro', password: '123456'})
              .expect(200)
              .expect('Content-Type', 'application/json; charset=utf-8')
              .end((error) => (error) ? done.fail(error) : done());
          });
    });

    describe('REST API v1', () => {
        it('reject for non authorizated', (done) => {
          request(app)
            .get('/usuario')
            .expect(401)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .end((error) => (error) ? done.fail(error) : done());
        });
      });

});