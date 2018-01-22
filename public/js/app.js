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
    handleSubmitNewTechniqueButton(e);
  })
  $('.postNewCommentButton').on('click', (e) => {
    handlePostNewCommentButton(e);
  })
})

const handlePostNewCommentButton = (e) => {
  console.log(e);
  console.log(e.target.dataset.techniqueid);
  let currentPath = e.view.window.location.pathname;
  let comment = e.target.previousElementSibling.value;
  let url = '/techniques/api/' + e.target.dataset.techniqueid;
  let currentDate = getCurrentDate();
  $.ajax({
    method: 'POST',
    url: url,
    data: {
      comment: comment,
      userName: "db_owner",
      date: currentDate
    },
    success: (json) => {
      e.target.previousElementSibling.value = "";
      console.log('success');
      $.ajax({
        method: 'GET',
        url: currentPath
      })
    },
    error: () => {
      console.log("ajax post comment error");
    }
  })
}

const handleSubmitNewTechniqueButton = (e) => {
  console.log(e);
  let shortDescription = e.target.previousElementSibling.previousElementSibling.value;
  let detailedDescription = e.target.previousElementSibling.value;
  let url = '/disorders/api/' + e.target.dataset.disorderId + '/techniques';
  let currentPath = e.view.window.location.pathname;
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
      $.ajax({
        method: "GET",
        url: currentPath
      })
    },
    error: () => {
      console.log("ajax post error!");
    }
  })
}

const getCurrentDate = () => {
  let today = new Date();
  let yyyy = today.getFullYear();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  return mm + "/" + dd + "/" + yyyy;
}
