let masks = [];

export function drawMasks() {
  if (masks.length === 0) {
    createMasks();
  }
  masks.forEach(drawMask);
}

function createMasks() {
  let top = document.createElement('canvas');
  let bottom = document.createElement('canvas');

  top.classList.add('section-mask', 'js-section-mask', 'reversed');
  bottom.classList.add('section-mask', 'js-section-mask');
  return [top, bottom];
}

Array.prototype.slice.call(document.querySelectorAll('section')).forEach(function(section, i) {
  let [top, bottom] = createMasks();

  section.appendChild(bottom);
  if (i !== 0) {
    section.insertBefore(top, section.children[0]);
  }
  masks.push({
    section,
    bottom,
    top
  });
});

function drawMask({section, bottom, top}) {
  let topContext = top.getContext('2d');
  let bottomContext = bottom.getContext('2d');
  let height = top.height = bottom.height = 45;
  let width = top.width = bottom.width = section.clientWidth;

  drawTopMask(topContext, height, width);
  drawBottomMask(bottomContext, height, width);
}

function drawTopMask(context, height, width) {
  context.fillStyle = 'hsl(191, 69%, 92%)';
  context.moveTo(0, height);
  context.lineTo(0, 0);
  context.lineTo(width, 0);
  context.fill();
}

function drawBottomMask(context, height, width) {
  context.fillStyle = 'hsl(191, 69%, 92%)';
  context.moveTo(0, height);
  context.lineTo(width, height);
  context.lineTo(width, 0);
  context.fill();
}