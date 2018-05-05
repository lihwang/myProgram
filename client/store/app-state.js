import { observable, computed, action } from 'mobx'

export default class AppState {
  @observable count = 1;
  @observable name= 'lcj';
  @computed get msg() {
    return `${this.name} say count is ${this.count}`;
  }
  @action add() {
    this.count += 1;
  }
  @action changeName(name) {
    this.name = name;
  }
}

// const appState = new AppState();

// 改变参数时执行
// autorun(() => {
// console.log(appState.msg)
// })

// setInterval(() => {
//   appState.add();
// }, 1000)
// export default appState;
