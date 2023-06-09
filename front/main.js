import ky from 'ky';

async function submit() {
  const from = document.querySelector('#from').value;
  // const to = document.querySelector('#to').value;
  try {
    const res = await ky.get(`/api/suggestion_stop?name=${from}`);
    const a = await res.json();
    if (a.length === 1) {
      location.assign(`/pobudovany/?from=${a[0].stop_id}`);
    } else {
      console.log(a);
      document.querySelector('#error_from').style.display = 'block';
      document.querySelector('#error_to').style.display = 'block';
      console.log('Too many results!');
    }
  } catch (err) {
    console.log(err);
  }
}

document.querySelector('#submit').addEventListener('click', submit);
