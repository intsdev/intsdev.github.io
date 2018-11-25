export default {
  namespaced: true,
  state: {
    items: [
      {
        route: 'scanchange',
        title: 'ScanChange - мониторинг обменников'
      },
      {
        route: 'jpbooks',
        title: 'Интернет магазин JPBooks'
      },
      {
        route: 'hamiltonhouse',
        title: '«Hamilton House Publishers»'
      },
      {
        route: 'autotras',
        title: 'МФА сайт об автомобилях - Autotras'
      },
      {
        route: 'bot-for-vk',
        title: 'Bot для VK'
      }
    ]
  },
  getters: {
    all(state){
      return state.items;
    },
    get: (state, getters) => (name) => {
      return state.items.find(one => one.route === name);
    }
  },
  mutations: {

  },
  actions: {

  }
};