const ip = require('ip').address();

module.exports = {
    verbose: true,
    resources: [ `http://${ip}`],
    timeout: 40000
}