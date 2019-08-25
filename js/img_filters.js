(function() {
    var popularImgsElement = document.querySelector("#filter-popular");
    var newestImgsElement = document.querySelector("#filter-new");
    var discussedImgsElement = document.querySelector("#filter-discussed");
    var imgFilters = document.querySelector(".img-filters");
    imgFilters.classList.remove("img-filters--inactive");
    var newestImgs;
    var discussedImgs;
    var popularImgs;

    window.sortedDiscussedImgs = function(data) {
        discussedImgs = data.slice();
        discussedImgs.sort(function(a, b) {
            if (b.comments.length === a.comments.length) {
                return b.likes - a.likes;
            }
            return b.comments.length - a.comments.length;
        });
    };

    window.sortedPopularImgs = function(data) {
        popularImgs = data.slice();
        popularImgs.sort(function(a, b) {
            if (b.likes === a.likes) {
                return b.comments.length - a.comments.length;
            }
            return b.likes - a.likes;
        });
    };

    window.sortedNewestImgs = function(data) {
        newestImgs = data.slice();
    };

    var replaceImgs = function(Imgs) {
        var pictureLinks = document.querySelectorAll(".picture__link");

        for (var i = 0; i < 25; i++) {
            pictureLinks[i].querySelector(".picture__img").src = Imgs[i]["url"];
            pictureLinks[i].querySelector(".picture__stat--likes").textContent =
                Imgs[i]["likes"];
            pictureLinks[i].querySelector(
                ".picture__stat--comments"
            ).textContent = Imgs[i]["comments"][0]["message"];
        }
    };

    popularImgsElement.addEventListener("click", function(evt) {
        evt.target.classList.add("img-filters__button--active");
        newestImgsElement.classList.remove("img-filters__button--active");
        discussedImgsElement.classList.remove("img-filters__button--active");

        replaceImgs(popularImgs);
    });

    newestImgsElement.addEventListener("click", function(evt) {
        evt.target.classList.add("img-filters__button--active");
        popularImgsElement.classList.remove("img-filters__button--active");
        discussedImgsElement.classList.remove("img-filters__button--active");

        replaceImgs(newestImgs);
    });

    discussedImgsElement.addEventListener("click", function(evt) {
        evt.target.classList.add("img-filters__button--active");
        popularImgsElement.classList.remove("img-filters__button--active");
        newestImgsElement.classList.remove("img-filters__button--active");

        replaceImgs(discussedImgs);
    });
})();
