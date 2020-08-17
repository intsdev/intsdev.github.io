<template>
  <div class="window-terminal" ref="chatBody" @scroll="onScroll">
    <div class="pre">
      <div class="comment"><span>#</span> Welcome:</div>

      <template v-for="task, ind in print">

        <transition appear name="chat" @after-enter="nextStep" :duration="200" enter-active-class="animated fadeIn">
          <div v-if="task.link" class="link">
            <router-link v-if="task.router" :to="task.to">{{ task.text }}</router-link>
            <a v-else :href="task.href">{{ task.text }}</a>
          </div>
        </transition>

        <!-- Message -->
        <div v-if="task.message" class="prompt">
          <span><icon name="angle-right"/></span>
          <span class="command"><vue-typer :text='task.text' :repeat='0' :type-delay='typeDelay' @completed="nextStep"></vue-typer></span>
        </div>

        <!-- Action -->
        <transition appear name="chat" enter-active-class="animated fadeIn">
          <div v-if="task.action" class="mt-2">
            <span class="icon-dollar"><icon name="dollar-sign" :scale="0.9"/></span>
            <button v-for="btn in task.buttons" @click="onAction(ind, btn.answer || btn.text, btn.next)"
                    type="button" class="btn btn-outline-light btn-sm mr-2">{{ btn.text }}</button>
          </div>
        </transition>

        <!-- Answer -->
        <div v-if="task.answer" class="answer"><span><icon name="angle-double-right"/></span> {{ task.text }}</div>

        <!-- Form -->
        <transition appear name="chat" enter-active-class="animated fadeIn">
          <form v-if="task.form" @submit.prevent="onForm(ind, task.button.next)" class="mt-2">
            <span class="icon-dollar"><icon name="dollar-sign" :scale="0.9"/></span>
            <input type="text" :placeholder="task.placeholder" v-model="task.result">
            <button type="submit" class="btn btn-outline-light btn-sm">{{ task.button.text }}</button>
          </form>
        </transition>

        <!-- <div class="prompt" v-if="task.inputName">$ <span class="pulse">_</span></div> -->

      </template>
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
  import { VueTyper } from 'vue-typer'
  import Icon from 'vue-awesome/components/Icon';
  import Vue from 'vue';
  import db from ':src/firebase'

  import 'vue-awesome/icons/angle-double-right';
  import 'vue-awesome/icons/angle-right';
  import 'vue-awesome/icons/dollar-sign';

  import steps from './steps.js';

  export default {
    components: { VueTyper, Icon },
    data() {
      return {
        typeDelay: 25,
        scrolled: false,
        form: [],
        steps: steps,
        printStack: [],
        print: []
      }
    },
    methods: {
      nextStep() {
        if(this.printStack.length) {
          let task = this.printStack.shift();

          if(task.next) {
            return this.pushTask(task.next);
          }

          if(task.exec) {
            return this[task.exec]();
          }

          this.print.push(task);
        }
      },
      pushTask(next) {
        // this.printStack = this.steps[next].slice();
        this.printStack = this.steps[next].map((taskObj) => Vue.util.extend({}, taskObj));
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

        if(!valid.res && valid.next) {
          nextStep = valid.next;
        } else if(!valid.res) {
          return;
        }

        if(valid.res) {
          this.form.push({ key: form.input.name, value: form.result });
        }

        this.pushAnswer(form.result);

        if(nextStep) {
          this.pushTask(nextStep);
        }

        this.print.splice(ind, 1);
      },
      /* мб перенести в стор */
      sendForm() {

        let data = {};

        this.form.forEach((el) => {
          data[el.key] = el.value;
        })

        db.collection("chat").add(data)
          .then((docRef) => {
            if(docRef.id){
              this.pushTask('contactSuccess');
            } else {
              this.pushTask('contactFail');
            }
          })
          .catch((error) => {
            this.pushTask('contactFail');
          });

        // this.nextStep(); // если не делаем push, надо сделать next
      },

      onScroll() {
        let body = this.$refs.chatBody;
        this.scrolled = body.scrollTop + body.clientHeight < body.scrollHeight - 50;
      },
    },
    mounted() {
      console.log('app terminal mounted');
      this.pushTask('init');

      let chatBody = this.$refs.chatBody;
      setInterval(() => {
        if(!this.scrolled){
          chatBody.scrollTo(0, chatBody.scrollHeight);
        }
      }, 100);

    }
  }
</script>

<style>
  /* Base */
  .vue-typer .custom.char {
    color: #1fe01c;
  }
  .vue-typer .custom.char.selected {
    background-color: #264F78;
  }
  .vue-typer .custom.caret {
    width: 10px;
    background-color: #fff;
  }
</style>


<style scoped>
  input:focus,
  select:focus,
  textarea:focus,
  button:focus {
    outline: none;
  }

  input {
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
  .link a {
    color: #3f9bff;
  }
  .link a:hover {
    color: #3f9bff;
  }




  .window-terminal {
    min-height: 100px;
    max-height: 400px;
    background: #232323;
    padding: 18px;
    overflow: auto;
  }
  .window-terminal .pre {
    font-size: 87.5%;
    font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    margin: 0;
    color: #d0e4f9;
    display: block;
  }
  .window-terminal .pulse {
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
  .window-terminal .command {
    color: #32c146;
  }
  .window-terminal .comment {
    opacity: 0.5;
  }
  .window-terminal .answer {
    color: #5ffdff;
  }

  /* < 992px */
  @media (max-width: 992px) {
    .window-terminal .btn, .window-terminal input {
      width: 100%;
      margin-bottom: 5px;
    }
    .window-terminal .icon-dollar {
      display: none;
    }
  }


</style>