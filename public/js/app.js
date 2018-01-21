$(document).ready(() => {
  $('.header-signup').on('click', () => {
    $('.signupDialog').removeClass('hidden');
    $('.signupDialog').dialog();
  })
  $('.header-log').on('click', () => {
    $('.loginDialog').removeClass('hidden');
    $('.loginDialog').dialog();
  })
  $('.submitNewTechniqueButton').on('click', (e) => {
    console.log(e);
    let shortDescription = e.target.previousElementSibling.previousElementSibling.value;
    let detailedDescription = e.target.previousElementSibling.value;
    let url = '/disorders/api/' + e.target.dataset.disorderId + '/techniques';
    $.ajax({
      method: "POST",
      url: url,
      data: {
        shortDescription: shortDescription,
        detailedDescription: detailedDescription
      },
      success: (json) => {
        e.target.previousElementSibling.previousElementSibling.setAttribute('value', '');
        e.target.previousElementSibling.setAttribute('value', '');
        console.log('success');
      },
      error: () => {
        console.log("ajax post error!");
      }
    })
  })
})
