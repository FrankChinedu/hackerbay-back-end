const auth = require('./auth');
const patch = require('./patch');
const thumbnail = require('./thumbnail');

module.exports = app => {
    app.use('/api/v1/', auth);
    app.use('/api/v1/', patch);
    app.use('/api/v1/', thumbnail);
};
