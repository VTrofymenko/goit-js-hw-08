import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const LOCAL_STORAGE_KEY = 'videoplayer-current-time';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player
  .setCurrentTime(getCurrentTime())
  .then(function (seconds) {})
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        break;

      default:
        break;
    }
  });

player.on('timeupdate', throttle(onPlayerCurrentTimeSave, 1000));

function onPlayerCurrentTimeSave(event) {
  let timeToSave = event.seconds;
  localStorage.setItem(LOCAL_STORAGE_KEY, timeToSave);
}

function getCurrentTime() {
  return localStorage.getItem(LOCAL_STORAGE_KEY);
}
