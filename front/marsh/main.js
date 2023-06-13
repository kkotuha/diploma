import ky from 'ky';

async function submit() {
  const mar = document.querySelector('#mar').value;
  // const to = document.querySelector('#to').value;
  try {
    const res = await ky.get(`/api/suggestion_trip?name=${mar}`);
    const a = await res.json();
    if (a.length === 1) {
      location.assign(`/marsh_details/?mar=${a[0].route_no}`);
    } else {
      console.log(a);
      document.querySelector('#error').style.display = 'block';
      console.log('Too many results!');
    }
  } catch (err) {
    console.log(err);
  }
}

document.querySelector('#submitm').addEventListener('click', submit);