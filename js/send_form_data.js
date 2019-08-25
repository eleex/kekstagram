var form = document.querySelector(".img-upload__form");
var onSuccess = function() {
    window.closeImgOverlay();
};

var onError = function(errorMessage) {
    alert(errorMessage);
};

form.addEventListener("submit", function(evt) {
    window.upload(new FormData(form), onSuccess, onError);
    evt.preventDefault();
});
