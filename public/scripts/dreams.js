const url2 = 'https://desolate-coast-86563.herokuapp.com/dreams'
// const url2 = 'http://localhost:3000/dreams'
let token = localStorage.getItem('token')
let decoded, userId

$(() => {
  authorize()
  $('#logout').click(logOut)
  $('#new-dream').submit(addNewDream)
  $('.edit').click(goToEdit)
  $('.delete').click(deleteDream)
  $('#back').click(goBack)
  $('#edit').submit(editDream)
});

function authorize() {
  if (token) {
    decoded = parseJWT(token)
    userId = decoded.id
  }
};

function parseJWT(token) {
  let base64Url = token.split('.')[1];
  let base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
};

function logOut(event) {
  event.preventDefault()
  localStorage.removeItem('token')
  location.href = '/'
};

function addNewDream(event) {
  event.preventDefault()
  const description = $('#description').val()
  const user_id = userId
  const category_id = $('#select').val()
  const data = {description, user_id, category_id}
  $.post(url2, data).then(res => {
    if (res.error) {
      console.log(res.error)
      $('#new-error').show()
    } else {
      location.reload()
    }
  })
};

function goToEdit(event) {
  if (token) {
    let id = $(this).attr('value')
    localStorage.setItem('dream', id)
    location.href = '/dreams/edit?token=' + token + '&dream=' + id
  }
};

function editDream(event) {
  event.preventDefault()
  let category
  if ($('#type').val() === 'Change Category') {
    category = $('h5.edit').attr('id')
  } else {
    category = $('#type').val()
  }
  const data = {
    id: localStorage.getItem('dream'),
    description: $('#text').val(),
    user_id: userId,
    category_id: category
  }
  if (data.description.trim() != '') {
    $.ajax({
      url: url2,
      type: 'PUT',
      data: data,
      success: goBack(event)
    })
  } else {
    $('#edit-error').show()
  }
};

function goBack(event) {
  event.preventDefault()
  localStorage.removeItem('dream')
  location.href = '/dreams?token=' + token
};

function deleteDream(event) {
  let id = $(this).attr('id').charAt(0)
  $.ajax({
    url: url2,
    type: 'DELETE',
    data: {id},
    success: location.reload()
  })
};
