
// Contact

const isValidEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const form = document.querySelector('form');
const thankYou = document.querySelector('.thank-you');
const nameInput = document.querySelector('input[name="name"]');
const emailInput = document.querySelector('input[name="email"]');
const subjectInput = document.querySelector('textarea[name="subject"]');
const messageInput = document.querySelector('textarea[name="message"]');

const inputs = [nameInput, emailInput, subjectInput, messageInput];

let isFormValid = false;
let isValidationOn = false;

const resetElm = (elm) => {
    elm.classList.remove("invalid");
    elm.nextElementSibling.classList.add("hidden");
};

const invalidateElm = (elm, message) => {
    elm.classList.add("invalid");
    const feedbackElement = elm.nextElementSibling;
    feedbackElement.classList.remove("hidden");
    feedbackElement.textContent = message;
};

const validateInputs = () => {
    if (!isValidationOn) return;

    isFormValid = true;
    inputs.forEach(input => resetElm(input)); 

    if (!nameInput.value) {
        isFormValid = false;
        invalidateElm(nameInput, "Your name is required.");
    } else if (nameInput.value.length < 5) {
        isFormValid = false;
        invalidateElm(nameInput, "Your name must be longer than five characters");
    }

    if (!emailInput.value) {
        isFormValid = false;
        invalidateElm(emailInput, "Please enter a valid email.");
    } else if (!isValidEmail(emailInput.value)) {
        isFormValid = false;
        invalidateElm(emailInput, "Please enter a valid email address");
    }

    if (!subjectInput.value) {
        isFormValid = false;
        invalidateElm(subjectInput, "Please tell us what we can help you with.");
    } else if (subjectInput.value.length <= 15) {
        isFormValid = false;
        invalidateElm(subjectInput, "The subject must be longer than fifteen characters");
    }

    if (!messageInput.value) {
        isFormValid = false;
        invalidateElm(messageInput, "Let us know what you're thinking.");
    } else if (messageInput.value.length <= 25) {
        isFormValid = false;
        invalidateElm(messageInput, "Your message must be longer than twenty-five characters");
    }
};

form.addEventListener("submit", (e) => {
    e.preventDefault();

    isValidationOn = true;
    validateInputs();
    if (isFormValid) {
        form.remove();
        thankYou.classList.remove("hidden");
    }
});

inputs.forEach(input => {
    input.addEventListener('input', () => {
        validateInputs();
    });
});
