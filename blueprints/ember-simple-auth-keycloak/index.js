/* eslint-env node */
module.exports = {
  description: '',

  // locals(options) {
  //   // Return custom template variables here.
  //   return {
  //     foo: options.entity.options.foo
  //   };
  // }

  afterInstall(options) {
    return this.addAddonsToProject({
      packages: [
        { name: 'ember-simple-auth', target: "^1.7.0" },
        { name: 'torii', target: "^0.10.1"}
      ]
    })
  }
};
