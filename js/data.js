(function() {
    // функция которая возращает целое случайное число от мин до макс
    window.getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    //Функция заполнения блока елементами из массива
    //и создание дом елемента на основе полученых блоков.
    window.createPictureDom = function(pictureDescription) {
        var pictureTemplate = document
            .querySelector("#picture")
            .content.querySelector(".picture__link");

        picturesContainer = document.querySelector(".pictures");

        var fragment = document.createDocumentFragment();

        for (var i = 0; i < 25; i++) {
            var pictureElement = pictureTemplate.cloneNode(true);
            pictureElement.querySelector(".picture__img").src =
                pictureDescription[i]["url"];
            pictureElement.querySelector(".picture__stat--likes").textContent =
                pictureDescription[i]["likes"];
            pictureElement.querySelector(
                ".picture__stat--comments"
            ).textContent = pictureDescription[i]["comments"][0]["message"];

            fragment.appendChild(pictureElement);
        }
        picturesContainer.appendChild(fragment);
        return picturesContainer;
    };

    var onLoad = function(response) {
        window.pictureDescription = response;
        window.createPictureDom(response);
        sortedDiscussedImgs(response);
        sortedPopularImgs(response);
        sortedNewestImgs(response);
    };

    var onError = function(errorMessage) {
        console.error(errorMessage);
    };

    window.load(onLoad, onError);
})();
