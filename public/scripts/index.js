// const url = 'http://localhost:3000/auth'
const url = 'https://desolate-coast-86563.herokuapp.com/auth'

$(() => {
  $('#login-form').submit(logIn)
  $('#signup-form').submit(signUp)
});

function logIn(event) {
  event.preventDefault()
  const username = $('#username').val()
  const password = $('#password').val()
  const data = {username, password}
  $.post(url + '/login', data)
    .then(res => {
      if (res.error) {
        console.log(res.error)
        $('#login-error').show()
      } else {
        localStorage.setItem('user', res.id)
        location.href = '/dreams?id=' + res.id
      }
    })
};

function signUp(event) {
  event.preventDefault()
  const email = $('#email').val()
  const username = $('#username-new').val()
  const password = $('#password-new').val()
  const data = {email, username, password}
  $.post(url + '/signup', data)
    .then(res => {
      if (res.error) {
        console.log(res.error)
        $('#signup-error').show()
      } else {
        $('#user').val() = res.id
        location.href = '/dreams?id=' + res.id
      }
    })
};
