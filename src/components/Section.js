export default class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  rendered(items) {
    items.forEach((item) => {
      const element = this._renderer(item);
      this.addItem(element);
      // console.log(item);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
