function loadImg(src) {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');
    img.onload = () => {
      resolve(img);
    };
    img.onerror = () => {
      const error = new Error('Fail to load img: ' + src);
      reject(error);
    };
    img.src = src;
  });
}

const url = 'https://www.imooc.com/static/img/index/logo.png';

(async function () {
  const img = await loadImg(url);
  console.log(img.width, img.height);
})();
