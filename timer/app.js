setInterval(() => {
  const clock = document.querySelector('.display');

  let time = new Date();
  let sec = time.getSeconds();
  let min = time.getMinutes();
  let hr = time.getHours();

  let day = 'AM';
  if (hr > 12) {
    day = 'PM';
    hr = hr - 12;
  }
  if (hr == 0) {
    hr = 12;
  }
  if (sec < 10) {
    sec = '0' + sec;
  }
  if (min < 10) {
    min = '0' + min;
  }
  if (hr < 10) {
    hr = '0' + hr;
  }
  clock.innerHTML = `<p>${hr}</p>:<p>${min}</p>:<p>${sec}</p> <p>${day}</p>`;
}, 1000);
