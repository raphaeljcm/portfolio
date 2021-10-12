const SHADOW_HEADER = "scroll";
const ERROR_EXISTS = "active";

const header = document.querySelector("header");
const pTypeWritter = document.querySelector(".typeWritter");
const form = document.querySelector("form");
const fields = document.querySelectorAll("[required]");

// Using libs
const Libs = {
  // Carousel slider -> swiper lib
  swiper: new Swiper('.swiper', {
    // todas as propriedades estão na API do swiper
    slidesPerView: 1,
    pagination: {
      el: '.swiper-pagination',
    },
    mousewheel: true,
    keyboard: true,
    breakpoints: {
      766: {
        slidesPerView: 2,
        spaceBetween: 75,
        mousewheel: true,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 75,
        mousewheel: true,
      },
      1440: {
        slidesPerView: 4,
        spaceBetween: 75,
        mousewheel: false,
      }
    }
}),
}

// shadow on header when scrolling 
function changeHeader() {
  const navHeight = header.offsetHeight; // deslocamento da altura do header, o tamanho do header incluindo borda e padding

  if(window.scrollY > navHeight) { // se o scrool da página passou a altura do header
    header.classList.add(SHADOW_HEADER);
  } else {
    header.classList.remove(SHADOW_HEADER);
  }
}

// Scroll effects
function scrollEffects() {
  window.addEventListener("scroll", () => {
    changeHeader();
  });
}

// Type Writter Effect
function typeWritterEffect(e, callback) {
  const textArray = e.textContent.split(""); // splitting the sentence into letters
  let cont = 0;
  
  e.innerHTML = "";

  textArray.forEach((letter, index) => {
    setTimeout(() => {
      e.innerHTML += letter;
      cont++;

      if(cont == textArray.length) {
        callback();
      }
    }, 130 * index);
  });
}

function restartTypeWritter() {
  typeWritterEffect(pTypeWritter, restartTypeWritter);
}

// FORM VALIDATION
function startingFormValidation() {
  form.addEventListener("submit", e => {
    e.preventDefault();
  });

  // found an invalid element
  fields.forEach(field => {
    field.addEventListener("invalid", e => {
      // turning the bubble off
      e.preventDefault();

      customValidation(e);
    });
    field.addEventListener("blur", customValidation); // unfocused
  }); 
}

function customValidation(e) {
  const field = e.target;

  // getting the function
  const validation = validateField(field);

  // executing the function
  validation();
}

function validateField(field) {
  // cheching if there's an error
  function verifyErrors() {
    let foundError = false;

    for(let error in field.validity) {
      // with for IN I can get the properties 
      if(field.validity[error] && !field.validity.valid) {
        foundError = error;
      }
    }

    return foundError;
  }

  function customMessage(typeError) {
    const messages = {
      text: {
        valueMissing: "Por favor, preencha este campo",
      },
      email: {
        valueMissing: "Email é obrigatório",
        typeMismatch: "Por favor, preencha um email válido",
      },
    } 

    // MAAAAAAN, THIS GOT INSANE REALLY!!!
    return messages[field.type][typeError]; 
  }

  function setCustomMessage(message) {
    const spanError = field.parentNode.querySelector("span.error");

    if(message) {
      spanError.classList.add(ERROR_EXISTS);
      spanError.innerHTML = message;
    } else {
      spanError.classList.remove(ERROR_EXISTS);
      spanError.innerHTML = "";
    }
  }

  return function() {
    const error = verifyErrors();

    if(error) {
      const message = customMessage(error);

      field.style.borderColor = "red";
      setCustomMessage(message);

      if(error == "typeMismatch") {
        const label = field.parentNode.querySelector("label");
        label.style.transform = "translateY(-24px)";
      }
    } else {
      field.style.borderColor = "green";
      setCustomMessage();
    }
  };
}

// STARTING EVERYTHING!
function init() {
  scrollEffects();
  typeWritterEffect(pTypeWritter, restartTypeWritter);
  startingFormValidation();
}

init();