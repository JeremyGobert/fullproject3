'use strict';


window.onload = () => {
const inpFile = document.getElementById("inpFile");
const inpFileVal = document.getElementById("inpFileVal");
const previewContainer = document.getElementById("imagePreview");
const previewImage = previewContainer.querySelector(".image-preview__image");
const previewText = previewContainer.querySelector(".image-preview__text");

inpFile.addEventListener("change", function(){
    const file = this.files[0];

    if(file){
        const read = new FileReader();

        previewText.style.display = "none";
        previewImage.style.display = "block";
        inpFile.setAttribute("value", 'test');

        read.addEventListener("load", function(){
            console.log(this);
            previewImage.setAttribute("src", this.result);
            inpFileVal.setAttribute("value", this.result);
        });

        console.log(file);
        read.readAsDataURL(file);
        console.log(read);

    }else{
        previewText.style.display = null;
        previewImage.style.display = null;
    }

});
};
/*function removeDummy() {
  var elem = document.getElementById('dummy');
  elem.parentNode.removeChild(elem);
  return false;
}*/
