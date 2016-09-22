/* eslint-disable */
const spawn = require('child_process').spawn;

// function storeKeyInEnv(key, value) {
//   process.env[key] = value;
// }
//
// module.exports = function(obj) {
//   'use strict';
//
//   const defaultOptions = {
//     envToken: null,
//     message: null,
//     insecure: false
//   };
//

  /*return*/ new Promise((resolve, reject) => {
    const options = { insecure: null, message: 'Hello Tom', envToken: null }; //sent from user
    const _options = { options: JSON.stringify(options) };
    const env = Object.assign({}, process.env, _options);
    const child = spawn(
      'node',
      ['./lib/process.js'],
      {
        env,
        stdio: [0, 'pipe', 'pipe']
      }
    );

    child.stdout.on('data', d => console.log('stdout:', d.toString()));
    child.stderr.on('data', d => console.log('stderr:', d.toString()));
    child.on('exit', code => {
      console.log('exit:', code);
      if (code) reject(new Error('User prompted exit'));

      resolve('hi');
    });
  })
  .then((d) => {
    console.log('then:', d);
  })
  .catch(console.error);

  // const stdin = process.stdin;
  // const options = Object.assign(defaultOptions, obj);
  // let str = '';
  //
  // stdin.setRawMode(true);
  // stdin.setEncoding('utf8');
  //
  // options.message ? process.stdout.write(options.message) : void 0;
  //
  // return new Promise((resolve, reject) => {
  //   function listener (key) {
  //     const keyCode = key.charCodeAt(0);
  //
  //     if (keyCode === 3) {
  //       stdin.emit('end');
  //       reject(new Error('User escaped'));
  //     }
  //
  //     if (keyCode === 13) {
  //       options.envToken ? storeKeyInEnv(options.envToken, str) : void 0;
  //       stdin.emit('end');
  //       stdin.setRawMode(false);
  //       stdin.setEncoding();
  //       resolve(options.insecure ? str : undefined );
  //     }
  //
  //     str += key;
  //   }
  //
  //   stdin.on('data', listener);
  // });
// };
