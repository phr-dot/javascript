// 오늘 날짜의 요일
// const days = ["일", "월", "화", "수", "목", "금", "토"];
// const now = new Date();
// const today = now.getDay();
// console.log(days[today]);

// 특정날짜의 요일 구하기
// const days = ["일", "월", "화", "수", "목", "금", "토"];
// const eventDay = new Date("2020-12-25");
// const day = eventDay.getDay();
// console.log(days[day]);

const week = ["일", "월", "화", "수", "목", "금", "토"];
const last_day = document.getElementById("last_day");

const dDay = new Date(2020, 5, 18, 18, 0);
const year = dDay.getFullYear();
const month = dDay.getMonth() + 1;
const date = dDay.getDate();
const day = week[dDay.getDay()];
const hour = dDay.getHours();
const min = dDay.getMinutes();
const min2 = `${min}` < 10 ? `0${min}` : `${min}`;

last_day.textContent = `${year}년 ${month}월 ${date}일 (${day}) ${hour}:${min2}`;

const countdown = document.getElementById("countdown");
const clocks = countdown.querySelectorAll("h3");

function tick() {
  const dDayTime = dDay.getTime();
  const nowTime = new Date().getTime();

  const t = dDayTime - nowTime;

  // 남은 시간 표시
  // 1s = 1000ms
  // 1m = 60s
  // 1h = 60m
  // 1d = 24h

  const days = Math.floor(t / (1000 * 60 * 60 * 24));
  const hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((t % (1000 * 60)) / 1000);

  const times = [days, hours, minutes, seconds];

  function addZoro(i) {
    if (i < 10) {
      return (i = `0${i}`);
    } else {
      return i;
    }
  }

  clocks.forEach((item, index) => {
    item.innerHTML = addZoro(times[index]);
  });

  if (t < 0) {
    clearInterval(timer);
    countdown.innerHTML = `<h3>수고하셨습니다.</h3>`;
  }
}

const timer = setInterval(tick, 1000);

tick();
