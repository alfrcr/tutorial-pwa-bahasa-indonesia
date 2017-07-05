/*
 *  ====================================
 *  Code App kita
 *  Code di bawah ini tidak perlu diubah
 * 
 */
$(document).ready(function() {
  App.getInstance();
  
  const options = {
    button: '#update-sw',
    toast: '.notification-update',
  };

  new SW(options);
});