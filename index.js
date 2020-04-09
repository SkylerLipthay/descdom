import descdom from './descdom.js';

renderStepOne();

function renderStepOne() {
  const children = [
    { tag: 'h1', children: ['descdom test'] },
    { tag: 'h2', children: ['first step'] },
    {
      tag: 'button',
      attrs: {
        type: 'button',
        onclick: renderStepTwo
      },
      children: ['render the next step']
    }
  ];

  descdom.render(document.body, children);
}

function renderStepTwo() {
  const children = [
    { tag: 'h1', children: ['descdom test'] },
    { tag: 'h2', children: ['second step'] },
    {
      tag: 'button',
      attrs: {
        type: 'button',
        onclick: renderStepOne
      },
      children: ['render the previous step']
    },
    { tag: 'p', children: ['yay! we did it!'] }
  ];

  descdom.render(document.body, children);
}
