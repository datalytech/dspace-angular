// Karma configuration file, see link for more information
// https://karma-runner.github.io/6.4/config/configuration-file.html

const { join } = require('path');
const setBaseKarmaConfig = require('../../karma.conf');

module.exports = function (config) {
  setBaseKarmaConfig(config);

  config.set({
    coverageReporter: {
      dir: join(__dirname, '../../coverage/libs/shared'),
    },
  });
};
