const url = 'http://localhost:3000'

$(() => {
  // localStorage.removeItem('token');
  $('#login-error').hide()
  $('#signup-error').hide()
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
        console.log(res.error);
        $('#login-error').show()
      } else {
        location.href = '/dreams'
        // console.log(res);
      }
    })
};

function signUp(event) {
  event.preventDefault()
  const username = $('#username-new').val()
  const email = $('#email').val()
  const password = $('#password-new').val()
  const data = {username, email, password}
  $.post(url + '/auth/signup', data)
    .then(res => {
      if (res.error) {
        console.log(res.error);
        $('#signup-error').show()
      } else {
        location.href = '/dreams'
      }
    })
};
