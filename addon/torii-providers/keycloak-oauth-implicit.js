// import Oauth2 from 'torii/providers/oauth2-code';
import Oauth2 from 'torii/providers/oauth2-bearer';
import { configurable } from 'torii/configuration';

/**
 * This class implements authentication against Linked In
 * using the OAuth2 authorization flow in a popup window.
 *
 * @class LinkedInOauth2
 */
var LinkedInOauth2 = Oauth2.extend({
  name:       'keycloak-oauth-implicit',
  apiKey: '',
  responseType: 'id_token token',

  realmName: configurable('realmName','master'),
  baseUrl: configurable('baseUrl'),

  // responseParams: [ 'state','code'],
  responseParams: [ 'token', 'access_token','token_type'],

  requiredUrlParams: [ 'clientId', 'grantType', 'nonce' ],
nonce:'123123',
  scope: configurable('scope','openid'),

  clientId: configurable('clientId',''),
  // grantType: configurable('grantType','authorization_code'),
  grantType: configurable('grantType','authorization_token'),



  redirectUri: configurable('redirectUri', function(){
    // A hack that allows redirectUri to be configurable
    // but default to the superclass
    return this._super();
  }),


  fetch(authData){
    return authData
  },

  // close(data){
  //   console.log('close', data)
  // },


  open(options) {
    console.log(options)
    var name        = this.get('name'),
        url         = this.buildUrl(),
        redirectUri = this.get('redirectUri'),
        responseParams = this.get('responseParams'),
        responseType = this.get('responseType'),
        state = this.get('state'),
        shouldCheckState = responseParams.indexOf('state') !== -1;

        console.log(responseParams)

    return this.get('popup').open(url, responseParams, options).then(function(authData){
      var missingResponseParams = [];

      responseParams.forEach(function(param){
        if (authData[param] === undefined) {
          missingResponseParams.push(param);
        }
      });

      if (missingResponseParams.length){
        throw new Error("The response from the provider is missing " +
              "these required response params: " + missingResponseParams.join(', '));
      }
console.log('provider provider ', name, options)
      return {
        authData,
        provider: name,
        redirectUri: redirectUri
      };
    });
  }

});

export default LinkedInOauth2;