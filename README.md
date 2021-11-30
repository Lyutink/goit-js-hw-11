# goit-js-hw-11

Проект собран с помощью parcel-project-template. Для HTTP запросов использована библиотека axios.
Используется синтаксис async/await. Для уведомлений использована библиотека notiflix.

Фронтенд часть приложения поиска и просмотра изображений по ключевому слову. Пользователь будет
вводить строку для поиска в текстовое поле, а при сабмите формы выполняется HTTP-запрос. В качестве
бэкенда используется публичный API сервиса Pixabay. (Зарегистрироватся, получить свой уникальный
ключ доступа.)

Список параметров строки запроса которые обязательно необходимо указать: key - уникальный ключ
доступа к API. q - термин для поиска. То, что будет вводить пользователь. image_type - тип
изображения. Использую только фотографии, поэтому задаю значение photo. orientation - ориентация
фотографии, значение horizontal. safesearch - фильтр по возрасту, значение true. В ответе будет
массив изображений удовлетворивших критериям параметров запроса. Каждое изображение описывается
объектом, из которого интересны только следующие свойства: webformatURL - ссылка на маленькое
изображение для списка карточек. largeImageURL - ссылка на большое изображение. tags - строка с
описанием изображения. Подойдет для атрибута alt. likes - количество лайков. views - количество
просмотров. comments - количество комментариев. downloads - количество загрузок. Если бэкенд
возвращает пустой массив, значит ничего подходящего найдено небыло. В таком случае показываю
уведомление с текстом "Sorry, there are no images matching your search query. Please try again.".
Для уведомлений использую библиотеку notiflix.

Элемент div.gallery изначально есть в HTML документе,в него рендерю разметку карточек изображений.
При поиске по новому ключевому слову полностью очищаю содержимое галереи, чтобы не смешивать
результаты.

Пагинация Pixabay API поддерживает пагинацию и предоставляет параметры page и per_page. Делаю чтобы
в каждом ответе приходило 40 объектов (по умолчанию 20). Изначально значение параметра page
устанавливаю 1. При каждом последующем запросе, увеличиваю на 1. При поиске по новому ключевому
слову значение page возвращаю в исходное, так как будет пагинация по новой коллекции изображений.

В HTML документе уже есть разметка кнопки при клике по которой выполняется запрос за следующей
группой изображений и добавляется разметка к уже существующим элементам галереи.
<button type="button" class="load-more">Load more</button> Изначально кнопка скрыта. После первого
запроса кнопка появляется в интерфейсе под галереей. При повторном сабмите формы кнопка сначала
прячется, а после запроса опять отображается. В ответе бэкенд возвращает свойство totalHits - общее
количество изображений которые подошли под критерий поиска (для бесплатного аккаунта). Если
пользователь дошел до конца коллекции, прячу кнопку и вывожу уведомление с текстом "We're sorry, but
you've reached the end of search results.".

После первого запроса при каждом новом поиске выводить уведомление в котором будет написано сколько
всего нашли изображений (свойство totalHits). Текст уведомления "Hooray! We found totalHits images."

Библиотекой SimpleLightbox добавляю отображение большой версии изображения для полноценной галереи.

В разметке необходимо обернуть каждую карточку изображения в ссылку, как указано в документации. У
библиотеки есть метод refresh() который вызывается каждый раз после добавления новой группы карточек
изображений. Для того чтобы подключить CSS код библиотеки в проект, необходимо добавить еще один
импорт, кроме того который описан в документации. // Описан в документации import SimpleLightbox
from 'simplelightbox'; // Дополнительный импорт стилей import
'simplelightbox/dist/simple-lightbox.min.css';
