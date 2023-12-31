export default {
  bind(el, binding, vnode) {
    el.event = event => {
      if (!(el === event.target || el.contains(event.target))) {
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener("click", el.event);
  },
  unbind(el) {
    document.body.removeEventListener("click", el.event);
  }
};
