const xhr = new XMLHttpRequest();

xhr.open('GET', './4.XMLHttpRequest.json', true);

xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      console.log(xhr.responseText);
    }
  }
};

xhr.send();
