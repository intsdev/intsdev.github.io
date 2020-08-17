import axios from "axios";

export default {
  namespaced: true,
  state: {
    items: [
      {
        route: "scanchange",
        title: "ScanChange - мониторинг обменников"
      },
      {
        route: "jpbooks",
        title: "Интернет магазин JPBooks"
      },
      {
        route: "hamiltonhouse",
        title: "«Hamilton House Publishers»"
      },
      {
        route: "autotras",
        title: "МФА сайт об автомобилях - Autotras"
      },
      {
        route: "bot-for-vk",
        title: "Bot для VK"
      }
    ]
  },
  getters: {
    all(state) {
      return state.items;
    },
    get: (state, getters) => route => {
      return state.items.find(one => one.route === route);
    }
  },
  actions: {
    loadProject(store, data) {
      return new Promise((resolve, reject) => {
        let project = store.getters.get(data.name);

        if (project) {
          axios
            .get(`/src/assets/projects/${project.route}.md`)
            .then(response => {
              resolve(response);
            })
            .catch(function(error) {
              reject(error);
            });
        } else {
          reject("project not found");
        }
      });
    }
  }
};
