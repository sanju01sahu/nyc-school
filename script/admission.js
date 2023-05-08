const scroll1 = document.getElementById("scroll1");
const scroll2 = document.getElementById("scroll2");

function scrollImage() {

    scroll1.scrollLeft += 1;
    scroll2.scrollLeft += 1;
}
setInterval(scrollImage, 10)