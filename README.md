Системные требования:
   NodeJS вер. 18.15.0 или новее
   база данных MySQL

<--Настройка базы данных-->!в разработке

Настройка и запуск:
   1. скачав проект необходимо установить пакеты командой npm install находясь в директории проекта (должна появиться папка node_modules: пример команды "D:\truecode> npm install")
   2. в файле main.js в 14 строке указать ip адресс на который должны приходить запросы
   3. в файле main.js в 15 строке указать порт на который должны приходить запросы
   4. запустить приложения введя команду npm start (для выключения воспользуйтесь комбинацией клавиш ctrl+c)

Описание структуры:
   1. файл main.js -> основной файл серверной части проекта
   2. файл dataFromAPI.js -> файл с классом Model который собирает данные метрик с Yandex и Topvisor (используется в main.js и DBAddData.js)
   3. файл DBAddData.js -> файл для работы с базой данных (добавляет данные в БД) 
   4. <!устарело!> файл api.txt -> содержит запросы к API Yandex  
   5. папка view -> содержит файлы front-end (html, css, js), при get запросе на доменное имя или ip, клиенту отправляется файл index.html