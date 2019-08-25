//Функция загрузки данных для отрисовки фотогравий с удалённого сервера
window.load = function(onLoad, onError) {
    var URL = "https://js.dump.academy/kekstagram/data";
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.addEventListener("load", function() {
        if (xhr.status === 200) {
            onLoad(xhr.response);
        } else {
            onError(xhr.status);
        }
    });
    xhr.addEventListener("error", function() {
        onError(xhr.status);
    });
    xhr.addEventListener("timeout", function() {
        onError(
            "Извините, запрос превысил максимальное время " +
                xhr.timeout +
                " мс"
        );
    });
    xhr.timeout = 10000;
    xhr.open("GET", URL);
    xhr.send();
};

//Функция отправки формы без перезагрузки страници на удалённый сервер
window.upload = function(data, onLoad, onError) {
    var URL = "https://js.dump.academy/kekstagram";
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", function() {
        if (xhr.status === 200) {
            onLoad();
            console.log("Данные из формы успешно отправлены");
        } else {
            onError(xhr.status);
        }
    });
    xhr.addEventListener("error", function() {
        onError("При загрузке данных произошла ошибка.");
    });
    xhr.addEventListener("timeout", function() {
        onError(
            "Извините, запрос превысил максимальное время " +
                xhr.timeout +
                " мс"
        );
    });
    xhr.timeout = 10000;
    xhr.open("POST", URL);
    xhr.send(data);
};