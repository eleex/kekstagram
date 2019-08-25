(function() {
    var FILE_FORMATS = ["gif", "jpeg", "jpg", "png"];
    var uploadImg = document.querySelector("#upload-file");
    var previewImgElement = document.querySelector(".img-upload__preview img");

    uploadImg.addEventListener("change", function() {
        var imgFile = uploadImg.files[0];
        var fileName = imgFile.name.toLowerCase();
        var matches = FILE_FORMATS.some(function(type) {
            return fileName.endsWith(type);
        });

        if (matches) {
            var reader = new FileReader();
            reader.addEventListener("load", function() {
                previewImgElement.src = reader.result;
            });
            reader.readAsDataURL(imgFile);
        }
    });
})();
