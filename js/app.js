// init the form
function initForm(){
    const form = document.querySelector("form");

    form.querySelector("input[type=text]").focus();   //focus to the first text field

    // init Job Role section
    const otherTitleInput =  form.querySelector("#other-title");
    otherTitleInput.style.display = "none";
    form.querySelector("#title").addEventListener("change", e => {
        if(e.target.value === "other"){
            otherTitleInput.style.display = "";
        } else {
            otherTitleInput.style.display = "none";
        }
    });

    // init T-shirt Info section
    form.querySelector("#design").addEventListener("change", e => {
        const options = form.querySelectorAll("#color option");
        const themeContent = e.target.querySelector("option:checked").textContent;

        if(themeContent === "Select Theme"){
            options.forEach( element => element.style.display = "");
        } else {
            const selectTheme = themeContent.match(/Theme - (.*)/)[1];
            Array.prototype.forEach.call(options, element => element.textContent.indexOf(selectTheme) >= 0 ? element.style.display = "" : element.style.display = "none");
        }
    })





}

document.addEventListener("DOMContentLoaded", function(event) {
    initForm();
});