<!-- some else terminal - https://codepen.io/3astard/pen/WrezQV -->
<template>
  <div>
    <div class="window-contacts">
      <contacts></contacts>
    </div>

    <div class="window mt-5" v-show="!chatHide">
      <div class="bar">
        <div class="window-nav">
          <div class="nav-close" @click="onHideChat">
            <span>
              <icon name="times" width="8" />
            </span>
          </div>
          <div class="nav-hide" @click="onHideChat">
            <span>
              <icon name="minus" width="8" />
            </span>
          </div>
          <div class="nav-fullscreen">
            <span>
              <icon name="sort" width="8" />
            </span>
          </div>
        </div>
        <!-- <div class="window-btn" @click="onHideChat"></div> -->
      </div>
      <div class="body" ref="chatBody" @scroll="onScroll">
        <div class="pre">
          <div class="comment">
            <span>#</span> Welcome:
          </div>

          <template v-for="(task, ind) in print">
            <!-- Links: router or href -->
            <!--
              <div v-if="task.link" class="link">
                <router-link v-if="task.router" :to="task.to">
                  <vue-typer :text='task.text' :repeat='0' :type-delay='typeDelay' @completed="nextStep"></vue-typer>
                </router-link>
                <a v-else :href="task.href">
                  <vue-typer :text='task.text' :repeat='0' :type-delay='typeDelay' @completed="nextStep"></vue-typer>
                </a>
              </div>
            -->

            <transition
              appear
              name="chat"
              @after-enter="nextStep"
              :duration="200"
              enter-active-class="animated fadeIn"
              :key="ind"
            >
              <div v-if="task.link" class="link">
                <router-link v-if="task.router" :to="task.to">{{ task.text }}</router-link>
                <a v-else :href="task.href">{{ task.text }}</a>
              </div>
            </transition>

            <!-- Message -->
            <div v-if="task.message" class="prompt" :key="`msg-${ind}`">
              <span>
                <icon name="angle-right" />
              </span>
              <span class="command">
                <vue-typer
                  :text="task.text"
                  :repeat="0"
                  :type-delay="typeDelay"
                  @completed="nextStep"
                ></vue-typer>
              </span>
            </div>

            <!-- Action -->
            <transition
              appear
              name="chat"
              enter-active-class="animated fadeIn"
              :key="`action-${ind}`"
            >
              <div v-if="task.action" class="mt-2">
                <span class="icon-dollar">
                  <icon name="dollar-sign" :scale="0.9" />
                </span>
                <button
                  v-for="(btn, i) in task.buttons"
                  @click="onAction(ind, btn.answer || btn.text, btn.next);"
                  type="button"
                  class="btn btn-outline-light btn-sm mr-2"
                  :key="i"
                >{{ btn.text }}</button>
              </div>
            </transition>

            <!-- Answer -->
            <div v-if="task.answer" class="answer" :key="`answer-${ind}`">
              <span>
                <icon name="angle-double-right" />
              </span>
              {{ task.text }}
            </div>

            <!-- Form -->
            <transition
              appear
              name="chat"
              enter-active-class="animated fadeIn"
              :key="`form-${ind}`"
            >
              <form v-if="task.form" @submit.prevent="onForm(ind, task.button.next);" class="mt-2">
                <span class="icon-dollar">
                  <icon name="dollar-sign" :scale="0.9" />
                </span>
                <input type="text" :placeholder="task.placeholder" v-model="task.result" />
                <button type="submit" class="btn btn-outline-light btn-sm">{{ task.button.text }}</button>
              </form>
            </transition>

            <!--
              <div class="prompt" v-if="task.inputName">$ <span class="pulse">_</span></div>
            -->
          </template>
        </div>
      </div>
    </div>
    <div v-show="chatHide" class="app-hide">
      <div @click="onShowChat" class="terminal-icon">
        <img src="/chat/terminal.png" alt />
      </div>
      <div @click="onShowChat" class="terminal-icon">
        <img src="/chat/phone.png" alt />
      </div>
      <div @click="onShowChat" class="terminal-icon">
        <img src="/chat/book.png" alt />
      </div>
    </div>
  </div>
</template>

<script>
/*
    Comment
    Message - message (Say)
    Action - buttons
    Form   - input + btn
  */
import { VueTyper } from "vue-typer";
import Icon from "vue-awesome/components/Icon";
import Vue from "vue";
import db from "@/firebase";

import Contacts from "./../Contacts";

import "vue-awesome/icons/angle-double-right";
import "vue-awesome/icons/angle-right";
import "vue-awesome/icons/dollar-sign";

import "vue-awesome/icons/times";
import "vue-awesome/icons/minus";
import "vue-awesome/icons/sort";

