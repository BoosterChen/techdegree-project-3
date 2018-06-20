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
    function showThemeColor(theme){
        const options = form.querySelectorAll("#color option");
        if(theme === "Select Theme"){
            options.forEach( element => element.style.display = "");
        } else {
            const selectTheme = theme.match(/Theme - (.*)/)[1];
            let first = true;
            options.forEach(element => {
                if(element.textContent.indexOf(selectTheme) >= 0){
                    element.style.display = "";
                    if(first){
                        first = false;
                        element.selected = true;
                    }
                } else {
                    element.style.display = "none";
                }

            });
        }
    }
    form.querySelector("#design").addEventListener("change", e => {
        showThemeColor( e.target.querySelector("option:checked").textContent )
    });
    form.querySelector("#design option").disabled = true;
    form.querySelector("#design option[value='js puns']").selected = true;
    showThemeColor(form.querySelector("#design option[value='js puns']").textContent);


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
    });

    // init payment info
    function showPaymentArea(paymentType){
        const paymentDivArray = Array.prototype.slice.call(form.querySelectorAll("#payments > div"));
        paymentDivArray.forEach(element => element.className === paymentType ? element.style.display = "" : element.style.display = "none");
    }
    form.querySelector("#payment option[value='select_method']").disabled = true;
    form.querySelector("#payment option[value='credit-card']").selected = true;
    showPaymentArea("credit-card");
    form.querySelector("#payment").addEventListener("change", e => showPaymentArea(e.target.value));

    const formValidator = {
        createErrorMessage: (elemnent, eMsg) => {

        },
        all: () => {

        },
        name : () =>{
            form.querySelector("#name").value === ""
        }
    };

    // form validation
    form.addEventListener("submit", e =>{
        let errorMessage = "";

    })








}

document.addEventListener("DOMContentLoaded", function(event) {
    initForm();
});