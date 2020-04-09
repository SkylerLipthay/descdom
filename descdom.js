export default { render };

// Renders an array of child DOM descriptors into a physical DOM element node.
//
// `parentEl` is an `Element` whose children should reflect the descriptors
// given by `childDescs`.
//
// `childDescs` is an array of node descriptors. Node descriptors can either be
// objects or string-coercible values. If a node descriptor is an object and has
// a `tag` property, the descriptor will be interpreted as a DOM element node of
// the type specified by `tag` (for example, `'div'` will result in
// `<div></div>` being rendered). If a node descriptor does not have a `tag`
// property, it will be interpreted as a string-coercible value to be rendered
// in a DOM text node.
function render(parentEl, childDescs) {
  const nodes = parentEl.childNodes || [];

  // Remove any excess nodes in the DOM based on the new number of children
  // descriptors.
  const excessNodeCount = Math.max(0, nodes.length - childDescs.length);
  for (let index = 0; index < excessNodeCount; index++) {
    parentEl.removeChild(parentEl.lastChild);
  }

  // Update existing nodes and create any new ones based on the children
  // descriptors.
  for (const [index, childDesc] of childDescs.entries()) {
    let el = nodes[index];
    if (!el) {
      // Make and append an element from scratch based on the child descriptor,
      // since no such node currently exists to be updated.
      el = parentEl.appendChild(makeElement(childDesc));
    } else if ((el.tagName || '') !== (childDesc.tag || '').toUpperCase()) {
      // An element currently exists to be updated, but its tag is different.
      // So, the element must be replaced entirely.
      //
      // Note that `el.tagName` is `undefined` if `el` is a `Text` node, and
      // also that `childDesc.tag` can be `undefined` (most importantly when
      // `childDesc` is a non-object-coercible value like a string or number,
      // which we'll render as a text node).
      el = makeElement(childDesc);
      parentEl.replaceChild(el, nodes[index]);
    }

    // Now that we have a real DOM element, we can apply the child descriptor's
    // attributes to it.
    update(el, childDesc);

    // Finally, we descend into the child's own children.
    if (el.nodeType !== Node.TEXT_NODE) {
      render(el, childDesc.children);
    }
  }
}

function makeElement(desc) {
  // If the descriptor is an object with a `tag` property, we'll create an
  // `Element` node. Otherwise, we'll coerce the descriptor into a string and
  // return a `Text` node.
  return desc.tag ?
    document.createElement(desc.tag) :
    document.createTextNode(desc);
}

function update(el, desc) {
  if (el.nodeType === Node.TEXT_NODE) {
    // If the element is a text node, we update its value using `desc` as
    // string-coercible.
    if (el.data !== `${desc}`) {
      el.data = desc;
    }
    return;
  }

  const descAttrs = Object.keys(desc.attrs || {});

  // Set attributes as necessary.
  for (const name of descAttrs) {
    if (el[name] !== desc.attrs[name]) {
      el[name] = desc.attrs[name];
    }
  }

  // Remove any attributes that were previously set but are now no longer.
  for (const { name } of el.attributes) {
    if (!descAttrs.includes(name)) {
      el.removeAttribute(name);
    }
  }
}
