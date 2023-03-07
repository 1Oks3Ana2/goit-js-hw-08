import throttle from 'lodash.throttle';

const STORAGE_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

player.on('play', onPlay);

updateVideoTimeLoader();

function onPlay() {
  player.on('timeupdate', throttle(getPausedVideoTime, 1000));
}

function getPausedVideoTime() {
  player.getCurrentTime().then(function (seconds) {
    const timePaused = seconds;

    localStorage.setItem(STORAGE_KEY, timePaused);
  });
}

function updateVideoTimeLoader() {
  const videoPausedTime = localStorage.getItem(STORAGE_KEY);

  if (videoPausedTime) {
    player.setCurrentTime(videoPausedTime);
  }
}
