export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderer() {
    this._items.forEach(item => {
      const element = this._renderer(item);
      this._addItem(element);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
