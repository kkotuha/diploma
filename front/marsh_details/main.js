import ky from 'ky';

const query = new URLSearchParams(location.search);
const id = query.get('mar');
if (!id) {
  location.assign('/marsh/');
}

async function main() {
  try {
    const res = await ky.get(`/api/info_trip?id=${id}`);
    const a = await res.json();
    document.querySelector('#title').innerHTML = a.route_name;
    const stopsList = a.stop_name.split(',');  // Remove the join() method
    const stopsElement = document.querySelector('#stopList');

    stopsList.forEach(stop => {
      const listItem = document.createElement('li');
      listItem.textContent = stop;
      stopsElement.appendChild(listItem);
    });
  } catch (err) {
    console.log(a);
    console.log('Too many results!');
  }
}

main();
