const url2 = 'http://localhost:3000/dreams'
// const url2 = 'https://desolate-coast-86563.herokuapp.com/dreams'

$(() => {
  $('#logout').click(logOut)
  $('#new-dream').submit(addNewDream)
  $('.edit').click(editDream)
  $('.delete').click(deleteDream)
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
    console.log(res)
    location.reload()
  })
};

function editDream(event) {
  let id = $(this).attr('id').charAt(0)
  console.log('edit dream id:', id);
};

function deleteDream(event) {
  let id = $(this).attr('id').charAt(0)
  console.log('delete dream id:', id);
};
