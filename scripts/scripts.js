const themeBtn = document.querySelector(".header__theme-button");

function ChangeTheme() {
    let elem = document.querySelector(".header__theme-button");
    elem.classList.toggle("header__theme-button_dark")
    elem.classList.toggle("header__theme-button_light")

    elem = document.querySelector(".page");
    elem.classList.toggle("page_dark")
    elem.classList.toggle("page_light")

    elem = document.querySelector(".header");
    elem.classList.toggle('header_dark');
    elem.classList.toggle('header_light');

    elem = document.querySelector(".header__text");
    elem.classList.toggle('header__text_dark');
    elem.classList.toggle('header__text_light');

    elem = document.querySelector(".greetings");
    elem.classList.toggle('greetings_dark');
    elem.classList.toggle('greetings_light');

    elem = document.querySelector(".content");
    elem.classList.toggle('content_dark');
    elem.classList.toggle('content_light');

    elem = document.querySelector(".card");
    elem.classList.toggle('card_dark');
    elem.classList.toggle('card_light');

    elem = document.querySelector(".popup");
    elem.classList.toggle('popup_dark');
    elem.classList.toggle('popup_light');

    elem = document.querySelector(".footer");
    elem.classList.toggle('footer_dark');
    elem.classList.toggle('footer_light');

    elem = document.querySelector(".footer-author");
    elem.classList.toggle('footer-author_dark');
    elem.classList.toggle('footer-author_light');

    elem = document.querySelector(".contact");
    elem.classList.toggle('contact_dark');
    elem.classList.toggle('contact_light');

    elem = document.querySelector(".form-popup__container");
    elem.classList.toggle('form-popup__container_dark');
    elem.classList.toggle('form-popup__container_light');

    elem = document.querySelector(".form-popup__heading");
    elem.classList.toggle('form-popup__heading_dark');
    elem.classList.toggle('form-popup__heading_light');
}

themeBtn.addEventListener("click", ChangeTheme);



const rainBtn = document.querySelector(".footer__rain-button");
let rain = document.querySelector(".rain");

rainBtn.addEventListener('click', function () {
    if (window.innerWidth >= 800) {
        rain.classList.add("rain_active");
        rain.classList.add("rain_animation");
    }
})

window.addEventListener('resize', function () {
    if (rain.classList.contains("rain_active")) {
        rain.classList.toggle("rain_animation");
    }
})

rain.addEventListener('click', function () {
    if (rain.classList.contains("rain_active")) {
        rain.classList.remove("rain_active");
    }
})



const popup = document.querySelector(".popup");
popup.addEventListener('click', function(evt) {
    if (evt.target === popup) {
        closePopup(popup);
    }
    evt.stopPropagation();
});

const popupImg = document.querySelector(".popup__photo_center");
const images = document.querySelectorAll(".popup-data__image");
const popupLeftLink = document.querySelector(".popup__photo_left");
const popupRightLink = document.querySelector(".popup__photo_right");

images.forEach(function(imageElement) {
    const link = imageElement.src;
    imageElement.addEventListener('click', function() {
        popupImg.src = link;
        checkLinks(imageElement);
        popup.classList.add('popup_active');
        imageElement.classList.add("current");
    });
})

popupLeftLink.addEventListener('click', function () {
    const imageElement = document.querySelector(".current");
    imageElement.classList.remove("current");
    const leftSibling = imageElement.previousElementSibling;
    leftSibling.classList.add("current");
    popupImg.src = leftSibling.src;
    checkLinks(leftSibling);
});

popupRightLink.addEventListener('click', function () {
    const imageElement = document.querySelector(".current");
    imageElement.classList.remove("current");
    const rightSibling = imageElement.nextElementSibling;
    rightSibling.classList.add("current");
    popupImg.src = rightSibling.src;
    checkLinks(rightSibling);
});

function checkLinks(imageElement) {
    if (!imageElement.nextElementSibling) {
        popupRightLink.setAttribute('style', 'display: none');
    } else {
        popupRightLink.setAttribute('style', 'display: block');
    }
    if (!imageElement.previousElementSibling) {
        popupLeftLink.setAttribute('style', 'display: none');
    } else {
        popupLeftLink.setAttribute('style', 'display: block');
    }
}

