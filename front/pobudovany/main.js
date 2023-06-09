// get from from query
const query = new URLSearchParams(location.search);
const from = query.get('from');

console.log(from);