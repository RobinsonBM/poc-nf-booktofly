const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({
  name: 'mfe-flights',

  exposes: {
    './web-component': './src/bootstrap.ts',
  },

  shared: {
    // ...shareAll({
    //   singleton: false,
    //   strictVersion: true,
    //   requiredVersion: 'auto',
    //   includeSecondaries: false,
    // }),
    // '@angular/common/http': {
    //   singleton: false,
    //   strictVersion: true,
    //   requiredVersion: 'auto',
    // },
    // rxjs: {
    //   singleton: false,
    //   strictVersion: true,
    //   requiredVersion: 'auto',
    // },
    // 'rxjs/operators': {
    //   singleton: false,
    //   strictVersion: true,
    //   requiredVersion: 'auto',
    // },
    // '@angular/core/primitives/signals': {
    //   singleton: false,
    //   strictVersion: true,
    //   requiredVersion: 'auto',
    // },
    // '@angular/core/primitives/di': {
    //   singleton: false,
    //   strictVersion: true,
    //   requiredVersion: 'auto',
    // },
  },

  skip: [
    'zone.js',
    // Add further packages you don't need at runtime
  ],

  // Please read our FAQ about sharing libs:
  // https://shorturl.at/jmzH0

  features: {
    // New feature for more performance and avoiding
    // issues with node libs. Comment this out to
    // get the traditional behavior:
    ignoreUnusedDeps: true,
  },
});
