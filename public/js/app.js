const App = (function() {
  let instance;

  function timelineTemplate(data) {
    const tmpl = '<li class="collection-item">'
    +   '<p class="title">' + data.title + '</p>'
    +   '<p class="author">Author: ' + data.userId + '</p>'
    +   '<div class="body">' + data.body + '</div>'
    +   '</li>';

    return tmpl;
  }

  function timeline() {
    const timelineDOM = $('#timeline');
    const preloader = $('#preloader');
    let list = '';

    $.ajax({
      method: 'GET',
      url: 'https://jsonplaceholder.typicode.com/posts',
    })
      .done(function(data) {
        if (!data) {
          preloader
            .hide()
            .find('> div')
            .removeClass('active');
          timelineDOM.append('<h3>Error while fetching the data!</h3>');
          return;
        }

        data.map(function(d) {
          list += timelineTemplate(d);
          return d;
        });

        timelineDOM.html('<ul class="collection">' + list + '</ul>');
      })
      .error(function(err) {
        preloader
          .hide()
          .find('> div')
          .removeClass('active');
        timelineDOM.append('<h3 class="error">Error while fetching the data!</h3>');
        console.error(err)
      })
  }

  function init() {
    timeline();

    $('.button-collapse').sideNav();
    $('.carousel.carousel-slider').carousel({ fullWidth: true });
  }

  return {
    getInstance: function() {
      if (!instance) {
        instance = init();
      }

      return instance;
    }
  }
})();