export default {
  components: { VueTyper, Icon, Contacts },
  data() {
    return {
      typeDelay: 25,
      scrolled: false,
      chatHide: false,
      form: [],
      steps: {
        init: [
          { message: true, text: "Привет! Меня зовут Александр!" },
          {
            message: true,
            text: "Хотите узнать больше или связаться со мной?",
          },
          {
            action: true,
            buttons: [
              {
                text: "Узнать больше!",
                answer: "Я хочу узнать больше!",
                next: "more",
              },
              {
                text: "Связаться!",
                answer: "Я хочу связаться!",
                next: "contactName",
              },
            ],
          },
        ],
        contactName: [
          { message: true, text: "Хорошо! Как вас зовут?" },
          {
            form: "contactName",
            // validate: ['no-empty', 'email'],
            validate: function () {
              return { res: this.result.trim() != "" };
            },
            result: "", // возможно перенести в инпут. Подумать над несколькими инпутами в форме
            input: { placeholder: "Введите имя", name: "name" },
            button: { text: "Отправить", next: "contactEmail" },
          },
        ],
        contactEmail: [
          {
            message: true,
            text:
              "Я заинтригован! Спасибо! Мне просто нужна ваша электронная почта, чтобы я мог связаться с вами!",
          },
          { exec: () => this.pushTask("emailForm") },
        ],
        emailForm: [
          {
            form: "contactEmail",
            validate: function () {
              // empty
              if (this.result.trim() == "") {
                return { res: false };
              }

              // not email
              if (/(.+)@(.+){2,}\.(.+){2,}/.test(this.result)) {
                return { res: true };
              } else {
                return { res: false, next: "incorrectEmail" };
              }
            },
            result: "",
            input: { placeholder: "Введите email", name: "email" },
            button: { text: "Отправить", next: "contactFinal" },
          },
        ],
        contactFinal: [{ exec: this.sendForm }], // мб добавить nextSucess и nextFail
        contactSuccess: [
          {
            message: true,
            text:
              "Спасибо за интерес ко мне! Я свяжусь с вами как можно скорее! :)",
          },
          { message: true, text: "Good luck!" },
        ],
        contactFail: [
          { message: true, text: "Похоже вы не подключены к интернету." },
          {
            message: true,
            text:
              "Или по какой-то другой причине я не могу отправить информацию. :(",
          },
          {
            message: true,
            text:
              "Перезагрузите страницу или воспользуйтесь, пожалуйста, формой обратной связи:",
          },
          {
            link: true,
            router: true,
            to: { name: "contacts" },
            text: "Формой обратной связи",
          },
        ],
        incorrectEmail: [
          {
            message: true,
            text:
              "Ваш email адрес напоминает мне о poop emoji. Что-то здесь не так... 💩",
          },
          { message: true, text: "Может попробуем еще раз? ;)" },
          {
            action: true,
            buttons: [
              { text: "Да, давай еще раз!", next: "emailForm" },
              { text: "Нет!", next: "byeBadEmail" },
            ],
          },
        ],
        byeBadEmail: [
          {
            message: true,
            text:
              "Это круто. Я полностью понимаю это. Иногда поделиться адресом электронной почты может быть сложной задачей.",
          },
          {
            message: true,
            text:
              "К сожалению, я должен сейчас бежать. Обязательно возвращайтесь, и у нас будет еще один чат! :)",
          },
          { message: true, text: "До скорой встречи! 👍🤗" },
        ],
        more: [
          { message: true, text: "Я чувствую себя воодушевленным. 🙂" },
          {
            message: true,
            text:
              "Я пишу и говорю о разработке, и мне повезло, что я работал и работаю над крутыми проектами.",
          },
          {
            action: true,
            buttons: [
              { text: "Ты пишешь?!", next: "contactWrite" },
              { text: "Какими проектами?", next: "whatProjects" },
            ],
          },
        ],
        whatProjects: [
          {
            message: true,
            text:
              "Вот некоторые из проектов, над которыми я работал. Как разработка с нуля всего проекта, так и частичное наращивание функционала. 🙂",
          },
          // мб сделать text массивом, где каждый элемент это срока. Надо подумать над последовательностью тогда.
          // мб проще сделать еще task - line - печатать без значка вначале. Или добавить тип message. { message: true, type: 'line' }
          // { message: true, text: `- ScanChange - мониторинг обменников\r\n  - Интернет магазин JPBooks\r\n  - Hamilton House Publishers\r\n  - Bot для VK` },

          {
            link: true,
            router: true,
            to: { name: "project", params: { name: "scanchange" } },
            text: "+ ScanChange - мониторинг обменников",
          },
          {
            link: true,
            router: true,
            to: { name: "project", params: { name: "jpbooks" } },
            text: "  - Интернет магазин JPBooks",
          },
          {
            link: true,
            router: true,
            to: { name: "project", params: { name: "hamiltonhouse" } },
            text: "  - Hamilton House Publishers",
          },
          {
            link: true,
            router: true,
            to: { name: "project", params: { name: "bot-for-vk" } },
            text: "  - Bot для VK",
          },

          {
            action: true,
            buttons: [
              { text: "Здорово. Что конкретно ты делал?", next: "coffeeTalk" },
            ],
          },

          /*Вот некоторые из компаний, с которыми я работал, как в iA, так и в качестве независимого фрилансера.
            projects list

            btn - Здорово. Что ты для них сделал?

            Я рад поговорить об этом за кофе. Как вы думаете?
            btn - Cool! ☕️ (email)   Nah... 😑 (end)

            if cool:
              Great! Nothing beats UX and coffee!
              What specifically did you want to discuss?
              form: input

            // I'm intrigued! Thanks! I just need your email so I can get back to you!

            if email:
              That's one beautiful email address! I'll get back to you as soon as possible.
              Meanwhile, you can check my website or go to Google.com and try pressing the "I feel lucky" button. It might be your lucky day!
              Talk to you soon! Get ready to be scrolled! 🏃💨*/
        ],
        coffeeTalk: [
          {
            message: true,
            text:
              "Я буду рад поговорить об этом за чашечкой кофе. Как вы на это смотрите?",
          },
          {
            action: true,
            buttons: [
              { text: "Отлично! ☕️", next: "contactEmail" },
              { text: "Нее... 😑", next: "test" },
            ],
          },
        ],
        // You write?!
        contactWrite: [
          {
            message: true,
            text:
              "Да! Я твердо верю, что письмо помогает мне стать лучшим разработчиком и структурировать свои знания. Вы можете ознакомиться с некоторыми из моих статей! 👓",
          },
          {
            message: true,
            text: `- Веб-скрейпинг - суть и подходы к реализации\r\n  - Обучение разработке\r\n  - Работа над личными проектами`,
          }, // mb promptLinks
        ],

        letsTalk: [
          // Great! I'm looking forward to it!
          // Let me know what's on your mind and I'll get back to you asap!
          // Отлично/Конечно! Я с нетерпением жду этого!
          // Дайте мне знать, что у вас на уме, и я свяжусь с вами как можно скорее!
          // if long msg -> Let's keep it casual... no need for long messages. :)
          // after message:
          // I'm intrigued! Thanks! I just need your email so I can get back to you!
        ],
        test: [{ message: true, text: "На нет и суда нет :)" }],

        // Если долго остаемся на сайте, мб переключались между страницами/вкладками
        // Bonjour mon ami!
        // Still want to know more or just get in touch now?
      },
      printStack: [],
      print: [],
    };
  },
  methods: {
    nextStep() {
      if (this.printStack.length) {
        let task = this.printStack.shift();

        if (task.exec) {
          return task.exec();
        }

        this.print.push(task);
      }
    },
    pushTask(next) {
      // this.printStack = this.steps[next].slice();
      this.printStack = this.steps[next].map((taskObj) =>
        Vue.util.extend({}, taskObj)
      );
      this.nextStep();
    },
    pushAnswer(text) {
      this.print.push({ answer: true, text: text });
    },

    onAction(ind, answer, nextStep) {
      this.print.splice(ind, 1);
      this.pushAnswer(answer);
      this.pushTask(nextStep);
    },

    onForm(ind, nextStep) {
      let form = this.print[ind];
      let valid = form.validate();

      // Если в валидации переопределяем nextStep
      /*if(!valid.res && valid.next) {
          nextStep = valid.next;
        }

        if(!valid.res && !valid.next) {
          return;
        }*/

      if (!valid.res && valid.next) {
        nextStep = valid.next;
      } else if (!valid.res) {
        return;
      }

      if (valid.res) {
        this.form.push({ key: form.input.name, value: form.result });
      }

      this.pushAnswer(form.result);

      if (nextStep) {
        this.pushTask(nextStep);
      }

      this.print.splice(ind, 1);
    },
    /* мб перенести в стор */
    sendForm() {
      let data = {};

      this.form.forEach((el) => {
        data[el.key] = el.value;
      });

      db.collection("chat")
        .add(data)
        .then((docRef) => {
          if (docRef.id) {
            this.pushTask("contactSuccess");
          } else {
            this.pushTask("contactFail");
          }
        })
        .catch((error) => {
          this.pushTask("contactFail");
        });

      // this.nextStep(); // если не делаем push, надо сделать next
    },

    onScroll() {
      let body = this.$refs.chatBody;
      this.scrolled =
        body.scrollTop + body.clientHeight < body.scrollHeight - 50;
    },

    onHideChat() {
      this.chatHide = !this.chatHide;
    },
    onShowChat() {
      this.chatHide = !this.chatHide;

      // this.printStack = [];
      // this.print = [];
      // this.pushTask('init');
    },
  },
  mounted() {
    this.pushTask("init");

    /*let chatBody = this.$refs.chatBody;
      setInterval(() => {
        if(!this.scrolled){
          chatBody.scrollTo(0, chatBody.scrollHeight);
        }
      }, 100);*/
  },
};
</script>

