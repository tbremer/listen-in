function storeKeyInEnv(key, value) {
  process.env[key] = value;
}

module.exports = function(obj) {
  'use strict';

  const defaultOptions = {
    envToken: null,
    message: null,
    insecure: false
  };
  const stdin = process.stdin;
  const options = Object.assign(defaultOptions, obj);
  let str = '';

  stdin.setRawMode(true);
  stdin.setEncoding('utf8');

  options.message ? process.stdout.write(options.message) : void 0;

  return new Promise((resolve, reject) => {
    function listener (key) {
      const keyCode = key.charCodeAt(0);

      if (keyCode === 3) {
        stdin.emit('end');
        reject(new Error('User escaped'));
      }

      if (keyCode === 13) {
        options.envToken ? storeKeyInEnv(options.envToken, str) : void 0;
        stdin.emit('end');
        stdin.setRawMode(false);
        stdin.setEncoding();
        resolve(options.insecure ? str : undefined );
      }

      str += key;
    }

    stdin.on('data', listener);
  });
};

