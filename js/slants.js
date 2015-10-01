import {QSA} from './qs';

let masks = [];
const MASK_HEIGHT = 45;

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
  top.height = bottom.height = MASK_HEIGHT;
  return [top, bottom];
}

[...QSA('section')].forEach(function(section, i) {
  let [top, bottom] = createMasks();

  if (i === 0) {
    section.appendChild(bottom);
    masks.push({section, bottom});
    return;
  }

  if (i !== 0 && i % 2 === 0) {
    section.appendChild(bottom);
    section.insertBefore(top, section.children[0]);
    masks.push({section, bottom, top});
  }
});

function drawMask({section, bottom, top}) {
  if (top) {
    drawTopMask(top, section);
  }
  if (bottom) {
    drawBottomMask(bottom, section);
  }
}

function setupContext(mask, section) {
  let context = mask.getContext('2d');
  let width = mask.width = section.clientWidth;

  context.fillStyle = 'hsl(191, 69%, 92%)';
  return [context, width];
}

function drawTopMask(mask, section) {
  let [context, width] = setupContext(mask, section);

  context.moveTo(0, MASK_HEIGHT);
  context.lineTo(0, 0);
  context.lineTo(width, 0);
  context.fill();
}

function drawBottomMask(mask, section) {
  let [context, width] = setupContext(mask, section);

  context.moveTo(0, MASK_HEIGHT);
  context.lineTo(width, MASK_HEIGHT);
  context.lineTo(width, 0);
  context.fill();
}