$(() => {
  $('#new-dream').submit(addNewDream)
  $('#logout').click(logOut)
});

function addNewDream(event) {
  event.preventDefault()
  console.log('new dream clicking');
};

function logOut(event) {
	event.preventDefault()
	location.href = '/'
};
