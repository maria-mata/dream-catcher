const url2 = 'http://localhost:3000/dreams'
// const url2 = 'https://desolate-coast-86563.herokuapp.com/dreams'

$(() => {
  $('#logout').click(logOut)
  $('#new-dream').submit(addNewDream)
  $('.edit').click(goToEdit)
  $('.delete').click(deleteDream)
  $('#back').click(goBack)
  $('#edit').submit(editDream)
});

function logOut(event) {
  event.preventDefault()
  localStorage.removeItem('user')
  location.href = '/'
};

function addNewDream(event) {
  event.preventDefault()
  const description = $('#description').val()
  const user_id = localStorage.getItem('user')
  const category_id = $('#select').val()
  const data = {description, user_id, category_id}
  $.post(url2, data).then(res => {
    location.reload()
  })
};

function goToEdit(event) {
  let id = $(this).attr('id').charAt(0)
  localStorage.setItem('dream', id)
  location.href = '/dreams/' + id
};

function editDream(event) {
  event.preventDefault()
  if ($('#type').val() === 'Change Category') {
    let category = $('h5.edit').attr('id')
  } else {
    category = $('#type').val()
  }
  const data = {
    id: localStorage.getItem('dream'),
    description: $('#text').val(),
    user_id: localStorage.getItem('user'),
    category_id: category
  }
  $.ajax({
    url: url2,
    type: 'PUT',
    data: data,
    success: goBack(event)
  })
};

function goBack(event) {
  event.preventDefault()
  localStorage.removeItem('dream')
  const user_id = localStorage.getItem('user')
  location.href = '/dreams?id=' + user_id
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
