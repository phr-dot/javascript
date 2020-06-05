const clock = document.getElementById("clock");

function getTime() {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();

  const currentHour = `${hour}` < 10 ? `0${hour}` : `${hour}`;
  const currentMinute = `${minute}` < 10 ? `0${minute}` : `${minute}`;
  const currentSecond = `${second}` < 10 ? `0${second}` : `${second}`;

  clock.textContent = `${currentHour}:${currentMinute}:${currentSecond}`;
}

getTime();

setInterval(() => {
  getTime();
}, 1000);
