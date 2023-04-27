const divElem = document.getElementById('div');

function move(elem, distance, time) {
  const start = performance.now();

  function doMove() {
    const current = performance.now();
    const elapsed = current - start;

    const nextMove = distance * (elapsed / time);
    elem.style.transform = `translateX(${nextMove}px)`;
    if (elapsed >= time) {
      cancelAnimationFrame(doMove);
    } else {
      requestAnimationFrame(doMove);
    }
  }
  requestAnimationFrame(doMove);
}

move(divElem, 500, 3000);
