(function() {
    var resizeValue = document.querySelector(".resize__control--value");
    var imgPreview = document.querySelector(".img-upload__preview img");
    var imgZoom = 1;

    window.resizeZoom = function(evt) {
        if (evt.target.classList.contains("resize__control--minus")) {
            if (imgZoom > 0.25) {
                imgPreview.style.transform = "scale(" + (imgZoom -= 0.25) + ")";
                resizeValue.value = imgZoom * 100 + "%";                
            }
        } else {
            if (imgZoom < 1) {
                imgPreview.style.transform = "scale(" + (imgZoom += 0.25) + ")";
                resizeValue.value = imgZoom * 100 + "%";                
            }
        }
    };
})();
