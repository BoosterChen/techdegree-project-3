!function (formValidator) {
    let nameValid = true,
        emailValid = true,
        // titleValid = true,
        // shirtValid = true,
        activitiesValid = true,
        paymentsValid = true,
        ccNumValid = true,
        zipValid = true,
        cvvValid = true;


    // trim the string
    function trim(str)
    {
        return str.replace(/(^\s*)|(\s*$)/g,"");
    }

    // show error message
    function showError(eleType, errorMsg){
        const eleLabal = document.querySelector(`label[data-labelFor=${eleType}]`) || document.querySelector(`legend[data-labelFor=${eleType}]`);
        const eleError = document.querySelector(`p[data-errorFor=${eleType}]`);
        eleLabal.className = "error-label";
        eleError.textContent = errorMsg;
        eleError.style.display = "block";
    }

    // hide error message
    function hideError(eleType){
        const eleLabal = document.querySelector(`label[data-labelFor=${eleType}]`) || document.querySelector(`legend[data-labelFor=${eleType}]`);
        const eleError = document.querySelector(`p[data-errorFor=${eleType}]`);
        eleLabal.className = "";
        eleError.style.display = "none";
        eleError.textContent = "";
    }

    // validate the whole form
    function validAll(){
        let validResult = validName();
        validResult = validEmail() && validResult;
        validResult = validActivities() && validResult;
        validResult = validPayment() && validResult;

        return  validResult;
    }

    // validate name input
    function validName() {
        if (trim(document.querySelector("#name").value) === "") {
            if(nameValid){
                nameValid = false;
                showError("name", "Please enter your name!");
            }
            return false;
        }

        //everything is fine
        if(!nameValid){
            nameValid = true;
            hideError("name");
        }
        return true;
    }

    // validate email input
    function validEmail() {
        if(trim(document.querySelector("#mail").value) === ""){
            emailValid = false;
            showError("mail", "Please enter your email!");
            return false;
        }

        const emailExp = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if(!emailExp.test(trim(document.querySelector("#mail").value))){
            emailValid = false;
            showError("mail", "Please enter a correct email!");
            return false;
        }

        //everything is fine
        if(!emailValid){
            emailValid = true;
            hideError("mail");
        }
        return true;
    }

    // validate activities
    function validActivities() {
        if(document.querySelectorAll(".activities input:checked").length === 0 ){
            if(activitiesValid){
                activitiesValid = false;
                showError("activities", "Should at least choose one activity");
            }
            return false;
        }

        //everything is fine
        if(!activitiesValid){
            activitiesValid = true;
            hideError("activities");
        }
        return true;
    }

    //validate credit card number
    function validCCNum(){
        let ccNum = trim(document.querySelector("#cc-num").value);
        if (ccNum === "") {
            nameValid = false;
            showError("cc-num", "Please enter your credit card number!");
            return false;
        }
        const numRX = /^[0-9]*$/;
        if(!numRX.test(ccNum)){
            ccNumValid = false;
            showError("cc-num", "Please enter a \"number\" between 13-16 digits");
            return false;
        }
        if (ccNum.length < 13 || ccNum.length > 16){
            ccNumValid = false;
            showError("cc-num", "The credit card number should between 13-16 digits");
            return false;
        }

        //everything is fine
        if(!ccNumValid){
            ccNumValid = true;
            hideError("cc-num");
        }
        return true;
    }

    // validate zip number
    function validZip() {
        let zip = trim(document.querySelector("#zip").value);
        if (zip === "") {
            zipValid = false;
            showError("zip", "Please enter your zip number!");
            return false;
        }
        const numRX = /^[0-9]*$/;
        if(!numRX.test(zip)){
            zipValid = false;
            showError("zip", "Please enter a 5 digits \"number\"!");
            return false;
        }
        if (zip.length !== 5){
            zipValid = false;
            showError("zip", "The zip number should be 5 digits");
            return false;
        }

        //everything is fine
        if(!zipValid){
            zipValid = true;
            hideError("zip");
        }
        return true;
    }

    // validate cvv number
    function validCvv() {
        let cvv = trim(document.querySelector("#cvv").value);
        if (cvv === "") {
            cvvValid = false;
            showError("cvv", "Please enter your zip number!");
            return false;
        }
        const numRX = /^[0-9]*$/;
        if(!numRX.test(cvv)){
            cvvValid = false;
            showError("cvv", "Please enter a 3 digits \"number\"!");
            return false;
        }
        if (cvv.length !== 3){
            cvvValid = false;
            showError("cvv", "The zip number should be 3 digits");
            return false;
        }

        //everything is fine
        if(!cvvValid){
            cvvValid = true;
            hideError("cvv");
        }
        return true;
    }

    function validPayment(){
        const selectOpt = document.querySelector("#payments option:checked");
        if(selectOpt.value === "credit-card"){
            let result = validCCNum();
            result = validZip() && result;
            result = validCvv() && result;
            return result;
        }
    }

    //export the validator
    window.formValidator = {
        'all': validAll,
        'name': validName,
        'mail': validEmail,
        'activities': validActivities,
        'cc-num': validCCNum,
        'zip': validZip,
        'cvv': validCvv
    };
}();


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
            document.querySelector("#colors-js-puns").style.display = "none";
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
            document.querySelector("#colors-js-puns").style.display = "";
        }
    }
    form.querySelector("#design").addEventListener("change", e => {
        showThemeColor( e.target.querySelector("option:checked").textContent )
    });
    showThemeColor(form.querySelector("#design option").textContent);


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
            formValidator.activities();
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


    // real time validation input elements array
    const validateArray = ["name","mail", "cc-num", "zip", "cvv"];
    validateArray.forEach(e => document.getElementById(e).addEventListener("keyup", formValidator[e]));

    // add form submit event listener
    form.addEventListener("submit", function(e){
        if(!formValidator.all()){
            e.preventDefault();
            return false;
        }

        return true;
    });
}

document.addEventListener("DOMContentLoaded", function() {
    initForm();
});