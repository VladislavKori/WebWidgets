const timeBlock = document.querySelector("#time");

setInterval(() => {
  const date = new Date();

  const min = date.getMinutes();
  const sec = date.getSeconds();
  const hour = date.getHours();

  timeBlock.innerHTML = `${hour}:${min}:${sec}`;
}, 1000);
