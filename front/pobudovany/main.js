import ky from 'ky';

const query = new URLSearchParams(location.search);
const from = query.get('from');
if (!from) {
  location.assign('/');
}
const to = query.get('to');
if (!to) {
  location.assign('/');
}

async function main() {
    try {
      const res = await ky.get(`/api/build_trip?from=${from}&to=${to}`);
      const trip = await res.json();
  
      document.querySelector('#title').innerHTML = `З ${trip.stop_name1} До ${trip.stop_name2}`;
  
      const routeList = document.querySelector('#route');
      for (let i = 0; i < trip.stops.length; i++) {
        const route = trip.stops[i];
        const time = trip.stops1[i];
        const route_no = trip.stops2[i];
  
        const li = document.createElement('li');
        const routeText = document.createElement('span');
        routeText.textContent = `${route} Наступний в: ${time}`;
  
        const button = document.createElement('button');
        button.textContent = 'Переглянути деталі';
        button.addEventListener('click', () => {
          // Handle button click event here
          console.log('Button clicked:', route);
         location.assign(`/pobudovany_details/?from=${trip.stop_name1}&to=${trip.stop_name2}&route_no=${route_no}`);   
         });
  
        li.appendChild(routeText);
        li.appendChild(button);
        routeList.appendChild(li);
      }
    } catch (err) {
      location.assign(`/pobudovany/`);
    }
  }

main();