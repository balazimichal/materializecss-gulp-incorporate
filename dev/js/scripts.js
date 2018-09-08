document.addEventListener('DOMContentLoaded', function() {
  var sidenav = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(sidenav);

  var scrollspy = document.querySelectorAll('.scrollspy');
  var instances = M.ScrollSpy.init(scrollspy);

  var pushpin = document.querySelectorAll('.pushpin');
  var options = {
    top: 10,
    onPositionChange: function() {
      var element = document.getElementById('main-nav');
      if (document.querySelector('.pinned') !== null) {
        element.classList.add('pinned');
      } else {
        element.classList.remove('pinned');
      }
    }
  };
  var instances = M.Pushpin.init(pushpin, options);
});
