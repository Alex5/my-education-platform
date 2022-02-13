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
  https://github.com/Alex5/my-education-platform/blob/a3e64e3f42f857887ed4f7621594bd55dc330650/src/fbconfig.ts#L6-L13
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
* [React 17](https://ru.reactjs.org/)
* [Redux Toolkit](https://redux-toolkit.js.org/)
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
