export default {
  init: [
    { message: true, text: 'Привет! Меня зовут Александр!' },
    { message: true, text: 'Хотите узнать больше или связаться со мной?' },
    {
      action: true,
      buttons: [
        { text: 'Узнать больше!', answer: 'Я хочу узнать больше!', next: 'more' },
        { text: 'Связаться!', answer: 'Я хочу связаться!', next: 'contactName' }
      ]
    },
  ],
  contactName: [
    { message: true, text: 'Хорошо! Как вас зовут?' },
    {
      form: 'contactName',
      // validate: ['no-empty', 'email'],
      validate: function () {
        return { res: this.result.trim() != '' }
      },
      result: '', // возможно перенести в инпут. Подумать над несколькими инпутами в форме
      input: { placeholder: 'Введите имя', name: 'name' },
      button: { text: 'Отправить', next: 'contactEmail' }
    },
  ],
  contactEmail: [
    // «Я заинтригован» - фраза смущает, не знаю почему) - Илья
    { message: true, text: 'Отлично! Мне просто нужна ваша электронная почта, чтобы я мог связаться с вами!' },
    { next: 'emailForm' },
    // { exec: () => this.pushTask('emailForm') },
  ],
  emailForm: [
    {
      form: 'contactEmail',
      validate: function () {
        // empty
        if (this.result.trim() == '') { return { res: false } }

        // not email
        if (/(.+)@(.+){2,}\.(.+){2,}/.test(this.result)) {
          return { res: true }
        } else {
          return { res: false, next: 'incorrectEmail' }
        }
      },
      result: '',
      input: { placeholder: 'Введите email', name: 'email' },
      button: { text: 'Отправить', next: 'contactFinal' }
    }
  ],
  contactFinal: [{ exec: 'sendForm' }], // мб добавить nextSucess и nextFail
  contactSuccess: [
    { message: true, text: 'Спасибо за интерес ко мне! Я свяжусь с вами как можно скорее! :)' },
    { message: true, text: 'Good luck!' }
  ],
  contactFail: [
    { message: true, text: 'Похоже вы не подключены к интернету.' },
    { message: true, text: 'Или по какой-то другой причине я не могу отправить информацию. :(' },
    { message: true, text: 'Перезагрузите страницу или воспользуйтесь, пожалуйста, формой обратной связи:' },
    {
      link: true,
      router: true,
      to: { name: 'contacts' },
      text: 'Формой обратной связи'
    },
  ],
  incorrectEmail: [
    { message: true, text: 'Хмм.. что-то не так с Вашим email адресом. На такие адреса письма не доставляются 🙂' },
    { message: true, text: 'Может попробуем еще раз? ;)' },
    {
      action: true,
      buttons: [
        { text: 'Да, давай еще раз!', next: 'emailForm' },
        { text: 'Нет!', next: 'byeBadEmail' }
      ]
    },
  ],
  byeBadEmail: [
    { message: true, text: 'Это круто. Я полностью понимаю это. Иногда поделиться адресом электронной почты может быть сложной задачей.' },
    { message: true, text: 'К сожалению, я должен сейчас бежать. Обязательно возвращайтесь, и у нас будет еще один чат! :)' },
    { message: true, text: 'До скорой встречи! 👍🤗' },
  ],
  more: [
    { message: true, text: 'Отлично, рад слышать о Вашей заинтересованности. 🙂' },
    { message: true, text: 'Я пишу и говорю о разработке, и мне повезло, что я работал и работаю над крутыми проектами.' },
    {
      action: true,
      buttons: [
        { text: 'Ты пишешь?!', next: 'contactWrite' },
        { text: 'Какими проектами?', next: 'whatProjects' }
      ]
    },
  ],
  whatProjects: [
    { message: true, text: 'Вот некоторые из проектов, над которыми я работал. Как разработка с нуля всего проекта, так и частичное наращивание функционала. 🙂' },
    // мб сделать text массивом, где каждый элемент это срока. Надо подумать над последовательностью тогда.
    // мб проще сделать еще task - line - печатать без значка вначале. Или добавить тип message. { message: true, type: 'line' }
    // { message: true, text: `- ScanChange - мониторинг обменников\r\n  - Интернет магазин JPBooks\r\n  - Hamilton House Publishers\r\n  - Bot для VK` },

    {
      link: true,
      router: true,
      to: { name: "project", params: { name: "quizcast" } },
      text: "- Quizcast - мобильное приложение"
    },
    {
      link: true,
      router: true,
      to: { name: "project", params: { name: "evolventalux" } },
      text: "- Evolventalux - агентство недвижимости"
    },
    {
      link: true,
      router: true,
      to: { name: 'project', params: { name: 'scanchange' } },
      text: '- ScanChange - мониторинг обменников'
    },
    {
      link: true,
      router: true,
      to: { name: 'project', params: { name: 'jpbooks' } },
      text: '  - Интернет магазин JPBooks'
    },
    {
      link: true,
      router: true,
      to: { name: 'project', params: { name: 'hamiltonhouse' } },
      text: '  - Hamilton House Publishers'
    },
    {
      link: true,
      router: true,
      to: { name: 'project', params: { name: 'bot-for-vk' } },
      text: '  - Bot для VK'
    },

    {
      action: true,
      buttons: [{ text: 'Здорово. Что конкретно ты делал?', next: 'coffeeTalk' }]
    }

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
    { message: true, text: 'Я буду рад поговорить об этом за чашечкой кофе. Как вы на это смотрите?' },
    {
      action: true,
      buttons: [
        { text: 'Отлично! ☕️', next: 'contactEmail' },
        { text: 'Нее... 😑', next: 'test' },
      ]
    }
  ],
  // You write?!
  contactWrite: [
    { message: true, text: 'Да! Я твердо верю, что письмо помогает мне стать лучшим разработчиком и структурировать свои знания. Вы можете ознакомиться с некоторыми из моих статей! 👓' },
    { message: true, text: `- Веб-скрейпинг - суть и подходы к реализации\r\n  - Обучение разработке\r\n  - Работа над личными проектами` } // mb promptLinks
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
  test: [
    { message: true, text: 'На нет и суда нет :)' },
  ],

  // Если долго остаемся на сайте, мб переключались между страницами/вкладками
  // Bonjour mon ami!
  // Still want to know more or just get in touch now?
}