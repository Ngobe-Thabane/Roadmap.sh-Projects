import micromodal from "https://cdn.skypack.dev/micromodal@0.4.6";
import 'https://cdn.jsdelivr.net/npm/dayjs@1.10.8/dayjs.min.js';
import 'https://cdn.jsdelivr.net/npm/dayjs@1.10.8/plugin/utc.js';
import 'https://cdn.jsdelivr.net/npm/dayjs@1.10.8/plugin/timezone.js';

micromodal.init({disableScroll: true});

let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const dropDown = document.getElementById('timezones');

dropDown.addEventListener('change', (e)=>{
  timezone = e.target.value;
})

document.getElementById('apply').addEventListener('click', ()=> {
  clearInterval(time);
  time = displayTime(timezone);
});

dayjs.extend(dayjs_plugin_utc);
dayjs.extend(dayjs_plugin_timezone);

Intl.supportedValuesOf('timeZone').forEach(timeZone =>{
  
  const option = document.createElement('option');
  option.value = timeZone;
  option.text = timeZone;
  if(timeZone === timezone) option.selected = true;
  dropDown.appendChild(option);
  
})

let time = displayTime(timezone);

function displayTime(timezone){
  
  const timeZoneTag = document.getElementById('time-paragraph');
  const time = document.getElementById('time');
  const date = document.getElementById('date');
  
  timeZoneTag.innerHTML = timezone;
  
  const analog = ()=> {
    const currentTime = dayjs();
    const clock = currentTime.tz(timezone);
    time.innerHTML = clock.format('HH:mm:ss');
    date.innerHTML = clock.format('dddd, DD MMM, YYYY');
  }

  const iterval = setInterval(analog, 1000);
  analog();

  return iterval;
}
