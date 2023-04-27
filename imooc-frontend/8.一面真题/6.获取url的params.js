// 传统方式
// http://abc.com?a=1&b=2&c=5
function query(name) {
  const search = location.search.slice(1); // a=1&b=2&c=5
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');

  const res = search.match(reg);
  return res ? res[2] : null;
}

// URLSearchParams
function query(name) {
  const search = location.search; // a=1&b=2&c=5
  const res = new URLSearchParams(search);
  return res.get(name);
}
