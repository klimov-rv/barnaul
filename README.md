# Задача по вёрстке

1. Настройка окружения, сборка нового проекта
	1. Загрузка и настройка node.js, npm, gulp/webpack/pug
        1. должны работать команды node -v, npm -v, npm run start
	    2. Выбор подходящего начального шаблона 
        3. настройка файла сборщика ( browsersync, минификация файлов html, css, scss, js )
	2. Установка необходимых модулей и плагинов для проекта
        1. Мастхев [gulp-file-include](https://www.npmjs.com/package/gulp-file-include), [sass](https://www.npmjs.com/package/sass)  
	3. Подключение и проверка файлов скриптов, стилей, шрифтов (желательно получить от дизайнера), картинок
    4. Добавить favicon, настроить meta (Title, Description, image), seo теги, язык страницы и так далее 
    5. По желанию Js linter [eslint](https://eslint.org/), style-lint [gulp-stylelint](https://www.npmjs.com/package/gulp-stylelint)
2. Импорт вёрстки клиента, если интеграция в существующий проект
    1. вытаскиваем файлы js, css, картинок, шрифт
    2. очистка мусорного кода
    3. прогонка линтером
3. Деплой вёрстки на тестовый сервер, для демонстрации
4. Вёрстка страницы
    1. Если это первая страница - оценка сквозных элементов по всему сайту
    2. Разбор проекта на повторяющиеся и уникальные кнопки/формы
    3. Вёрстка структуры страницы - разбивка страницы на секции, внутренние элементы, задание десктоп сетки
    4. 



<!-- ```bash
npm run build
``` -->