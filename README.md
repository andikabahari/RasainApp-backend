# RasainApp-backend

RasainApp-backend is a part of RasainApp project for Bangkit 2022 Capstone Project.

| Repository                                                             | Description          |
| ---------------------------------------------------------------------- | -------------------- |
| [RasainApp](https://github.com/ChristanFarel/RasainApp)                | Android application. |
| [RasainApp-backend](https://github.com/andikabahari/RasainApp-backend) | Backend service.     |
| [RasainApp-ml](https://github.com/agistarakha/RasainApp-ml)            | Machine learning.    |

## Requirements

- Node.js v16
- Yarn v3.2.1
- Cloud Firestore
- GCP Service Account

The service account's roles must include `Firebase Admin SDK Administrator Service Agent`.

Resources you may need:

- https://nodejs.org/en/
- https://yarnpkg.com/getting-started/install
- https://cloud.google.com/firestore
- https://cloud.google.com/iam/docs/service-accounts

## Pre-Installation

Allow `read` and `write` actions in the Cloud Firestore **Security Rules**.

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

## Installation

1. Clone this repository, run `git clone https://github.com/andikabahari/RasainApp-backend.git .`

2. Create your own `.env` by copying the content of `.env.example`

```
APP_PORT=8080
SALT_ROUNDS=10
TOKEN_SECRET=my_token_secret
GCP_PROJECT_ID=my_gcp_project_id
GCP_SERVICE_ACCOUNT_KEY="./service_account.json"
TENSORFLOW_SAVED_MODEL="./bin/SavedModel/model.json"
```

3. Copy your service account key inside `service_account.json`, the content will likely look like this

```
{
  "type": "service_account",
  "project_id": your_project_id",
  "private_key_id": "your_private_key_id",
  "private_key": "your_private_key",
  "client_email": "your_client_email",
  "client_id": "your_client_id",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "your_client_cert_url"
}
```

4. Install dependencies, run `yarn install`.

### Running the Application

- For production, run `yarn start`
- For development, run `yarn dev`.

### Running the Test

- To perform test once, run `yarn test`
- To perform test with watch mode, run `yarn test:watch`.

### Production-Only Dependencies

To install production-only dependencies, run `yarn workspaces focus --production`.

## API Endpoints

### POST /v1/auth/login

Parameters:

- `email` string \*required
- `password` string \*required

### POST /v1/auth/register

Parameters:

- `fullName` string \*required
- `email` string \*required
- `password` string \*required

### GET /v1/users/{id}

Parameters:

- `id` path \*required

### PUT /v1/users/{id}

Headers:

- `Authorization: Bearer your_token`

Parameters:

- `id` path \*required
- `fullName` string
- `email` string
- `password` string

### POST /v1/predictions

Headers:

- `Authorization: Bearer your_token`

Parameters:

- `image` file (multipart/form-data) \*required
