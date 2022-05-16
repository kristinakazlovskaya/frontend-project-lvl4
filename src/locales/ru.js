export default {
  translation: {
    channels: {
      title: 'Каналы',
      buttons: {
        rename: 'Переименовать',
        remove: 'Удалить',
      },
    },

    chat: {
      messages_one: '{{ count }} сообщение',
      messages_few: '{{ count }} сообщения',
      messages_many: '{{ count }} сообщений',
      placeholder: 'Введите сообщение...',
      sendButton: 'Отправить',
      label: 'Новое сообщение',
    },

    forms: {
      login: {
        header: 'Войти',
        username: {
          placeholder: 'Ваш ник',
          label: 'Ваш ник',
        },
        password: {
          placeholder: 'Пароль',
          label: 'Пароль',
        },
        submit: 'Войти',
      },

      signup: {
        username: {
          label: 'Имя пользователя',
          placeholder: 'От 3 до 20 символов',
          validation: {
            length: 'От 3 до 20 символов',
            required: 'Обязательное поле',
          },
        },
        password: {
          label: 'Пароль',
          placeholder: 'Не менее 6 символов',
          validation: {
            required: 'Обязательное поле',
            minLength: 'Не менее 6 символов',
          },
        },
        passwordConfirmation: {
          label: 'Подтвердите пароль',
          placeholder: 'Пароли должны совпадать',
          validation: {
            match: 'Пароли должны совпадать',
          },
        },
      },

      errors: {
        duplicateUser: 'Такой пользователь уже существует',
        login: 'Неверные имя пользователя или пароль',
      },
    },

    header: {
      logo: 'Hexlet Chat',
      button: 'Выйти',
    },

    login: {
      header: 'Войти',
      button: 'Войти',
      noAccount: 'Нет аккаунта?',
      signup: 'Регистрация',
    },

    signup: {
      header: 'Регистрация',
      button: 'Зарегистрироваться',
    },

    modals: {
      add: {
        header: 'Добавить канал',
        label: 'Имя канала',
      },
      rename: {
        header: 'Переименовать канал',
        label: 'Имя канала',
      },
      remove: {
        header: 'Удалить канал',
        confirm: 'Уверены?',
      },
      buttons: {
        cancel: 'Отменить',
        send: 'Отправить',
        remove: 'Удалить',
      },
      validation: {
        length: 'От 3 до 20 символов',
        required: 'Обязательное поле',
        unique: 'Должно быть уникальным',
      },
    },

    404: {
      header: 'Страница не найдена',
      text: 'Но вы можете перейти',
      link: 'на главную страницу',
    },

    toasts: {
      addChannelModal: 'Канал создан',
      renameChannelModal: 'Канал переименован',
      removeChannelModal: 'Канал удалён',
      networkError: 'Ошибка соединения',
    },
  },
};
