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
}

SW.prototype.trackInstall = function(worker) {
  // Paste dari artikel
}

SW.prototype.updateReady = function(worker) {
  // Paste dari artikel
}
