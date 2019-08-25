(function() {
    //Функция записы стилей загружаемой картинке из стилей редактирования
    var setImgEffects = function(evt) {
        //Проверяем был ли клип по полю спан
        if (evt.target.tagName === "SPAN") {
            //Проверяем был ли добавлен перед этим стиль редактирования
            //Если да то сначала удалим его перед добавление нового
            if (prevEffect) {
                uploadImg.classList.remove(prevEffect);
            }
            window.getEffect = evt.target.classList[1];
            prevEffect = window.getEffect;
            uploadImg.classList.add(window.getEffect);
            setEffectByScaleLevel();
        }
    };

    //Функция которая присваивает CSS Filter на изображение относительно ползунка
    var setEffectByScaleLevel = function() {
        if (uploadImg.className == "effects__preview--chrome") {
            uploadImg.style.filter =
                "grayscale(" + window.numberPercentageOfEffect + ")";
        } else if (uploadImg.className == "effects__preview--sepia") {
            uploadImg.style.filter =
                "sepia(" + window.numberPercentageOfEffect + ")";
        } else if (uploadImg.className == "effects__preview--marvin") {
            uploadImg.style.filter =
                "invert(" + window.numberPercentageOfEffect + ")";
        } else if (uploadImg.className == "effects__preview--phobos") {
            uploadImg.style.filter =
                "blur(" + window.numberPercentageOfEffect * 5 + "px)";
        } else if (uploadImg.className == "effects__preview--heat") {
            uploadImg.style.filter =
                "brightness(" + window.numberPercentageOfEffect * 10 + ")";
        } else {
            uploadImg.style.filter = "";
        }
    };

    var listEffects = document.querySelector(".effects__list");
    var scaleField = document.querySelector(".scale");
    window.scalePin = document.querySelector(".scale__pin");
    window.uploadImg = document.querySelector(".img-upload__preview img");
    window.scaleLine = document.querySelector(".scale__line");
    window.scaleLevel = document.querySelector(".scale__level");
    window.prevEffect = null;

    //Слушаем на клик по элементам стилизация загружаемого файла
    listEffects.addEventListener("click", function(evt) {
        setImgEffects(evt);
        if (window.getEffect === "effects__preview--none") {
            window.scaleLevel.style.backgroundColor = "gray";
            window.scalePin.style.backgroundColor = "gray";
            window.scalePin.style.cursor = "default";
        } else {
            window.scaleLevel.style.backgroundColor = "";
            window.scalePin.style.backgroundColor = "";
            window.scalePin.style.cursor = "";
        }
    });

    //Drag and Drop
    //Служаем на нажатие мышкой на пин
    scalePin.addEventListener("mousedown", function(evt) {
        //Отменяем событие на случай если оно есть
        evt.preventDefault();
        //Функция getBoundingClientRect() возращает размеры елемента и
        //его позицию относительно viewport
        var limits = window.scaleLine.getBoundingClientRect();

        //Запоминаем начальные координаты пина
        var startCoordinates = {
            x: evt.clientX,
            y: evt.clientY
        };

        var onMouseMove = function(evtMove) {
            //Отменяем событие на случай если оно есть
            evtMove.preventDefault();
            //Если координаты курсора меньше или больше координат слайдера
            //то мы не перетаскиваем пин
            if (
                evtMove.clientX < limits.left ||
                evtMove.clientX > limits.right ||
                !window.getEffect ||
                window.getEffect === "effects__preview--none"
            ) {
                return;
            }
            //Записымаем в переменную разницу между начальными координатами пина и
            //теми на которые сместился курсор и записываем разницу
            var shift = {
                x: startCoordinates.x - evtMove.clientX,
                y: startCoordinates.y - evtMove.clientY
            };
            //Записываем новые координаты пина, те на которые сместился курсор
            startCoordinates = {
                x: evtMove.clientX,
                y: evtMove.clientY
            };
            numberPercentageOfEffect =
                scaleLevel.offsetWidth / scaleLine.offsetWidth;

            //Применяем разницу в смещении в стили для смещения пина и
            //увеличения или уменьшения уровня шкалы(scale__level)
            if (
                scalePin.offsetLeft >= 0 &&
                scalePin.offsetLeft <= scaleLine.offsetWidth
            ) {
                if (evtMove.clientX >= scaleField.offsetLeft)
                    scalePin.style.left = scalePin.offsetLeft - shift.x + "px";
                scaleLevel.style.width = scalePin.offsetLeft - shift.x + "px";
                if (scalePin.offsetLeft < 0) {
                    scalePin.style.left = 0 + "px";
                    scaleLevel.style.width = 0 + "px";
                }
                if (scalePin.offsetLeft > scaleLine.offsetWidth) {
                    scalePin.style.left = scaleLine.offsetWidth + "px";
                    scaleLevel.style.width = scaleLine.offsetWidth + "px";
                }
            }

            setEffectByScaleLevel();
        };

        var onMouseUp = function(evtUp) {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        };

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    });
})();
