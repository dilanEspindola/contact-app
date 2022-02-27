const { format } = require('timeago.js');

const helpers = {};

helpers.timeago = timeageo => {
    return format(timeageo);
};

module.exports = helpers;