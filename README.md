# descdom

This is a simple project which demonstrates the essence of all virtual DOM libraries (React, Vue, Mithril, etc.). This essence is a DOM diffing mechanism depending on a declarative DOM descriptor tree (a "virtual DOM" tree).

This is how it looks:

```javascript
import descdom from './descdom.js';

descdom.render(document.body, [
  { tag: 'h1', children: ['an example'] },
  {
    tag: 'button',
    attrs: {
      type: 'button',
      onclick: () => window.alert('hello!')
    },
    children: ['click to say hello']
  }
]);
```

Each DOM node descriptor is either a string-coercible value to be rendered as a DOM `Text` node or an object describing a DOM `Element` node. Object descriptors have at least a `tag` property, and optionally have an `attrs` property (describing attributes to apply to the DOM node) or a `children` property (describing any descendent nodes).

Any DOM library has this functionality at its core. For most libraries, on top of this core exist layers of optimization, ergonomic improvements, and support for automated re-rendering, routing, DOM element lifecycle management, and other such niceties.

`descdom.js` is 45 simple lines of code (not counting comments) and under 1 KB minified. You can see `index.html`/`index.js`, an example application, [running here](https://skylerlipthay.github.io/descdom/index.html).
