const Sentry = require("@sentry/node");

const errorHandler = (err, req, res, next) => {
    Sentry.captureException(err);
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
}

module.exports = errorHandler;