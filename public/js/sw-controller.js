function SW(args) {
  this.button = $(args.button);
  this.toast = $(args.toast);

  this.registerSW();
};

SW.prototype.registerSW = function() {
  /*
   *  Register SW dimulai disini
   *  Copy script yang dicantumkan di artikel
   */
  if (!navigator.serviceWorker) return;

  const that = this;

  navigator.serviceWorker.register('/sw.js')
    .then(function(reg) {
      console.info('SW is registered.');

      if (!navigator.serviceWorker.controller) return;

      if (reg.waiting) {
        console.log('waiting')
        that.updateReady(reg.waiting);
        return;
      }

      if (reg.installing) {
        console.log('installing')
        that.trackInstall(reg.installing);
        return;
      }

      reg.addEventListener('updatefound', function() {
        that.trackInstall(reg.installing);
      });
      
      let refreshing;
      navigator.serviceWorker.addEventListener('controllerchange', function() {
        if (refreshing) return;

        window.location.reload();
        refreshing = true;
      });
    })
    .catch(function() {
      console.error('Failed to register SW.');
    });
}

SW.prototype.trackInstall = function(worker) {
  const that = this;

  worker.addEventListener('statechange', function() {
    if (worker.state === 'installed') {
      that.updateReady(worker)
    }
  })
}

SW.prototype.updateReady = function(worker) {
  this.toast.show();
  
  this.button.on('click', function(event) {
    event.preventDefault();

    worker.postMessage({ action: 'skipWaiting' })      
  })
}
