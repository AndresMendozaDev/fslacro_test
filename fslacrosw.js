/*
var main_path_ws = '/fslacro/';
var cache_name_ws = 'jslc00';
var default_img_ws = 'images/timelines/00.03.Elite.png'

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cache_name_ws).then(function(cache) {
      return cache.addAll([

        // HTMLS
        main_path_ws + 'index.html',
        main_path_ws + 'simulate.html',
        main_path_ws + 'compare.html',
        // JS
        main_path_ws + 'js/app.js',
		main_path_ws + 'js/app-comparator.js',
        main_path_ws + 'js/finance.js',
        main_path_ws + 'js/plan_defaults.js',
        // JS Util
        main_path_ws + 'js/util/f_utils.js',
		
        main_path_ws + 'js/util/ui_data_binding.js',
        main_path_ws + 'js/util/ui_listeners.js',
		
		main_path_ws + 'js/util/ui_data_binding_comp.js',
		main_path_ws + 'js/util/ui_data_binding_comp_p1.js',
		main_path_ws + 'js/util/ui_data_binding_comp_p2.js',
		
		main_path_ws + 'js/util/ui_listeners_comp.js',
		main_path_ws + 'js/util/ui_listeners_comp_p1.js',
		main_path_ws + 'js/util/ui_listeners_comp_p2.js',
		
        // JS Ext
        main_path_ws + 'js/ext/jquery.inputmask.bundle.min.js',
        main_path_ws + 'js/ext/jquery-3.3.1.min.js',
        main_path_ws + 'js/ext/jquery-3.3.1.slim.min.js',
        // JS Vendor
        main_path_ws + 'vendor/jquery/jquery-3.2.1.min.js',
        main_path_ws + 'vendor/bootstrap/js/bootstrap.min.js',
        main_path_ws + 'vendor/bootstrap/js/popper.js',
        // CSS
        main_path_ws + 'css/main.css',
        main_path_ws + 'css/util.css',
        // CSS Bootstrap
        main_path_ws + 'vendor/bootstrap/css/bootstrap.min.css',
        // IMAGES LOGO FOOTER
        main_path_ws + 'images/logo-uk-borh.png',
        main_path_ws + 'images/Jaguar.gif',
        // IMAGES PLANS
        main_path_ws + 'images/timelines/00.01.Membership.png',
        main_path_ws + 'images/timelines/00.02.Exclusive.png',
        main_path_ws + 'images/timelines/00.03.Elite.png',
        main_path_ws + 'images/timelines/00.04.Gancho_Premium.png',
        main_path_ws + 'images/timelines/00.05.Taylormade.png',
        main_path_ws + 'images/timelines/00.06.Platinum.png',
		// FONTS
		main_path_ws + 'fonts/poppins/Poppins-Regular.ttf',
		main_path_ws + 'fonts/poppins/Poppins-Medium.ttf',
		main_path_ws + 'fonts/poppins/Poppins-Bold.ttf'
   		// ICONS

      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request).then(function(response) {
    // caches.match() always resolves
    // but in case of success response will have value
    if (response !== undefined) {
      return response;
    } else {
      return fetch(event.request).then(function (response) {
        // response may be used only once
        // we need to save clone to put one copy in cache
        // and serve second one
        let responseClone = response.clone();

        caches.open(cache_name_ws).then(function (cache) {
          cache.put(event.request, responseClone);
        });
        return response;
      }).catch(function () {
        return caches.match(main_path_ws + default_img_ws);
      });
    }
  }));
});
*/