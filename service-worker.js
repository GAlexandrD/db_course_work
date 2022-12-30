/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "03-01.jpg",
    "revision": "61ccd31b9a99e4dc0b2115d7a181dc71"
  },
  {
    "url": "03-02.jpg",
    "revision": "0e42c83dcc174ebfdbb611ab0956fcd9"
  },
  {
    "url": "03-03.jpg",
    "revision": "dd23072447e0798b536bd162235d14c3"
  },
  {
    "url": "03-04.jpg",
    "revision": "661a64ee2776ef94b23ba82f7ee50969"
  },
  {
    "url": "03-05.jpg",
    "revision": "6f52dcb2ccb40af28a65a4b796eb918d"
  },
  {
    "url": "03-06.jpg",
    "revision": "2643698d9412e41a449c1edee719fb29"
  },
  {
    "url": "03-07.jpg",
    "revision": "c4a788f41d803f8b9bddb5adc0513be6"
  },
  {
    "url": "03-08.jpg",
    "revision": "4c810503ec4bc1adfd29904056fc2886"
  },
  {
    "url": "03-09.jpg",
    "revision": "9c798bc91f80f84b6b0e7f7fba26d65b"
  },
  {
    "url": "03-10.jpg",
    "revision": "bb5b18b65591e9d058edbc14b02c6ba5"
  },
  {
    "url": "03-11.jpg",
    "revision": "6a88d8f48c63e79c72ec45ae84a8d9ff"
  },
  {
    "url": "04-01.jpg",
    "revision": "4bbafd5dd4000461cef55f669139b17b"
  },
  {
    "url": "05-01.jpg",
    "revision": "8d54b111a4b6b5fb4cd39e4c7261b927"
  },
  {
    "url": "06-01.jpg",
    "revision": "cf2dab320c48c5ead6fe105863629e4e"
  },
  {
    "url": "06-02.jpg",
    "revision": "aa286f8fd6540b7a7b6d36392a63f505"
  },
  {
    "url": "06-03.jpg",
    "revision": "239fa5fb2a9063f1e261ae2db81fceef"
  },
  {
    "url": "06-04.jpg",
    "revision": "a2dbf924afd6a8580ce4a2d2bcd6e049"
  },
  {
    "url": "06-05.jpg",
    "revision": "22f4f542b283cdc3d027eb664424d3c8"
  },
  {
    "url": "06-06.jpg",
    "revision": "12017ddd5b9179e8f53e93044acee998"
  },
  {
    "url": "06-07.jpg",
    "revision": "1ded65fc56da9f0008ae4ef2eacc8175"
  },
  {
    "url": "1.jpg",
    "revision": "f1ea37a492254cc85dd6fd1e89b1a6b4"
  },
  {
    "url": "1.png",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "12-01.jpg",
    "revision": "cc85570b3c89f73291af87791115986a"
  },
  {
    "url": "12-02.jpg",
    "revision": "f2b24c5c4beb21d5302c64b59445927a"
  },
  {
    "url": "12-03.jpg",
    "revision": "61fe98dff39d0887978deb0af605571b"
  },
  {
    "url": "12-04.jpg",
    "revision": "ff2468e7fbb03e034be0ffd7312dc7d9"
  },
  {
    "url": "12-05.jpg",
    "revision": "a126fe17514d81279c677666fd459d9d"
  },
  {
    "url": "12-06.jpg",
    "revision": "c25686b2f77ac7c5a2d4706f43e40132"
  },
  {
    "url": "12-07.jpg",
    "revision": "de17f3eb1df503250bcf1a5a4b533eec"
  },
  {
    "url": "12-08.jpg",
    "revision": "f3b58c768c18919a6fa2ab59ea6627db"
  },
  {
    "url": "13-01.jpg",
    "revision": "b22f06060909d43d796a8ffd4b0743a0"
  },
  {
    "url": "13-02.jpg",
    "revision": "2d2bca0518716a8dfaf37ef5c15e54ee"
  },
  {
    "url": "13-03.jpg",
    "revision": "fec1a3db903dc05c462fb6f384a400d6"
  },
  {
    "url": "2.jpg",
    "revision": "572bc2e4ef3efb7c81bbbcac5f09147b"
  },
  {
    "url": "3.jpg",
    "revision": "248757985bb49f73624c6923057530ac"
  },
  {
    "url": "4.jpg",
    "revision": "407c52446e2e463c4f8e494d52dbe485"
  },
  {
    "url": "404.html",
    "revision": "4ad5957151d980ed732238af27e6bf4c"
  },
  {
    "url": "5.jpg",
    "revision": "7e861769b640afa00fcc0ac4b72d9c52"
  },
  {
    "url": "assets/css/0.styles.107f6bfd.css",
    "revision": "7d2cf3a5ca1e5ba2e15d96f997dc8379"
  },
  {
    "url": "assets/img/after-delete.20f68166.png",
    "revision": "20f681660780bdf013c57157a8e354dc"
  },
  {
    "url": "assets/img/before-delete.67423b28.png",
    "revision": "67423b28ee903cfc7211c8beea4ddbdb"
  },
  {
    "url": "assets/img/console.310a52c0.png",
    "revision": "310a52c0139b7ee2b4d48e384217c529"
  },
  {
    "url": "assets/img/create.bec0d089.png",
    "revision": "bec0d089af4b626728141859c65f3c36"
  },
  {
    "url": "assets/img/delete.4159542b.png",
    "revision": "4159542bfbb2563f334fc329c3b6f323"
  },
  {
    "url": "assets/img/getAll.19da2578.png",
    "revision": "19da257804495b81aa1b2aadff28b291"
  },
  {
    "url": "assets/img/getOne.964e80b0.png",
    "revision": "964e80b058cf2f248c7c2aab6c4513be"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/img/update.01f21f04.png",
    "revision": "01f21f044a3413402f3c2ed5de7243ac"
  },
  {
    "url": "assets/js/10.c2d6dd61.js",
    "revision": "8f4057e904de8901a9080ca2e7942b29"
  },
  {
    "url": "assets/js/11.3c19866e.js",
    "revision": "2236bfcbc49677c60c3b0fda1eda054b"
  },
  {
    "url": "assets/js/12.c1d64cde.js",
    "revision": "423728ab885fd31ebf6d69834ae9cd1c"
  },
  {
    "url": "assets/js/13.edd53f9c.js",
    "revision": "317c45e52c1af722c7971beac61b07af"
  },
  {
    "url": "assets/js/14.812ff0f3.js",
    "revision": "f8c3fe33666c366e5af7b79856ca3012"
  },
  {
    "url": "assets/js/15.9bd3d2e8.js",
    "revision": "a4097b1ba09be922e5a75e5da99e9f8f"
  },
  {
    "url": "assets/js/16.d2ff2c7e.js",
    "revision": "f357c667884fd0afb08ca11e977ad68e"
  },
  {
    "url": "assets/js/17.a60341d8.js",
    "revision": "c08f79bea96edf70d48d870b9b395b7c"
  },
  {
    "url": "assets/js/18.5a25b29d.js",
    "revision": "9db47733e664720e9fcd47edbbb2cfb9"
  },
  {
    "url": "assets/js/19.e5f65da6.js",
    "revision": "d06ed23273a3822bc41f83a7f192b35e"
  },
  {
    "url": "assets/js/2.be347b12.js",
    "revision": "63318108ce286da836d2a38584f50182"
  },
  {
    "url": "assets/js/20.03e0853e.js",
    "revision": "9984799b079bf888a374c2ed7ac5a637"
  },
  {
    "url": "assets/js/21.1abe1c30.js",
    "revision": "29d028c9faedf99f6aa36fc054e72f63"
  },
  {
    "url": "assets/js/22.7f609428.js",
    "revision": "5ccf719ed25fa9494f0ac1042c93360f"
  },
  {
    "url": "assets/js/23.1cf13222.js",
    "revision": "3a762c5e5203a095211b355dbddd91d6"
  },
  {
    "url": "assets/js/24.81787249.js",
    "revision": "d152135be9e13037ecb0adc6015af19d"
  },
  {
    "url": "assets/js/26.f5424b81.js",
    "revision": "24923da10b396b1a8796fc5698e01360"
  },
  {
    "url": "assets/js/3.08f49a2e.js",
    "revision": "c630c949d9312eeaf51a36c72b0bb496"
  },
  {
    "url": "assets/js/4.86a4386e.js",
    "revision": "18ce14d312c3d494dc613083f57bbf6e"
  },
  {
    "url": "assets/js/5.53518b16.js",
    "revision": "859d0d25ceb8cd189fa6450460efe1db"
  },
  {
    "url": "assets/js/6.aabb1671.js",
    "revision": "b48d37fa740acf7cad62757ed116aeae"
  },
  {
    "url": "assets/js/7.f113d948.js",
    "revision": "91853f31d936ac14cdc687d508519b57"
  },
  {
    "url": "assets/js/8.7de00471.js",
    "revision": "ec8f43b9878e92b5af70faee022ec4c9"
  },
  {
    "url": "assets/js/9.0fa86d82.js",
    "revision": "ca1ee0f65168061be63e2ceaea08d5f3"
  },
  {
    "url": "assets/js/app.49997985.js",
    "revision": "8d30696d578f89b40ed2bc3106871778"
  },
  {
    "url": "conclusion/index.html",
    "revision": "6b59c5d7cc88efa422a0cb928049c7ec"
  },
  {
    "url": "design/index.html",
    "revision": "3129198964927d4b6267a5de036a0db3"
  },
  {
    "url": "index.html",
    "revision": "88e395428b99db43d0ad70d6ad99707a"
  },
  {
    "url": "intro/index.html",
    "revision": "28ea4217a3c90042ff68d213c94bce93"
  },
  {
    "url": "license.html",
    "revision": "c6ae94487788630ac26fdec72cecb7f2"
  },
  {
    "url": "myAvatar.png",
    "revision": "b76db1e62eb8e7fca02a487eb3eac10c"
  },
  {
    "url": "requirements/index.html",
    "revision": "fbb78d9eac732dce05ce19c79a9e03e9"
  },
  {
    "url": "requirements/stakeholders-needs.html",
    "revision": "12d2b5f38ac483e10f8ce97f549dfaad"
  },
  {
    "url": "requirements/state-of-the-art.html",
    "revision": "2d569ca5f0276faf1048f967f8cba9e3"
  },
  {
    "url": "software/index.html",
    "revision": "131a87f5d0333a102cff30c2889275c4"
  },
  {
    "url": "test/index.html",
    "revision": "4819f15d70236c5383b957de3adea5a2"
  },
  {
    "url": "use cases/index.html",
    "revision": "a68ebf1f2bf820fb09e2f4fd036d581f"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
