const SHADOW_HEADER = "scroll";
const ERROR_EXISTS = "active";
const ERROR_NOT_EXISTS = "passed";
const MENU = "show";
const MENU_ACTIVE = "active";

const header = document.querySelector("header");
const pTypeWritter = document.querySelector(".typeWritter");
const form = document.querySelector("form");
const fields = document.querySelectorAll("[required]");
const containerHome = document.querySelector("#mainHeader .container");
const sections = document.querySelectorAll("main section[id]");

import "../style.css";

// Using libs
const Libs = {
  // Carousel slider -> swiper lib
  swiper: new Swiper('.swiper', {
    // todas as propriedades estão na API do swiper
    slidesPerView: 1,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
    mousewheel: {
      invert: true,
    },
    keyboard: true,
    breakpoints: {
      766: {
        slidesPerView: 2,
        spaceBetween: 75,
        mousewheel: true,
      },
      1024: {
        slidesPerView: 2,
        spaceBetween: 75,
        mousewheel: true,
      },
      1480: {
        slidesPerView: 3,
        spaceBetween: 75,
        mousewheel: true,
      },
      1800: {
        slidesPerView: 4,
        spaceBetween: 75,
        mousewheel: false,
      }
    }
}),
}

function toggleMenu() {
  containerHome.classList.toggle(MENU);
}

function removeMenu() {
  containerHome.classList.remove(MENU);
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

function activateMenuOnSection() {
  // checkpoint = decolamento Y da janela + metade da altura da janela
  const checkpoint = window.pageYOffset + (window.innerHeight / 6) * 2;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    const checkpointStart = checkpoint >= sectionTop;
    const checkpointEnd = checkpoint <= sectionTop + sectionHeight;

    if(checkpointStart && checkpointEnd) {
      document.querySelector("nav #menu ul li a[href*="+sectionId+"]").classList.add(MENU_ACTIVE);
    } else {
      document.querySelector("nav #menu ul li a[href*="+sectionId+"]").classList.remove(MENU_ACTIVE);
    }
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
    if(canISend()) {
      e.preventDefault();
      firestoreFunctions.createANewMessage();
    } else {
      e.preventDefault();
    }
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
    const inputMessages = {
      text: {
        valueMissing: "Por favor, preencha este campo",
      },
      email: {
        valueMissing: "Email é obrigatório",
        typeMismatch: "Por favor, preencha um email válido",
      }
    }
    
    const textareaMessage = {
      mensagem: {
        valueMissing: "Escreva alguma mensagem",
      }
    }

    // MAAAAAAN, THIS GOT INSANE REALLY!!!
    const whatIsThis = field.parentNode.querySelector("Label").textContent;
    
    if(whatIsThis == "Mensagem") {
      return textareaMessage[field.name.toLowerCase()][typeError];
    } else {
      return inputMessages[field.type][typeError];
    }
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
      field.setAttribute("data-error", ERROR_NOT_EXISTS);
      setCustomMessage();
    }
  };
}

function canISend() {
  let result;

  fields.forEach(field => {
    if(!field.dataset.error) {
      result = false;
    } 
  });
  
  return result == false ? false : true; 
}

function changeColorLink() {
  const imgLinks = document.querySelectorAll('.external-link-img');

  imgLinks.forEach(img => {
    img.addEventListener('mouseover', () => {
      if(document.documentElement.className === 'dark-mode') {
        img.setAttribute('src', './assets/external-link-white.svg');
        img.parentElement.style.color = 'white';
      }
    });
  });

  imgLinks.forEach(img => {
    img.addEventListener('mouseleave', () => {
      if(document.documentElement.className === 'dark-mode') {
        img.setAttribute('src', './assets/external-link.svg');
        img.parentElement.style.color = '#828282';
      }
    });
  });
}

function backToTopButton() {
  const backToTopButton = document.querySelector('#back-to-top');

  if(window.scrollY >= 2500) {
    backToTopButton.classList.add(MENU);
  } else {
    backToTopButton.classList.remove(MENU);
  }

  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0
    });
  });
}

// Scroll effects
function scrollEffects() {
  window.addEventListener("scroll", () => {
    changeHeader();
    activateMenuOnSection();
    backToTopButton();
  });
}

function timeSwitcher() {
  const ball = document.getElementById('ball');

  // to set the theme on initial load
  if(localStorage.getItem('theme') === 'dark-mode' || localStorage.getItem('theme') == undefined) {
    setTheme('dark-mode', 'moon');
  } else {
    setTheme('light-mode', 'sun');
  }

  // function to set a given theme/color-scheme
  function setTheme(themeName, ballTheme) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;

    if(ballTheme === 'moon') {
      ball.classList.remove('sun');
      ball.classList.add('moon');
    } else {
      ball.classList.remove('moon');
      ball.classList.add('sun');
    }
  }

  // to toggle between the themes
  ball.addEventListener('click', () => {
    if(ball.getAttribute('class').includes('moon')) {
      setTheme('light-mode', 'sun');
    } else {
      setTheme('dark-mode', 'moon');
    }
  }); 
}

function checkLanguage() {
  const htmlEl = document.documentElement.getAttribute('lang');
  const ptElement = document.getElementById('portuguese');
  const enElement = document.getElementById('english');

  if(htmlEl === 'en') {
    ptElement.classList.remove('active');
    enElement.classList.add('active');
  } else {
    ptElement.classList.add('active');
    enElement.classList.remove('active');
  }
}

// STARTING EVERYTHING!
function init() {
  scrollEffects();
  typeWritterEffect(pTypeWritter, restartTypeWritter);
  startingFormValidation();
  changeColorLink();
  timeSwitcher();
  checkLanguage();
}

init();