<style>
/* Base */
.vue-typer .custom.char {
  color: #1fe01c;
}
.vue-typer .custom.char.selected {
  background-color: #264f78;
}
.vue-typer .custom.caret {
  width: 10px;
  background-color: #fff;
}

input:focus,
select:focus,
textarea:focus,
button:focus {
  outline: none;
}

.window input {
  display: inline-block;
  background-clip: padding-box;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  height: calc(1.8125rem + 2px);
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
  border-radius: 0.2rem;

  background: #ffffff17;
  color: #fff;
  caret-color: #fff;
  border: 1px solid #c4d7ec;
}

/* link for typer */
/*.window .link .vue-typer .custom.char {
    color: #3f9bff;
  }*/
/* link */
.window .link a {
  color: #3f9bff;
}
.window .link a:hover {
  color: #3f9bff;
}

/* terminal */
.window {
  margin: 0 auto 2rem;
  box-shadow: 0 0.25rem 0.5rem #12181e;
  border-radius: 0.5rem 0.5rem 0 0;
}

.window .bar {
  background: #191919;
  height: 36px;
  border-radius: 0.5rem 0.5rem 0 0;
}

/*.window .window-btn, .window .window-btn::before, .window .window-btn::after {
    width: 12px;
    height: 12px;
    border-radius: 100%;
    display: block;
  }

  .window .window-btn {
    background: #f6b73e;
    position: relative;
    margin-left: 38px;
    top: 12px;
  }
  .window .window-btn::before, .window .window-btn::after {
    content: " ";
    position: absolute;
  }
  .window .window-btn::before {
    background: #f55551;
    margin-left: -20px;
  }
  .window .window-btn::after {
    background: #32c146;
    margin-left: 20px;
  }*/

