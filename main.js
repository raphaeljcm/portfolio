const SHADOW_HEADER = "scroll";

const header = document.querySelector("header");
const pTypeWritter = document.querySelector(".typeWritter");

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

// sombra no header assim que o scrool tive rolando
function changeHeader() {
  const navHeight = header.offsetHeight; // deslocamento da altura do header, o tamanho do header incluindo borda e padding

  if(window.scrollY > navHeight) { // se o scrool da página passou a altura do header
    header.classList.add(SHADOW_HEADER);
  } else {
    header.classList.remove(SHADOW_HEADER);
  }
}

function scrollEffects() {
  window.addEventListener("scroll", () => {
    changeHeader();
  });
}

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

function init() {
  scrollEffects();
  typeWritterEffect(pTypeWritter, restartTypeWritter);
}

init();