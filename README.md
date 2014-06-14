# Logend - backend, frontend, logend

## What is this?

Facebook and Google OAuth service. You redirect your browser to `/auth/facebook` or `/auth/google`, service will
try to log you in (find you) in your API and will redirect you back to your client with user token and user id you
want to have in client to access REST API.

## Assumptions

You have your backend authentication at `API_PATH` + `/login` path and need or want only
`email`, `name` and provider. This can be easily changed in `auth_providers/login_to_api.js` file.

## Setup and running

```bash
export HOST="http://auth.domain.net"         # default: http://localhost:4000
export REDIRECT_URL="http://localhost:4200"  # you want to be redirected back to your client app

export API_HOST="http://localhost:3000"
export API_PATH="/api/v1"
export API_SECRET="<API_SECRET>"

export FACEBOOK_APP_ID="<FACEBOOK_APP_ID>"
export FACEBOOK_APP_SECRET="<FACEBOOK_APP_SECRET>"

export GOOGLE_APP_ID="<GOOGLE_APP_ID>"
export GOOGLE_APP_SECRET="<GOOGLE_APP_SECRET>"

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

## Good OAuth2 resource

[OAuth 2 Simplified](http://aaronparecki.com/articles/2012/07/29/1/oauth2-simplified)