// register service worker
var main_path_app = '/fslacro/';
var service_worker_name = 'fslacrosw.js';
var service_worker_path = main_path_app + service_worker_name;

if ('serviceWorker' in navigator) {
  //navigator.serviceWorker.register('/offline/00/sw.js', { scope: '/offline/00/' }).then(function(reg) {
  navigator.serviceWorker.register(service_worker_path, { scope: main_path_app }).then(function(reg) {

    if(reg.installing) {
      console.log('Service worker installing');
    } else if(reg.waiting) {
      console.log('Service worker installed');
    } else if(reg.active) {
      console.log('Service worker active');
    }

  }).catch(function(error) {
    // registration failed
    console.log('Registration failed with ' + error);
  });
}
