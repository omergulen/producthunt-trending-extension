
import { isEmptyList, getProducts } from './helpers/producthunt';
import {
  KEY_PRODUCTS,
  KEY_SELECTED_PERIOD,
  getObject,
  setObject,
} from './helpers/localStorage';


const tokenKey = "producthunt_token";
const token =
  window.localStorage.getItem(tokenKey) ||
  "f481389cba9d24863cbf01c6c4e4d1315f11fafaf3671858db308e29a8ed493e";

chrome.runtime.onInstalled.addListener(() => {
  console.log('onInstalled....');
  scheduleRequest();
  console.log('schedule watchdog alarm to 5 minutes...');
  chrome.alarms.create('watchdog', { periodInMinutes: 5 });
  startRequest();
});

chrome.runtime.onStartup.addListener(() => {
  console.log('onStartup....');
  startRequest();
});

chrome.alarms.onAlarm.addListener(alarm => {
  console.log('Alarm triggered', alarm);
  if (alarm && alarm.name === 'watchdog') {
    chrome.alarms.get('refresh', alarm => {
      if (alarm) {
        console.log('Refresh alarm exists. Yay.');
        const products = getObject(KEY_PRODUCTS);
        if (isEmptyList(products)) {
          console.log('Refetching because the product list was empty');
          startRequest();
        }
      } else {
        console.log("Refresh alarm doesn't exist, starting a new one");
        startRequest();
        scheduleRequest();
      }
    });
  } else {
    startRequest();
  }
});

function scheduleRequest() {
  console.log('schedule refresh alarm to 30 minutes...');
  chrome.alarms.create('refresh', { periodInMinutes: 30 });
}

async function startRequest() {
  console.log('start fetching');
  const period = getObject(KEY_SELECTED_PERIOD);
  try {
    let result = await getProducts(period);
    const { data } = result;
    setObject(KEY_PRODUCTS, data);
  } catch (e) {
    console.log(e);
  }
    
}

