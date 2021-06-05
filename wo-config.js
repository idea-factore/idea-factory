const ip = require('ip').address();

module.exports = {
    resources: [`http://${ip}:3000`],
    verbose: true
}