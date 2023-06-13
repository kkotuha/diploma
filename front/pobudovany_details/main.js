import ky from 'ky';

const query = new URLSearchParams(location.search);
const from = query.get('from');
if (!from) {
  location.assign('/pobudovany/');
}
const to = query.get('to');
if (!to) {
  location.assign('/pobudovany/');
}
const route = query.get('route_no');
if (!to) {
  location.assign('/pobudovany/');
}

async function main() {
  try {
    const res = await ky.get(`/api/build_trip2?from=${from}&to=${to}&route_no=${route}`);
    const a = await res.json();
    console.log(a);
    document.querySelector('#title').innerHTML = a.route_name;
    document.querySelector('#stop_from').innerHTML = a.stop_name1;
    document.querySelector('#stop_to').innerHTML = a.stop_name2;
    document.querySelector('#time').innerHTML = a.arrial_time +  ' хв';
  } catch (err) {
    location.assign(`/pobudovany/`);
  }
}

main();
