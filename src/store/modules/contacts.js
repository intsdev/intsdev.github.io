import db from ":src/firebase";

export default {
  namespaced: true,
  state: {
    sendingStatus: "init", // init | pending | done
    formInfo: [
      {
        name: "Имя",
        key: "name",
        value: "",
        pattern: /^[a-zA-Zа-яА-Я ]{2,30}$/
      },
      {
        name: "Email",
        key: "email",
        value: "",
        pattern: /.+/
      },
      {
        name: "Сообщение",
        key: "message",
        value: "",
        pattern: /.+/,
        type: "textarea"
      }
    ]
  },
  getters: {
    getFormInfo(state, getters) {
      return state.formInfo;
    },
    canSend(state, getters) {
      return state.formInfo.some(item => {
        return item.pattern.test(item.value);
      });
    },
    isSending(state, getters) {
      return state.sendingStatus === "pending";
    },
    isDone(state, getters) {
      return state.sendingStatus === "done";
    }
  },
  mutations: {
    updateFormInfo(state, data) {
      state.formInfo[data.i].value = data.value;
    },
    setStatus(state, status) {
      state.sendingStatus = status;
    },
    clearForm(state) {
      state.sendingStatus = "init";
      state.formInfo.forEach(one => {
        one.value = "";
      });
    }
  },
  actions: {
    send(store) {
      return new Promise((resolve, reject) => {
        if (store.getters.canSend) {
          store.commit("setStatus", "pending");

          let info = store.getters.getFormInfo;
          let data = {};

          info.forEach(item => {
            data[item.key] = item.value;
          });

          db.collection("messages")
            .add(data)
            .then(function(docRef) {
              if (docRef.id) {
                store.commit("setStatus", "done");
                resolve();
              }
            })
            .catch(function(error) {
              console.error("Error adding document: ", error);
              reject(error);
            });
        } else {
          reject();
        }
      });
    }
  }
};
