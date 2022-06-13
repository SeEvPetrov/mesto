export default class UserInfo {
  constructor({
    name,
    about,
    avatar
  }) {
    this._name = document.querySelector(name);
    this._about = document.querySelector(about);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    const dataUser = {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar.src
    };
    return dataUser;
  }

  setUserInfo(userData) {
    this._name.textContent = userData.name;
    this._about.textContent = userData.about;
    this._id = userData._id;

  }

  setUserAvatar(userData) {
    this._avatar.src = userData.avatar || userData.link;
  }
}
