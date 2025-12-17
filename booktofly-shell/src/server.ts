import { initNodeFederation } from '@softarc/native-federation-node';

(async () => {

  await initNodeFederation({
    remotesOrManifestUrl: '../browser/federation.manifest.json',
    relBundlePath: '../browser/',
  });

  await import('./bootstrap-server');

})();
