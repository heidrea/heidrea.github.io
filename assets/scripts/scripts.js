$(function() {
  var path = window.location.pathname.split('/')[1]
  document.getElementsByTagName('body')[0].className = path || 'home'

  $('#mobile-header #open, #mobile-header #close').click(function() {
    $('#mobile-header #open, #mobile-header #close').toggle()
    $('#mobile-nav').slideToggle()
  })

  $('.fadein img:gt(0)').hide()
  setInterval(function () {
    $('.fadein :first-child').hide()
      .next('img').fadeIn('fast').end().appendTo('.fadein')
  }, 4000)

  $('.demolition-fadein img:gt(0)').hide()
  setInterval(function () {
    $('.demolition-fadein :first-child').hide()
      .next('img').fadeIn('fast').end().appendTo('.demolition-fadein')
  }, 3000)

  $('.hardscapes-fadein img:gt(0)').hide()
  setInterval(function () {
    $('.hardscapes-fadein :first-child').hide()
      .next('img').fadeIn('fast').end().appendTo('.hardscapes-fadein')
  }, 3000)

  toggleContent = function(content) { $("." + content).slideToggle() }

  toggleContactForm = function() { $('.contact-form, .interested').slideToggle() }

  submitTo = function(address) {
    $.ajax({
      url: "https://formspree.io/" + address,
      method: "POST",
      data: {
        name: $('#contactForm input[name="name"]').val(),
        _replyto: $('#contactForm input[name="_replyto"]').val(),
        phone: $('#contactForm input[name="phone"]').val(),
        message:$('#contactForm textarea').val()
      },
      dataType: "json"
    })
    toggleContactForm()
  }

  if (window.location.href.indexOf("#contact") > -1) { toggleContactForm() }
});
