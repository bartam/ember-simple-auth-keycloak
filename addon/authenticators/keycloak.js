
import Base from 'ember-simple-auth/authenticators/base';
import ToriiAuthenticator from 'ember-simple-auth/authenticators/torii';
//Implicit Flow
export default ToriiAuthenticator.extend({
  torii: Ember.inject.service(),

//   restore: function(data) {     
//     var resolveData = data || {};
//     this.provider = resolveData.provider;
//     return new Ember.RSVP.Promise(function(resolve) { resolve(resolveData); });
//   },
  
  authenticate(options) {
    this._assertToriiIsPresent();
    return this.get('torii').open(options.provider, options || {}).then((data) => {
        return Ember.$.ajax({
            url:"http://localhost:8080/auth/realms/Hackathons/protocol/openid-connect/userinfo",
            type:'GET',
            beforeSend: function(xhr){
                xhr.setRequestHeader('Authorization','Bearer ' + data.authData.access_token)
            }
        }).then((user)=>{
            user.provider = options.provider
            user.organization = options.organization
            return user
        })
    });
  },

  invalidate(data){
      return this.get('torii').close(data.provider, data)
  }
});

