import qr from 'qrcode';

const data = 'Public transport is cool!';
qr.toDataURL(data,{}, function (err, url) {
  if (err) {
    console.log('error: ', err);
    return;
  }
  const a = document.createElement('img');
  a.setAttribute('src',url);
  document.getElementById('qr').appendChild(a);
})




