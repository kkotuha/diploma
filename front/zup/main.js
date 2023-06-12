import ky from 'ky';

async function submit() {
  const zup = document.querySelector('#zup').value;

  try {
    const res = await ky.get(`/api/suggestion_stop?name=${zup}`);
    const a = await res.json();
    if (a.length === 1) {
      location.assign(`/zup_details/?zup=${a[0].stop_id}`);
    } else {
      console.log(a);
     
      console.log('Too many results!');
    }
  } catch (err) {
    console.log(err);
    
  }
}

document.querySelector('#submitzp').addEventListener('click', submit);
