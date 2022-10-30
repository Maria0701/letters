import { menuOpener } from "./components/opener";
import Swiper, { Navigation, Pagination } from 'swiper';
import { findVideos } from "./components/video";
import { YmapsInitializer } from "./components/yandex";
import lightGallery from 'lightgallery';
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgZoom from 'lightgallery/plugins/zoom'
import { sendForm } from "./components/formsender";
import { phoneMask } from "./components/phone-mask";
import { openPopup } from "./components/createPopup";

try {
    const opener = document.querySelector('.header__toggler');
    const menuElt = document.querySelector('.menu__wrapper');  
    const eltToOpen = document.querySelector('.header');

    if (opener && menuElt) {        
        menuOpener(opener, menuElt, eltToOpen);
    }

} catch(e) {
    console.log(e);
}

try {
    const togglers = document.querySelectorAll('.js-menutoggler');
    if (togglers.length) {
        const togglerHandler = (evt) => {
            const target = evt.target.closest('.menu__item');
            target.classList.toggle('opened');
        }
        togglers.forEach(item => item.addEventListener('click', togglerHandler));
    }
} catch(e){ 
    console.log(e);
}


try {
    const toggleBlock = document.querySelector('.js-tabs');
    if (toggleBlock ) {
        const tabHandler = (evt) => {
            const target = evt.target.parentElement;
            if (target.classList.contains('opened')) {
                return;
            }
            togglers.forEach(item => {
                const parent = item.parentElement;
                if (parent.classList.contains('opened')) {
                    parent.classList.remove('opened');
                    return;
            }});
            target.classList.add('opened');
        }
        const togglers = toggleBlock.querySelectorAll('.js-tab');
        togglers.forEach(item => item.addEventListener('click', tabHandler));
    }
} catch(e){ 
    console.log(e);
}

try {
    const feedbackSwiper = new Swiper('.slider', {
        modules: [Navigation, Pagination],
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          navigation: {
            nextEl: '.slider-next',
            prevEl: '.slider-prev',
          },

    });

} catch(e) {
    console.log(e);
}

try {
    const photosSwiper = new Swiper('.slider-photos', {
        modules: [Navigation, Pagination],
        slidesPerView: 2,
        spaceBetween: 10,
        breakpoints: {
            740: {
              slidesPerView: 3,
              spaceBetween: 10
            },
            1000: {
              slidesPerView: 4,
              spaceBetween: 10
            },
        },
        pagination: {
            el: '.slider-photos-pagination',
            clickable: true,
          },
          navigation: {
            nextEl: '.slider-photos-next',
            prevEl: '.slider-photos-prev',
          },
    });
} catch(e) {
    console.log(e);
}

try {
    findVideos();
} catch(e) {
    console.log(e);
}

// запускаем карту 
try {
    const mapContainer = document.querySelector('.js-map');
    if (mapContainer) {
        const coords = mapContainer.dataset.coords;
        const name =  mapContainer.dataset.name;
        const description =  mapContainer.dataset.description;
        if (coords) {
            const coordsArray = coords.split(',').map(item => new Number(item));
            const data = {
                coords: coordsArray,
                name: name || '',
                description: description || '',
            };
            new YmapsInitializer(mapContainer, data);
        } else {
            new YmapsInitializer(mapContainer);
        }        
    }
  } catch(e) {
    console.log(e);
  }

  try {
    lightGallery(document.getElementById('lightgallery'), {
        plugins: [lgZoom, lgThumbnail],
        speed: 500,
        controls: false,
    });
  } catch(e) {
    console.log(e);
  }

  try {
    const forms = document.querySelectorAll('form');
    if (forms.length) {
        forms.forEach(form => sendForm(form));
    }    
} catch (e) {
    console.log(e);
}

try {
    const phones = document.querySelectorAll('[type="phone"]');
     if (phones.length > 0) {
        phones.forEach(phone => phoneMask(phone));
    }
} catch(e) {
    console.log(e);
}

try {
    const callbackButtons = document.querySelectorAll('.js-callback');
    const excursion = document.querySelectorAll('.js-excursion');
    if (callbackButtons.length > 0) {
        callbackButtons.forEach(item => item.addEventListener('click', openPopup))
    }
    if (excursion.length > 0) {
        excursion.forEach(item => item.addEventListener('click', openPopup))
    }
} catch(e) {
    console.log(e);
}