const url = 'https://img.mukewang.com/5a9fc8070001a82402060220-140-140a.jpg';

function loadImg(src) {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');
    img.onload = () => {
      resolve(img);
    };

    img.onerror = () => {
      reject(new Error('加载失败: ' + src));
    };

    img.src = url;
  });
}

loadImg(url)
  .then((img) => {
    console.log(img.width);
    return img;
  })
  .then((img) => {
    console.log(img.height);
  })
  .catch((error) => {
    console.log(error);
  });
