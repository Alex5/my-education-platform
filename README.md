# My Education Platform

Бесплатная платформа для онлайн обучения где собраны полезные материалы по разным направлениям.

## Getting Started

Ознакомиться с проектом вы можете по ссылке: [myeducationplatform.ru](https://myeducationplatform.ru/)

### Prerequisites

Для запуска проекта вам потребуется установленный node.js и yarn

### Installing

#### Без firebase

* установить все зависимости ```yarn install```
* запустить проект ```yarn start```

#### С firebase

* Создать новый проект в firebase
* Создать .env файл в корне проекта и перенести свои значения которые вам сгенерировал firebase (каких-то может не быть)
  ```
  REACT_APP_API_KEY=YOUR FIREBASE API KEY
  REACT_APP_AUTH_DOMAIN=YOUR FIREBASE AUTH DOMAIN
  REACT_APP_PROJECT_ID=YOUR FIREBASE PROJECT_ID
  REACT_APP_STORAGE_BUCKET=YOUR FIREBASE STORAGE_BUCKET
  REACT_APP_MESSAGING_SENDER_ID=YOUR FIREBASE MESSAGING_SENDER
  REACT_APP_APP_ID=YOUR FIREBASE APP_ID
  REACT_APP_MEASUREMENT_ID=YOUR FIREBASE MEASUREMENT_ID
  ```
* установить все зависимости ```yarn install```
* запустить проект ```yarn start```

> Для работы комментариев используется YouTube API, вам нужно добавить ваш API-KEY в .env файл
```
REACT_APP_YOUTUBE_API_KEY=YOUR YOUTUBE_API_KEY
```
## Running the tests

Тесты появятся позже...

## Deployment

Если вы настроили свой проект firebase ознакомтесь с документацией по развёртывание проекта: [Firebase hosting quickstart](https://firebase.google.com/docs/hosting/quickstart/)

## Built With
* [React 18](https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html)
* [Redux Toolkit](https://redux-toolkit.js.org/) (Не используется с версии 1.1.0, вместо него [Recoil](https://recoiljs.org/))
* [React Router 6](https://reactrouter.com/)
* [Styled Components](https://styled-components.com/)
* [Geist UI (как UI фреймворк)](https://geist-ui.dev/en-us)
* [Firebase](https://firebase.google.com/)
* [React Markdown для статей](https://github.com/remarkjs/react-markdown/)

## Contributing

Пожалуйста прочтите [CONTRIBUTING.md](https://github.com/Alex5/my-education-platform/blob/master/CONTRIBUTING.md) для получения подробной информации о нашем кодексе поведения и процессе отправки нам pull запросов.

## Versioning

Мы используем [SemVer](http://semver.org/) для управления версиями. Доступные версии см. в [тегах в этом репозитории](https://github.com/Alex5/my-education-platform/tags).

## Authors

* **Ilin Aleksei** - *Автор проекта* - [Alex5](https://github.com/Alex5)

## License

Этот проект находится под лицензией MIT — подробности см. в файле [LICENSE](https://github.com/Alex5/my-education-platform/blob/master/LICENSE)
