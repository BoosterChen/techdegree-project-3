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
    });

    // init register
    form.querySelector(".activities").addEventListener("change", e => {
        let priceCount = 0;
        // const labelList = form.querySelectorAll(".activities label");
        const checkedInput = form.querySelectorAll(".activities input:checked");
        const uncheckedInput = form.querySelectorAll(".activities input:not(:checked)");
        function resetFadeOut() {
            Array.prototype.forEach.call(uncheckedInput , element => {
                  element.parentNode.style.color = "#000";
                  element.disabled = false;
            })
        }
        function fadeOutByDate(date){
            Array.prototype.forEach.call(uncheckedInput , element => {
                if(element.parentNode.textContent.indexOf(date) >= 0){
                    element.parentNode.style.color = "lightGray";
                    element.disabled = true;
                }
            })
        }

        resetFadeOut();
        if(checkedInput.length === 0){
            form.querySelector("#totalPrice").textContent = "";
            form.querySelector("#totalPrice").hidden = true;
        } else {
            Array.prototype.forEach.call(checkedInput , element => {
                const selectTxt = element.parentNode.textContent;
                const selectDate = selectTxt.match(/.* — (.*), .*/) === null ? null : selectTxt.match(/.* — (.*), .*/)[1];
                const selectPrice = selectTxt.match(/.*\$(\d+)/) === null ? null :  selectTxt.match(/.*\$(\d+)/)[1];

                priceCount += parseInt(selectPrice);
                fadeOutByDate(selectDate);
            });

            form.querySelector("#totalPrice").textContent = "Total: $" + priceCount;
            form.querySelector("#totalPrice").hidden = false;
        }
    })



}

document.addEventListener("DOMContentLoaded", function(event) {
    initForm();
});