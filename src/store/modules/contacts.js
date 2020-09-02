import * as server from "@/server";

export default {
  namespaced: true,
  state: {
    sendingStatus: "init", // init | pending | done
    formInfo: [
      {
        name: "Имя",
        key: "name",
        value: "",
        pattern: /^[a-zA-Zа-яА-Я ]{2,30}$/,
      },
      {
        name: "Email",
        key: "email",
        value: "",
        pattern: /.+/,
      },
      {
        name: "Сообщение",
        key: "message",
        value: "",
        pattern: /.+/,
        type: "textarea",
      },
    ],
  },
  getters: {
    getFormInfo(state) {
      return state.formInfo;
    },
    canSend(state) {
      return state.formInfo.some((item) => item.pattern.test(item.value));
    },
    isSending(state) {
      return state.sendingStatus === "pending";
    },
    isDone(state) {
      return state.sendingStatus === "done";
    },
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
      state.formInfo.forEach((one) => {
        one.value = "";
      });
    },
  },
  actions: {
    async send(store) {
      if (store.getters.canSend) {
        store.commit("setStatus", "pending");

        const info = store.getters.getFormInfo;

        const strArray = info.map((item) => `${item.key}: ${item.value}`);
        strArray.unshift("Portfolio (contacts):");
        const data = strArray.join("\r\n");

        await server.send(data);
        store.commit("setStatus", "done");
      }
    },
  },
};
