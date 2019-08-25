(function() {
    //Функция отображения и настройки параметров блока .big-picture
    function setBigPicture(pictureDescription, evt) {
        bigPictureElement.classList.remove("hidden");

        var listOfSocialComments = bigPictureElement.querySelectorAll(
            ".social__comments .social__comment"
        );

        var pictureData = pictureDescription.find(function(item) {
            if (item.url === evt.target.getAttribute("src")) {
                return item;
            }
        });

        setPictureData(bigPictureElement, pictureData, listOfSocialComments);
    }

    function setPictureData(
        bigPictureElement,
        pictureData,
        listOfSocialComments
    ) {
        bigPictureElement.querySelector(".big-picture__img img").src =
            pictureData.url;
        bigPictureElement.querySelector(".likes-count").textContent =
            pictureData.likes;
        bigPictureElement.querySelector(".comments-count").textContent =
            pictureData.comments.length;

        if (pictureData.comments.length > 1) {
            for (var i = 0; i < listOfSocialComments.length; i++) {
                listOfSocialComments[i].querySelector(".social__picture").src =
                    "img/avatar-" + getRandomInt(1, 6) + ".svg";
                listOfSocialComments[i].querySelector(
                    ".social__text"
                ).textContent = pictureData.comments[i].message;
            }
        } else {
            listOfSocialComments[0].querySelector(".social__picture").src =
                "img/avatar-" + getRandomInt(1, 6) + ".svg";
            listOfSocialComments[0].querySelector(".social__text").textContent =
                pictureData.comments[0].message;
        }

        bigPictureElement.querySelector(".social__caption").textContent =
            pictureData.description;
    }

    //Закрытие окна вывода картинки в большем режиме
    //по клику на элемент закрытия
    function onBigPictureCloseClick() {
        bigPictureElement.classList.add("hidden");
        //Убираем слушатель на закрытие по клику после закрытия
        bigPictureCancel.removeEventListener("click", onBigPictureCloseClick);
        document.removeEventListener("keydown", onBigPictureCloseEscPress);
    }

    //Закрытие окна вывода картинки в большем режиме
    //по нажатию на клавишу ESC
    var onBigPictureCloseEscPress = function(evt) {
        if (evt.keyCode === ESC_KEYCODE) {
            onBigPictureCloseClick();
        }
    };

    //Добавим код клавиши ESC в переменную
    window.ESC_KEYCODE = 27;
    var pictureElement = document.querySelector(".pictures.container");
    var bigPictureElement = document.querySelector(".big-picture");
    var bigPictureCancel = document.querySelector(".big-picture__cancel");

    //Слушаем клик по картинке пользователей
    //И открываем в большом просмотре с параметрами по клику
    pictureElement.addEventListener("click", function(evt) {
        if (evt.target.className === "picture__img") {
            setBigPicture(window.pictureDescription, evt);
        }
        bigPictureCancel.addEventListener("click", onBigPictureCloseClick);
        document.addEventListener("keydown", onBigPictureCloseEscPress);
    });
})();
