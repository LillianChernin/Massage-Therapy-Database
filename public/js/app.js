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
  $('.updateTechniqueButton').on('click', (e) => {
    console.log(e);
    enterEditTechniqueMode(e);

  })
  $('.deleteTechniqueButton').on('click', (e) => {
    handleDeleteTechniqueButton(e);
  })
})

const enterEditTechniqueMode = (e) => {
  // e.target.parentNode.childNodes[1].classList.add('hidden');
  // e.target.parentNode.childNodes[3].classList.add('hidden');
  e.target.parentNode.childNodes[2].classList.remove('hidden');
  e.target.parentNode.childNodes[5].classList.remove('hidden');
  $.ajax({
    method: "GET",

  })
}

const handleUpdateTechniqueButton = (e) => {

}

const handleDeleteTechniqueButton = (e) => {

}


const handlePostNewCommentButton = (e) => {
  console.log(e);
  console.log(e.target.dataset.techniqueid);
  let currentPath = e.view.window.location.pathname;
  let comment = e.target.previousElementSibling.value;
  let url = '/api/techniques/' + e.target.dataset.techniqueid;
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
      console.log(json);
      // $.ajax({
      //   method: 'GET',
      //   url: currentPath
      // })
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
  let url = '/api/disorders/' + e.target.dataset.disorderId + '/techniques';
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
