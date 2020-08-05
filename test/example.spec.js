const { createSandbox } = require('sinon');
const supertest = require('supertest');
const spawn = require('child_process').spawn;

const cmd = (arr, cwd = '/app') => {
  // console.log('exec => ', arr.join(' '));

  const c0 = arr.shift();
  return new Promise((resolve, reject) => {
    const ssp = spawn(c0, arr, { stdio: 'inherit', cwd });
    ssp.on('close', (code) => {
      resolve(code);
    });

    ssp.on('error', function (err) {
      reject(err);
    });
  });
};

const sleep = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  })
};

describe('*** running test ***', () => {

  let sandbox;
  let assert;

  let server;
  let ss;

  before((done) => {

    // start server
    Promise.all([
      cmd([`${__dirname}/script.sh`, 'revert', '/test/example/main/notindex.js']),
      cmd([`${__dirname}/script.sh`, 'revert', '/test/example/project/index.js'])
    ]).then(() => {
      server = require('./example/index');
      ss = supertest('http://localhost:9000');
      done();
    })

  });

  after((done) => {
    server.close(() => done());
  });

  beforeEach(() => {
    sandbox = createSandbox();
    assert = sandbox.assert;
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('test main api', (done) => {

    ss.get('/').expect(200)
      .expect((res) => assert.match(res.text, 'Hello World Not called index.js 1'))
      .then(() => cmd([`${__dirname}/script.sh`, 'change', '/test/example/main/notindex.js']))
      .then(() => sleep(200))
      .then(() => ss.get('/').expect(200).expect((res) => assert.match(res.text, 'Hello World Not called index.js 2')))
      .then(() => cmd([`${__dirname}/script.sh`, 'revert', '/test/example/main/notindex.js']))
      .then(() => sleep(200))
      .then(() => ss.get('/').expect(200).expect((res) => assert.match(res.text, 'Hello World Not called index.js 1')))
      .then(() => done());

  });

  it('test project api', (done) => {

    ss.get('/project').expect(200)
      .expect((res) => assert.match(res.text, 'Hello World reloader 1'))
      .then(() => cmd([`${__dirname}/script.sh`, 'change', '/test/example/project/index.js']))
      .then(() => sleep(200))
      .then(() => ss.get('/project').expect(200).expect((res) => assert.match(res.text, 'Hello World reloader 2')))
      .then(() => cmd([`${__dirname}/script.sh`, 'revert', '/test/example/project/index.js']))
      .then(() => sleep(200))
      .then(() => ss.get('/project').expect(200).expect((res) => assert.match(res.text, 'Hello World reloader 1')))
      .then(() => done());

  });


});
