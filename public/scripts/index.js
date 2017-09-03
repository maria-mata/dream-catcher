const url = 'http://localhost:3000'

$(() => {
  $('#login-form').submit(logIn)
  $('#signup-form').submit(signUp)
});

function logIn(event) {
  event.preventDefault()
  const username = $('#username').val()
  const password = $('#password').val()
  const data = {username, password}
  $.post(url + '/auth/login', data)
    .then(res => {
      if (res.error) {
        console.log(res.error)
        $('#login-error').show()
      } else {
        localStorage.setItem('token', res.token)
        location.href = '/dreams'
      }
    })
};

function signUp(event) {
  event.preventDefault()
  const email = $('#email').val()
  const username = $('#username-new').val()
  const password = $('#password-new').val()
  const data = {email, username, password}
  $.post(url + '/auth/signup', data)
    .then(res => {
      if (res.error) {
        console.log(res.error)
        $('#signup-error').show()
      } else {
        localStorage.setItem('token', res.token)
        location.href = '/dreams'
      }
    })
};
