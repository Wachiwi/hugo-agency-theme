// Smooth scrolling via animate()
$(document).ready(function(){
  $("a").on('click', function(event) {
    if (this.hash && window.location.pathname == "/") {
      event.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
        window.location.hash = hash;
      });
    }
  });
});

function base(f) {
  f = f.replace(/\\/g, '/');
  return f.substring(0, f.lastIndexOf('/'));
}

function fname(f) {
   return f.substring(f.lastIndexOf('/')+1, f.lastIndexOf('.'));
}

function ext(f) {
  return f.substring(f.lastIndexOf('.')+1);
}

// Navigation change on scroll
$(document).ready(function(){
  var maxOffset = 300;
  $(window).scroll(function() {
    if ($(window).scrollTop() >= maxOffset) {
      $('.navbar-default').addClass('navbar-shrink');
      var img = $('.navbar-default .navbar-brand img').attr('src').replace('_black', '');
      a = base(img) + '/' + fname(img) + '_black.' + ext(img);
      $('.navbar-default .navbar-brand img').attr('src', a);
    }
    else {
      $('.navbar-default').removeClass('navbar-shrink');
      $('.navbar-default .navbar-brand img').attr('src', $('.navbar-default .navbar-brand img').attr('src').replace('_black', ''));
    }
  });
});

$(document).ready(function(){
  var maxOffset = 300;
  if ($(window).scrollTop() >= maxOffset) {
    $('.navbar-default').addClass('navbar-shrink');
    var img = $('.navbar-default .navbar-brand img').attr('src');
    a = base(img) + fname(img) + '_black' + ext(img);
    $('.navbar-default .navbar-brand img').attr('src', a);
  }
  else {
    $('.navbar-default').removeClass('navbar-shrink');
    $('.navbar-default .navbar-brand img').attr('src', $('.navbar-default .navbar-brand img').attr('src').replace('_black', ''));
  }
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

// Async contact form
$('form[id=contactForm]').submit(function(){
  $.post($(this).attr('action'), $(this).serialize(), function(data, textStatus, jqXHR){
    $('form[id=contactForm] #success').hide();
    $('form[id=contactForm] #error').hide();
    if (jqXHR.status == 200) {
      $('form[id=contactForm] #success').show();
    }}, 'json').fail(function(){
      $('form[id=contactForm] #success').hide();
      $('form[id=contactForm] #error').hide();
      $('form[id=contactForm] #error').show();
  });
  return false;
});

// Contact form validation
$.validate({
  modules : 'html5, toggleDisabled'
});
