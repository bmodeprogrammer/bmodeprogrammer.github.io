/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/bower_components/font-roboto/roboto.html","196f915c2bb639c50e0748d057754841"],["/bower_components/iron-a11y-keys-behavior/iron-a11y-keys-behavior.html","26309806bc5a08dab92ec43a33bf85ad"],["/bower_components/iron-ajax/iron-ajax.html","5d1209fe045c6db6640fb75307d5e71c"],["/bower_components/iron-ajax/iron-request.html","3d328e708516fdd96605052c2f90f50b"],["/bower_components/iron-autogrow-textarea/iron-autogrow-textarea.html","dccde5934468f998ef56a5b08bde61a1"],["/bower_components/iron-behaviors/iron-button-state.html","69eabb470fcadef4e70ff50a09bedafc"],["/bower_components/iron-behaviors/iron-control-state.html","c206f87dd46f347d33c37004913a24b1"],["/bower_components/iron-checked-element-behavior/iron-checked-element-behavior.html","d3581e9aa7c213ef3b17844848d88efa"],["/bower_components/iron-fit-behavior/iron-fit-behavior.html","4bea9b99fbacdc716a553a74144b40a3"],["/bower_components/iron-flex-layout/iron-flex-layout.html","d209230aa135c45c817b0deacd4fe0cf"],["/bower_components/iron-form-element-behavior/iron-form-element-behavior.html","729d7e9d023843e50ec4d04d66b4376e"],["/bower_components/iron-icon/iron-icon.html","531c4dce3ccc0ca17182d137fb82e2f7"],["/bower_components/iron-icons/iron-icons.html","263c425f0e794d1e2fd636f8039a8586"],["/bower_components/iron-iconset-svg/iron-iconset-svg.html","df2b26b9f276a709bfe9e75d5f46fbfa"],["/bower_components/iron-menu-behavior/iron-menu-behavior.html","30e166064344168de91bea1dd98fea69"],["/bower_components/iron-menu-behavior/iron-menubar-behavior.html","093d2fe3d622a3e483e4e0236d1b35cc"],["/bower_components/iron-meta/iron-meta.html","9a240eda67672e29b82e15898a9619d1"],["/bower_components/iron-overlay-behavior/iron-focusables-helper.html","01922746cf27930c5f436c75cf6db947"],["/bower_components/iron-overlay-behavior/iron-overlay-backdrop.html","909b38fe748e51ff261b95d5a6b8f671"],["/bower_components/iron-overlay-behavior/iron-overlay-behavior.html","2936c3d08ccc403029a8e05a6795084e"],["/bower_components/iron-overlay-behavior/iron-overlay-manager.html","69f33addb5405f62cf49bca193537081"],["/bower_components/iron-resizable-behavior/iron-resizable-behavior.html","369445436b6316b3ce3a36621808e152"],["/bower_components/iron-selector/iron-multi-selectable.html","c3a5407e403189d9ffbb26a94253cac9"],["/bower_components/iron-selector/iron-selectable.html","a179d62580cfdf7c022dcdf24841487a"],["/bower_components/iron-selector/iron-selection.html","3343a653dfada7e893aad0571ceb946d"],["/bower_components/iron-validatable-behavior/iron-validatable-behavior.html","276f0be293659b862bc108eabfdb04e5"],["/bower_components/neon-animation/neon-animatable-behavior.html","c35ffb9c73e580cc6b87152ab2d55ba2"],["/bower_components/neon-animation/neon-animation-runner-behavior.html","e95447da3c19360a9d6182aa394c9edf"],["/bower_components/paper-behaviors/paper-button-behavior.html","1b832001d3a6001ddeb2380e4b5bee47"],["/bower_components/paper-behaviors/paper-checked-element-behavior.html","c7d620cba7991428b0036c0311a55dd7"],["/bower_components/paper-behaviors/paper-inky-focus-behavior.html","07276537aed6235c4126ff8f2f38db6a"],["/bower_components/paper-behaviors/paper-ripple-behavior.html","26f84434724812da0631633cdd54676e"],["/bower_components/paper-button/paper-button.html","ce857a5d05931fef7fbb2090ae0feb06"],["/bower_components/paper-checkbox/paper-checkbox.html","06eb5be2b9b943e4d65281dfc2b36efb"],["/bower_components/paper-dialog-behavior/paper-dialog-behavior.html","e98cd5e1ca8512f93fffb4c99cc7538d"],["/bower_components/paper-dialog-behavior/paper-dialog-shared-styles.html","e9be5e84da10e2c8126484a4e8fdeb98"],["/bower_components/paper-dialog/paper-dialog.html","b73346d4d1d44fe4db505a2629fe4f9a"],["/bower_components/paper-icon-button/paper-icon-button.html","d2302a27079e142d6cf27ecb26e21e06"],["/bower_components/paper-input/paper-input-addon-behavior.html","2a44f95760e14f00e2edef2941dc3a01"],["/bower_components/paper-input/paper-input-behavior.html","5414ca3c1c15e9914a016e5dc42253d0"],["/bower_components/paper-input/paper-input-char-counter.html","0b700395d284f73e0d5fefb8ecc97786"],["/bower_components/paper-input/paper-input-container.html","449870d5e326ce0057df9453c320e3ea"],["/bower_components/paper-input/paper-input-error.html","ea91878f0704d294c5f7a9090852aba5"],["/bower_components/paper-input/paper-textarea.html","03688fa0a8c1bbf3a1936b04158e5b33"],["/bower_components/paper-material/paper-material-shared-styles.html","96e347b417f6c92a317813cc08a23c8d"],["/bower_components/paper-radio-button/paper-radio-button.html","32ae0c6d06541999d307b003d8573805"],["/bower_components/paper-radio-group/paper-radio-group.html","c84a120e02205a23192dd35b78778bd1"],["/bower_components/paper-ripple/paper-ripple.html","ab48a97fb99a146ad6eff4bf3e6d0ad8"],["/bower_components/paper-styles/color.html","731b5f7949a2c3f26ce829fd9be99c2d"],["/bower_components/paper-styles/default-theme.html","9e845d4da61bd65308eb8e4682cd8506"],["/bower_components/paper-styles/shadow.html","17203fd5db371a3e5cb4efabb11951f9"],["/bower_components/paper-styles/typography.html","dc2b6f8af5ebcb16a63800b46017a08a"],["/bower_components/polymer/polymer-micro.html","51bf9669120232f00691f897cd456e35"],["/bower_components/polymer/polymer-mini.html","70300bbedb25a0e0fa086ad307a45117"],["/bower_components/polymer/polymer.html","fcfd1ca7766ad2fc9845a9f5d7d7c8ce"],["/bower_components/promise-polyfill/Promise.js","6d72e76387d06f828797b0ce05a2feb7"],["/bower_components/promise-polyfill/promise-polyfill-lite.html","dde76b713d4508d4b49e5a4b203b2a10"],["/bower_components/webcomponentsjs/webcomponents-lite.min.js","32b5a9b7ada86304bec6b43d3f2194f0"],["/index.html","a72bd149d55ebb91d8b46b7fa4160628"],["/manifest.json","2eefc15db4b58758cddc0d666e27d399"],["/src/app-builder-exam.html","8035a219c53457a2e10e99ea81a4421b"]];
var cacheName = 'sw-precache-v2--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.toString().match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              return cache.add(new Request(cacheKey, {
                credentials: 'same-origin',
                redirect: 'follow'
              }));
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameter and see if we have that URL
    // in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = 'index.html';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







