(function() {
  'use strict';
  let str = '';
  const stdout = process.stdout;
  const stdin = process.stdin;
  const options = JSON.parse(process.env.options);

  stdin.setEncoding('utf8');
  stdin.setRawMode(true);

  options.message ? stdout.write(options.message) : void 0;


  function listener (key) {
    const keyCode = key.charCodeAt(0);

    if (keyCode === 3) {
      process.exit(1);
      stdin.emit('end');
    }

    if (keyCode === 13) {
      process.exit();
    }

    str += key;
  }

  stdin.on('data', listener);
}) ();
