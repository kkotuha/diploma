import qr from 'qrcode';

qr.toDataURL('Public transport is cool!',{}, function (err, url) {
  if (err) {
    console.log('error: ', err);
    return;
  }
  const a = document.createElement('img');
  a.setAttribute('src',url);
  document.getElementById('qr').appendChild(a);
})