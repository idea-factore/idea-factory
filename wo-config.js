const ip = require('ip').address();

module.exports = {
    verbose: true,
    resources: [ `http-get://${ip}`, `http-get://${ip}:3000`],
    timeout: 40000,
    strictSSL: false
}