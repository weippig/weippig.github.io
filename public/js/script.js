(function(document) {
  var toggle = document.querySelector('.sidebar-toggle');
  var sidebar = document.querySelector('#sidebar');
  var checkbox = document.querySelector('#sidebar-checkbox');

  document.addEventListener('click', function(e) {
    var target = e.target;

    if(!checkbox.checked ||
       sidebar.contains(target) ||
       (target === checkbox || target === toggle)) return;

    checkbox.checked = false;
  }, false);
})(document);


// scroll to top button
let debounceTimeout;
let body = document.querySelector('body');
let scrollingElement = document.scrollingElement;

setScrollClass();

window.addEventListener('scroll', setScrollClass);
window.addEventListener('resize', setScrollClass);

function setScrollClass() {
  if (debounceTimeout) {
    window.cancelAnimationFrame(debounceTimeout);
  }

  debounceTimeout = window.requestAnimationFrame(function () {
    let scrollTop = scrollingElement.scrollTop;
    let scrollHeight = scrollingElement.scrollHeight;
    let innerHeight = window.innerHeight;
    let scrollBottom = scrollHeight - innerHeight - scrollTop;

    body.classList.toggle('at-top', scrollTop < 48);
    body.classList.toggle('at-bottom', scrollBottom < 48);
  });
}

