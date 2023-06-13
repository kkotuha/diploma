
import ky from 'ky';

const query = new URLSearchParams(location.search);
const id = query.get('zup');
if (!id) {
  location.assign('/zup/');
}

async function main() {
  try {
    const res = await ky.get(`/api/info_stop?id=${id}`);
    const a = await res.json();
    document.querySelector('#title').innerHTML = a.stop_name;
    const routeDiv = document.querySelector('#route');
    const routeInfo = [];

    const routeNames = a.route_name.split(',');
    const arrivalTimes = a.arrial_time.split(',');

    for (let i = 0; i < routeNames.length; i++) {
      const info = routeNames[i] + ' наступний в:  ' + arrivalTimes[i];
      routeInfo.push(info);
    }

    const routeSpan = document.createElement('span');
    routeSpan.textContent = routeInfo.join('\n')
    routeDiv.appendChild(routeSpan);
  } catch (err) {
    console.log(a);
    console.log('Too many results!');
  }
}

main();