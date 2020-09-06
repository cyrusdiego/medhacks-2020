const mock = require('./mock');

const I = 631 / 981280; // as of sept 4th in Edmonton AB, Canada
function formula(n, s) {
  return (n * I) / s;
}
