/* eslint-env node */
module.exports = {
  description: '',
  normalizeEntityName(){},
  // locals(options) {
  //   // Return custom template variables here.
  //   return {
  //     foo: options.entity.options.foo
  //   };
  // }

  afterInstall(options) {
    if (!options.dryRun && options.torii && isPackageMissing(this, 'torii')) {
      return this.addPackagesToProject({
        packages: [
          { name: 'ember-simple-auth', target: "^1.7.0" },
          { name: 'torii', target: "^0.10.1"}
        ]
      })
    }
  }
};
