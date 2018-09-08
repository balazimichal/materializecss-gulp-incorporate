document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems);
});

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.scrollspy');
  var instances = M.ScrollSpy.init(elems);
});

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.pushpin');
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
  var instances = M.Pushpin.init(elems, options);
});
