import axios from "axios";

export default {
  namespaced: true,
  state: {
    items: [
      {
        route: "quizcast",
        title: "Quizcast - мобильное приложение",
      },
      {
        route: "evolventalux",
        title: "Evolventalux - агентство недвижимости",
      },
      {
        route: "scanchange",
        title: "ScanChange - мониторинг обменников",
      },
      {
        route: "jpbooks",
        title: "Интернет магазин JPBooks",
      },
      {
        route: "hamiltonhouse",
        title: "«Hamilton House Publishers»",
      },
      // {
      //   route: "autotras",
      //   title: "МФА сайт об автомобилях - Autotras"
      // },
      {
        route: "bot-for-vk",
        title: "Bot для vk.com",
      },
    ],
  },
  getters: {
    all(state) {
      return state.items;
    },
    get: (state) => (route) => {
      return state.items.find((one) => one.route === route);
    },
  },
  actions: {
    loadProject(store, data) {
      const project = store.getters.get(data.name);
      return axios.get(`/projects/${project.route}.md`);
    },
  },
};
