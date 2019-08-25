(function() {
    //Функция показа Окна редактирования изображения
    //Добавляет два обработчика на клик и esc закрытия окна
    var openImgOverlay = function() {
        uploadImgOverlay.classList.remove("hidden");
        uploadCancel.addEventListener("click", window.closeImgOverlay);
        document.addEventListener("keydown", onUploadCancelEscPress);
        //Маштабирование изображения
        resizeMinus.addEventListener("click", window.resizeZoom);
        resizePlus.addEventListener("click", window.resizeZoom);
        //Проверка поля для ввода хеш-тегов
        inputHashtags.addEventListener("change", checkInputHashTag);
        //Создадим глобальную переменную которая отображает
        // на сколько сдвинут ползунок в процент
        if (!window.numberPercentageOfEffect) {
            window.numberPercentageOfEffect =
                scaleLevel.offsetWidth / scaleLine.offsetWidth;
        }
        if(!window.getEffect){
            window.scaleLevel.style.backgroundColor = "gray";
            window.scalePin.style.backgroundColor = "gray";
            window.scalePin.style.cursor = "default";
        }
    };

    //Функция закрытия Окна редактирования изображения
    //Удаляет обработчики событий закрития на ESC и клик после закрытия
    //Обнуляет значение поля выбора файла
    //Убираем если был добавленый стиль из фильтра на фото
    window.closeImgOverlay = function() {
        uploadImgOverlay.classList.add("hidden");
        uploadCancel.removeEventListener("click", window.closeImgOverlay);
        document.removeEventListener("keydown", onUploadCancelEscPress);
        //Убираем слушатель на зум изображения
        resizeMinus.removeEventListener("click", window.resizeZoom);
        resizePlus.removeEventListener("click", window.resizeZoom);
        //Убираем слушатель на поле для ввода хеш-тегов
        inputHashtags.removeEventListener("change", checkInputHashTag);
        //Збрасываем значение выбраного файла пры закрытии формы
        uploadFile.value = null;
        //Збрасываем введеные значени в инпут хеш-тег при закрытии формы
        inputHashtags.value = null;
        if (prevEffect) {
            uploadImg.classList.remove(prevEffect);
        }
    };

    //Функция закрытия Окна редактирования изображения
    // по нажатию на клавишу ESC
    var onUploadCancelEscPress = function(evt) {
        var inputHashtags = uploadImgOverlay.querySelector(".text__hashtags");
        if (evt.keyCode === ESC_KEYCODE && evt.target !== inputHashtags && evt.target !== inputTextArea) {
            window.closeImgOverlay();
        }
    };

    function checkInputHashTag() {
        //Разбиваем строку по пробелу на массив строк
        var arrInputHashtag = inputHashtags.value.split(" ");
        arrInputHashtag.forEach(element => {
            //Хеш-тег должен начинаться с решетки
            if (element[0] != "#") {
                inputHashtags.setCustomValidity(
                    "Хэш-тег должен начинаться с символа # (решётка);"
                );
                //Хеш-тег не может состоять только с решетки
            } else if (element.length < 2) {
                inputHashtags.setCustomValidity(
                    "Длина Хеш-тега не должна быть меньше 2х символов"
                );
                //Длина хеш-тега не должна превышать 20ть символов
            } else if (element.length > 20) {
                inputHashtags.setCustomValidity(
                    "Длина Хеш-тега не должна превышать 20ть символов"
                );
                //Количество хеш-тегов не должно превышать 5
            } else if (arrInputHashtag.length > 5) {
                inputHashtags.setCustomValidity(
                    "Количество хеш-тегов не должно превышать 5"
                );
            } else {
                inputHashtags.setCustomValidity("");
            }
        });
    }

    var uploadFile = document.querySelector("#upload-file");
    window.uploadImgOverlay = document.querySelector(".img-upload__overlay");
    var uploadCancel = uploadImgOverlay.querySelector("#upload-cancel");
    var inputHashtags = document.querySelector(".text__hashtags");
    var inputTextArea = document.querySelector(".text__description");
    window.getEffect;

    var resizeMinus = document.querySelector(".resize__control--minus");
    var resizePlus = document.querySelector(".resize__control--plus");
    
    //Слушаем на изменение для загрузки файлов
    uploadFile.addEventListener("change", function() {
        openImgOverlay();
    });
})();