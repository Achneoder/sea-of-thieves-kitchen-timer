// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
import { startTimer, stopTimer } from "./timer";
import { Condition } from "./types/condition.enum";

let timerStarted = false;

const currentState = {
  [Condition.RAW]: false,
  [Condition.UNDER_COOKED]: false,
  [Condition.COOKED]: false,
  [Condition.BURNT]: false
};

const audio = new Audio(__dirname + '/../static/pristine-609.mp3');

window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector: string, text: string) => {
    const element = document.getElementById(selector);
    if (element) {
      element.innerText = text;
    }
  };

  const button: HTMLElement | null = document.getElementById('timerButton');
  const food = document.getElementById('food-select');
  const body = document.getElementById('body');

  //@ts-ignore
  button?.addEventListener('click', () => {
    console.log('click')
    timerStarted = !timerStarted;
    if (timerStarted) {
      //@ts-ignore

      button!.innerText = 'Stop';
      //@ts-ignore
      startTimer((food!.value as Food), (condition: Condition, currentTime: number) => {
        replaceText('timeRemaining', formatTime(currentTime));
        console.log('quick condition', condition);
        if (!currentState[condition]) {
          currentState[condition] = true;
          console.log('condition', condition);
          switch (condition) {
            case Condition.RAW:
              body!.style['backgroundColor'] = 'red';
              break;
            case Condition.UNDER_COOKED:
              body!.style['backgroundColor'] = 'orange';
              audio.currentTime = 0;
              audio.play();
              break;
            case Condition.COOKED:
              body!.style['backgroundColor'] = 'green';
              audio.currentTime = 0;
              audio.play().then(() => {
                setTimeout(() => {
                  audio.currentTime = 0;
                  audio.play;
                }, 1500);
              });
              break;
            case Condition.BURNT:
              body!.style['backgroundColor'] = 'red';
              break;
          }
        }
      });
    } else {
      //@ts-ignore

      button.innerText = 'Start';
      stopTimer();
      replaceText('timeRemaining', '00:00')
      resetState();
      body!.style['backgroundColor'] = 'white';
    }
  });


});

function formatTime(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  let minutesString: string;
  if (minutes >= 10) {
    minutesString = String(minutes);
  } else {
    minutesString = '0' + String(minutes);
  }
  const remainingSeconds = seconds - (minutes * 60);
  let secondsString: string;
  if (remainingSeconds >= 10) {
    secondsString = String(remainingSeconds);
  } else {
    secondsString = '0' + String(remainingSeconds);
  }
  return `${minutesString}:${secondsString}`;
}

function resetState() {
  currentState.burnt = false;
  currentState.cooked = false;
  currentState.underCooked = false;
  currentState.raw = false;
}