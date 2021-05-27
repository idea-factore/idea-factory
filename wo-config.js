const ip = require('ip').address();

module.exports = {
    resources: [ `http://${ip}`]
}