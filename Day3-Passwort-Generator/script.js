const copyInput = document.querySelector(".input-box span");
const passIndicator = document.querySelector(".pass-indicator");
const passSlider = document.querySelector(".pass-length input");
const options = document.querySelectorAll(".option input");
const generateBtn = document.querySelector(".generate-btn");
const passwordInput = document.querySelector(".input-box input");

/* Character sets */
const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: `@#$%^&*()_+-={}[]|:;"'<>,.?~\``
};

/* Generate Password */
const passwordGeneration = () => {
    let staticPassword = "";
    let randomPassword = "";
    let isDuplicate = false;
    let passLength = passSlider.value;

    options.forEach(option => {
        if (option.checked) {
            if (option.id !== "exc-duplicate" && option.id !== "spaces") {
                staticPassword += characters[option.id];
            } else if (option.id === "spaces") {
                staticPassword += " ";
            } else {
                isDuplicate = true;
            }
        }
    });

    if (!staticPassword.length) return;

    for (let i = 0; i < passLength; i++) {
        let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];

        if (isDuplicate) {
            if (!randomPassword.includes(randomChar) || randomChar === " ") {
                randomPassword += randomChar;
            } else {
                i--;
            }
        } else {
            randomPassword += randomChar;
        }
    }

    passwordInput.value = randomPassword;
};

/* Strength indicator */
const passwordUpdateIndicator = () => {
    passIndicator.id =
        passSlider.value <= 8 ? "weak" :
        passSlider.value <= 16 ? "medium" :
        "strong";
};

passwordUpdateIndicator();

/* Slider update */
const sliderUpdate = () => {
    document.querySelector(".pass-length span").innerHTML = passSlider.value;
    passwordUpdateIndicator();
};

/* Copy password */
copyInput.innerHTML = "copy_all";
copyInput.style.color = "#d0d0d0";

const passwordCopy = () => {
    if (!passwordInput.value) return;

    navigator.clipboard.writeText(passwordInput.value)
        .catch(() => console.log("copy failed"));

    copyInput.innerText = "check";
    copyInput.style.color = "green";

    setTimeout(() => {
        copyInput.innerText = "copy_all";
        copyInput.style.color = "#d0d0d0";
    }, 1500);
};

/* Events */
generateBtn.addEventListener("click", passwordGeneration);
copyInput.addEventListener("click", passwordCopy);
passSlider.addEventListener("input", sliderUpdate);