function closePopup(popup) {
    popup.classList.remove('popup_active');
    const currentImage = document.querySelector('.current');
    if (currentImage) {
        currentImage.classList.remove("current");
    }
}



const messagePopupButton = document.querySelector(".message-popup__close-button");

sendMessage()
messagePopupClose()

function messagePopupOpen() {
    const popupMessage = document.querySelector(".message-popup");
    popupMessage.classList.add("message-popup_active");
}

function sendMessage() {
    if (!localStorage.getItem("send-flag")) {
        setTimeout(messagePopupOpen, 3000);
    }
}
function messagePopupClose() {
    messagePopupButton.addEventListener('click', function () {
        localStorage.setItem("send-flag", "true");
        const popupHello = document.querySelector(".message-popup_active");
        popupHello.classList.remove("message-popup_active");
    })
}

const messagePopup = document.querySelector(".message-popup");
messagePopup.addEventListener('click', function(evt) {
    if (evt.target === messagePopup) {
        closePopup(messagePopup);
    }
    evt.stopPropagation();
});



const feedbackPopup = document.querySelector(".form-popup");
feedbackPopup.addEventListener('click', function(evt) {
    if (evt.target === feedbackPopup) {
        closePopup(feedbackPopup);
    }
    evt.stopPropagation();
});
const feedbackButton = document.querySelector(".footer__feedback-button");
feedbackButton.addEventListener('click', function () {
    feedbackPopup.classList.add('popup_active');
    default_();
})

const feedbackForm = feedbackPopup.querySelector(".form-popup__form_feedback");
feedbackForm.addEventListener('submit', async function () {
    const phone = feedbackPopup.querySelector(".form-popup__input[id='phone']");
    const email = feedbackPopup.querySelector(".form-popup__input[id='email']");
    const text = feedbackPopup.querySelector(".form-popup__input[id='text']");
    return await fetch("", {
        method: "POST",
        body: JSON.stringify({
            tel: phone.value,
            email: email.value,
            text: text.value
        })
    }).then(function () {
        setTimeout(success, 256);
        setTimeout(function () {
            closePopup(feedbackPopup);
        }, 512);
    })
});



function hasInvalidInput(inputs) {
    let flag = false
    inputs.forEach(function(inputElement) {
        if (!inputElement.validity.valid ||
            (inputElement.type === "tel" && !phonePattern.test(inputElement.value) ||
                (inputElement.type === "email" && !emailPattern.test(inputElement.value)))) {
            flag = true;
        }
    });
    return flag;
}

function showInputError(element, errorSpan) {
    element.classList.add('form-popup__input_error');
    errorSpan.classList.add('form-popup__error_active');
}

function hideInputError(element, errorSpan) {
    element.classList.remove('form-popup__input_error');
    errorSpan.classList.remove('form-popup__error_active');
}

function toggleSubmit(inputs, button) {
    if (hasInvalidInput(inputs)) {
        button.classList.add('button_inactive');
        button.disabled = true;
    } else {
        button.classList.remove('button_inactive');
        button.disabled = false;
    }
}

const form = document.querySelector('.form-popup__form_feedback')
form.addEventListener('submit', function (evt) {
    evt.preventDefault();
});

enableValidation(form)

const emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
const phonePattern = /^\d{11}$/;

function isValid(inputElement, spanError) {
    if (!inputElement.validity.valid ||
        (inputElement.type === "tel" && !phonePattern.test(inputElement.value) ||
            (inputElement.type === "email" && !emailPattern.test(inputElement.value)))) {
        showInputError(inputElement, spanError);
    } else {
        hideInputError(inputElement, spanError);
    }
}

function enableValidation(form) {
    const inputs = form.querySelectorAll('.form-popup__input');
    const spans = form.querySelectorAll('.form-popup__error');
    const buttonSubmit = form.querySelector('.form-popup__submit-button');
    for (let i = 0; i < inputs.length; ++i) {
        inputs[i].addEventListener('input', function() {
            isValid(inputs[i], spans[i]);
            toggleSubmit(inputs, buttonSubmit);
        })
    }
}

const btn = document.querySelector('.form-popup__submit-button')
function success() {
    btn.value = "Отправлено!";
}

function default_() {
    btn.value = "Отправить";
}