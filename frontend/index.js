'use strict';


window.onload = () => {
    const inpFile = document.getElementById("inpFile");
    const inpFileVal = document.getElementById("inpFileVal");
    const previewContainer = document.getElementById("imagePreview");
    const previewImage = previewContainer.querySelector(".image-preview__image");
    const previewText = previewContainer.querySelector(".image-preview__text");

const deepfake = document.getElementById("deepfake", function(){


});



    inpFile.addEventListener("change", function () {
        const file = this.files[0];

        if (file) {
            const read = new FileReader();

            previewText.style.display = "none";
            previewImage.style.display = "block";
            inpFile.setAttribute("value", 'test');

            read.addEventListener("load", function () {
                console.log(this);
                previewImage.setAttribute("src", this.result);
                inpFileVal.setAttribute("value", this.result);
            });

            console.log(file);
            read.readAsDataURL(file);
            console.log(read);

        } else {
            previewText.style.display = null;
            previewImage.style.display = null;
        }

    });




};

function submit() {
    event.preventDefault();
    const form = document.getElementById("trans");
    console.log("hey");
    fetch("https://google-translate1.p.rapidapi.com/language/translate/v2", {
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded",
                "accept-encoding": "application/gzip",
                "x-rapidapi-key": "0f8cf47e8fmsh7eb7592c83f2397p16b37fjsn59e20603886f",
                "x-rapidapi-host": "google-translate1.p.rapidapi.com"
            },
            "body": {
                "q": "Hello, world!",
                "source": "en",
                "target": "es"
            }
        })
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.error(err);
        });

}
/*function removeDummy() {
  var elem = document.getElementById('dummy');
  elem.parentNode.removeChild(elem);
  return false;
}*/