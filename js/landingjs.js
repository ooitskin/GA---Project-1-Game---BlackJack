$(function () {
  console.log('LandingJS Linked!');

  $('a').click(function (e) {
    e.preventDefault();
    newLocation = this.href;
    $('body').fadeOut(2500, newpage);
  });
  function newpage() {
    window.location = newLocation;
  }

});