.window .window-nav {
  padding-top: 8px;
  padding-left: 12px;
  cursor: default;
}
.window .window-nav:hover div span {
  visibility: visible;
}

.window .window-nav div {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  opacity: 1;
  display: inline-block;
  margin-right: 4px;
  text-align: center;
}
.window .window-nav .nav-close {
  background-color: #f55551;
}

.window .window-nav .nav-hide {
  background-color: #f6b73e;
}
.window .window-nav .nav-fullscreen {
  background-color: #32c146;
}
.window .window-nav div span {
  font-size: 10px;
  position: relative;
  top: -7px;
  visibility: hidden;
}
.window .window-nav .nav-fullscreen span svg {
  top: -8px;
  transform: rotate(45deg);
}

.window .body {
  min-height: 100px;
  max-height: 400px;
  background: #232323;
  padding: 18px;
  overflow: auto;
}
.window .body .pre {
  font-size: 87.5%;
  font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
    "Courier New", monospace;
  margin: 0;
  color: #d0e4f9;
  display: block;
}
.window .body .pulse {
  -webkit-animation: pulse 1s ease-in-out infinite;
  -moz-animation: pulse 1s ease-in-out infinite;
  animation: pulse 1s ease-in-out infinite;
}

@-webkit-keyframes pulse {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@-moz-keyframes pulse {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes pulse {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.window .command {
  color: #32c146;
}
.window .comment {
  opacity: 0.5;
}
.window .answer {
  color: #5ffdff;
}

/* terminal minimize */
.app-hide {
  margin-top: 3rem !important;
}
.terminal-icon {
  width: 75px;
  cursor: pointer;
  display: inline-block;
  transition: all 0.1s ease-in-out;
}
.terminal-icon img {
  width: 100%;
}
.terminal-icon:hover {
  transform: scale(1.05);
}

/* window contacts */
.window-contacts {
  border: 1px solid #eee;
  padding: 10px 30px;
}

/* < 992px */
@media (max-width: 992px) {
  .window .btn,
  .window input {
    width: 100%;
    margin-bottom: 5px;
  }
  .window .icon-dollar {
    display: none;
  }
}
</style>
