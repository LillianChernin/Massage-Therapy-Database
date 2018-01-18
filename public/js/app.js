$(document).ready(() => {
  $('.header-signup').on('click', () => {
    $('.signupDialog').removeClass('hidden');
    $('.signupDialog').dialog();
  })
  $('.header-log').on('click', () => {
    $('.loginDialog').removeClass('hidden');
    $('.loginDialog').dialog();
  })
})
