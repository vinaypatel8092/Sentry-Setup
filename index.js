require("dotenv").config();
const sentry = require("@sentry/node");
const { nodeProfilingIntegration } = require("@sentry/profiling-node");

sentry.init({
    dsn: process.env.DSN,
    integrations: [
        nodeProfilingIntegration()
    ],
    tracesSampleRate: 1.0,
    profilesSampleRate: 1.0,
});

// const transaction = sentry.startSpan({
//     op:"test",
//     name:"First transact",
// })
// function testErrors(){
//     try {
//         testFunction();
//     } catch (error) {
//         sentry.captureException(error);
//     } finally{
//         transaction.finish();
//     }
// }

// testErrors();

sentry.startSpan({
    op: "test",
    name: "My First Test Span",
  }, () => {
    try {
      foo();
    } catch (e) {
      sentry.captureException(e);
    }
  });