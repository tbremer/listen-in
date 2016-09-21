'use strict';

const expect = require('expect');
const stdin = require('mock-stdin').stdin();
const lstn = require('../');

function enter() {
  return String.fromCharCode(13);
}

function ctrlC() {
  return '\u0003';
}

stdin.setRawMode = function() {};

describe('lstn', () => {
  it('should throw error if ctrl+c pressed', done => {
    const expected = new Error('User Escaped');

    setTimeout(() => {
      stdin.send(ctrlC());
    });
    lstn()
      .catch(err => {
        expect(err).toEqual(expected);
        done();
      });
  });

  it('should not modify process.env when no envToken is set', done => {
    const expected = JSON.stringify(process.env);

    setTimeout(() => {
      stdin.send('foo');
      stdin.send(enter());
    });

    lstn()
      .then(d => {
        expect(d).toBe(undefined);
        expect(JSON.stringify(process.env)).toEqual(expected);
        done();
      });
  });

  it('should return entered string if insecure is passed', done => {
    const expected = 'foo';

    setTimeout(() => {
      stdin.send('foo');
      stdin.send(enter());
    });

    lstn({insecure: true})
      .then(assert => {
        expect(assert).toEqual(expected);
        done();
      });
  });

  it('should display a message if passed', done => {
    const foo = process.stdout.write;
    const spy = expect.createSpy();

    process.stdout.write = spy;

    setTimeout(() => {
      stdin.send('bar');
      stdin.send(enter());
    });


    lstn({message: 'foo'})
      .then(() => {
        process.stdout.write = foo;
      })
      .then(() => {
        expect(spy.calls.length).toEqual(1);
        expect(spy.calls[0].arguments[0]).toEqual('foo');
        done();
      });
  });

  it('should modify process.env if envToken passed', done => {
    setTimeout(() => {
      stdin.send('bar');
      stdin.send(enter());
    });

    lstn({envToken: 'foo'})
      .then(assert => {
        expect('foo' in process.env).toBe(true);
        expect(process.env.foo).toEqual('bar');
        expect(assert).toBe(undefined);
        done();
      });
  });
});
