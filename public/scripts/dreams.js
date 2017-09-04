// const url2 = 'http://localhost:3000/dreams'
const url2 = 'https://desolate-coast-86563.herokuapp.com/dreams'

$(() => {
  $('#new-dream').submit(addNewDream)
  $('#logout').click(logOut)
});

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

function logOut(event) {
	event.preventDefault()
  localStorage.removeItem('user')
	location.href = '/'
};
