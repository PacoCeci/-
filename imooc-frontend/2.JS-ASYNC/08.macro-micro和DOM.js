const $p1 = $('<p>some content</p>');
const $p2 = $('<p>some content</p>');
const $p3 = $('<p>some content</p>');

$('#container').append($p1).append($p2).append($p3);

// 微任务: DOM渲染前触发
Promise.resolve().then(() => {
  console.log('length in Promise', $('#container').children().length);
  alert('Promise - DOM 没有渲染到页面');
});

// 宏任务: DOM渲染后触发
setTimeout(() => {
  console.log('length in setTimeout', $('#container').children().length);
  alert('setTimeout - DOM 已经渲染到页面');
});
