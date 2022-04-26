import * as nearApi from 'near-api-js';
import { getConfig } from './config'
import * as buffer from 'buffer';

export function sendHighScore(highScore) {
  window.contract.setGreeting({
    message: `SushiDou_HighScore:${highScore}`
  });
}