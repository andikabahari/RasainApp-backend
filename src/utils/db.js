const Firestore = require("@google-cloud/firestore");

const db = new Firestore({
  projectId: process.env.GCP_PROJECT_ID,
  keyFilename: process.env.GCP_SERVICE_ACCOUNT_KEY,
});

module.exports = db;
