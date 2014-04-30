# Proxio

## What the hell is this?

Node proxy server with Facebook and Google OAuth.

Server will proxy all calls to `API_HOST` + `API_PATH` specified.

I made it so I can build backend however I want to.

## Why name it so predictable/stupid?

Trying to spend my imagination on more important things in life.

## Assumptions

You have your backend authentication at `API_PATH` + `/login` path and need or want only
`email`, `name` and provider. This can be easily changed in `auth_providers/login_to_api.js` file.

## Setup and running

```bash
export API_HOST="http://localhost:3000"
export API_PATH="/api/v1"
export API_SECRET="<API_SECRET>"

export FACEBOOK_APP_ID="<FACEBOOK_APP_ID>"
export FACEBOOK_APP_SECRET="<FACEBOOK_APP_SECRET>"

export GOOGLE_APP_ID="<GOOGLE_APP_ID>"
export GOOGLE_APP_SECRET="<GOOGLE_APP_SECRET>"

export SESSION_SECRET="cookie-secret"

node app
```

### Node debugging

```sh
npm install -g node-inspector
```

One terminal

```sh
node --debug app
```

Another terminal

```sh
node-inspector
```