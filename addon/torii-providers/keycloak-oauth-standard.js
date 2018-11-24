import Oauth2 from 'torii/providers/oauth2-code';
import { configurable } from 'torii/configuration';

/**
 * This class implements authentication against Linked In
 * using the OAuth2 authorization flow in a popup window.
 *
 * @class LinkedInOauth2
 */
var LinkedInOauth2 = Oauth2.extend({
  name:       'keycloak-oauth',
  apiKey: '',

  realmName: configurable('realmName','master'),
  baseUrl: configurable('baseUrl'),

  responseParams: [ 'state','code'],

  requiredUrlParams: [ 'clientId', 'grantType'],
  scope: configurable('scope','openid'),

  clientId: configurable('clientId',''),
   grantType: configurable('grantType','authorization_code'),




  redirectUri: configurable('redirectUri', function(){
    // A hack that allows redirectUri to be configurable
    // but default to the superclass
    return this._super();
  }),


  open(options) {
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

      // if (shouldCheckState && authData.state !== state) {
      //   throw new Error('The response from the provider has an incorrect ' +
      //                   'session state param: should be "' + state + '", ' +
      //                   'but is "' + authData.state + '"');
      // }
console.log(authData)
      return {
        authorizationCode: decodeURIComponent(authData[responseType]),
        provider: name,
        redirectUri: redirectUri
      };
    });
  }

});

export default LinkedInOauth2;