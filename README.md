ember-simple-auth-keycloak
==============================================================================

Adds keycloak authenticators for ember-simple-auth and torii

Installation
------------------------------------------------------------------------------

```
ember install ember-simple-auth-keycloak
```


Usage
------------------------------------------------------------------------------

1. Add to configuration 
```
//config/environment.js

   torii: {
      sessionServiceName: 'session',
      providers: {
        'keycloak-oauth-implicit':{
          redirectUri: 'http://localhost:4200/torii/redirect.html',
          clientId: 'hackathon',
          realmName: 'Hackathons',
          baseUrl: 'http://localhost:8080/auth/realms/Hackathons/protocol/openid-connect/auth',
        }
      }
    },
```

2. Use as you work torii:
```
//controller.js

this.get('session').authenticate('authenticator:keycloak', {
    provider: 'keycloak-oauth-implicit'
})
```

Contributing
------------------------------------------------------------------------------

### Installation

* `git clone <repository-url>`
* `cd ember-simple-auth-keycloak`
* `npm install`

### Linting

* `npm run lint:js`
* `npm run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
