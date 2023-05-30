const btnMoreTools = document.querySelector('#show-more-tools');

document.addEventListener("DOMContentLoaded", () => {
  initMenuAndCards();
  window.addEventListener("scroll", activateStickyToolsMenu);
  btnMoreTools.addEventListener('click', () => showMoreTools() );
});

// Get the data from the Caass

const getDataCaass = async () => {
  try {
    const URL = `${window.location.origin}/caass?current=true&urile=wcm:path:/negocioscontenido/ascaas/caasherramientas&mime-type=application/json`;
    const response = await fetch(URL);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log("error", error);
  }
};

initMenuAndCards = async () => {
  const { menuHerramientas } = await getDataCaass();
  showDataHtmlmenu(menuHerramientas);
  setCategoryPage(menuHerramientas);
 
};

// Set the featured category page, and start the menu and cards
const setCategoryPage = (menu) => {
  const HashUrl = decodeURIComponent(window.location.hash).slice(1);
  const result = HashUrl
    ? menu.filter((itemMenu) => itemMenu.urlCategoria === HashUrl)
    : menu.filter((itemMenu) => itemMenu.categoriaDestacada === 'true');
  const { uuid, colorCategoria: color, urlCategoria } = result[0];
  window.location.hash = `#${urlCategoria}`;
  const itemActive = document.querySelector(
    `.menu-item-link a[data-uuid="${uuid}"]`
  );
  itemActive.parentElement.parentElement.classList.add("menu-item-active");
  const dataFilter = { uuid, color };
  filterTools(dataFilter);
};

// Show the content and html of the tools menu
const showDataHtmlmenu = (menu) => {
  const { pathname } = window.location;
  const swiperInstance = activateSwiperToolsMenu();
  let html = "";
  menu.forEach((itemMenu) => {
    const { uuid, colorCategoria, iconoCategoria, nombreCategoria, urlCategoria } =
      itemMenu;
    html += `
            <div class="swiper-slide tools-menu-item" style="--custom_color:${colorCategoria}">
            <div class="menu-item-icon">
              <i class="bc-icon">
                ${iconoCategoria}
              </i>
            </div>
            <div class="menu-item-link">
              <a href="${pathname}#${urlCategoria}" data-uuid="${uuid}" data-color="${colorCategoria}">${nombreCategoria}</a>
            </div>
          </div>
      `;
  });
  swiperInstance.addSlide(1, html);
  getItemMenu();
};

// Activate the swiper in the tools menu
const activateSwiperToolsMenu = () => {
  const swiperToolsMenu = new Swiper(".swipper-tools-menu", {
    slidesPerView: "auto",
    slidesPerView: 6,
    noSwiping: true,
    noSwipingClass: "swiper-slide",
    navigation: {
      nextEl: ".button-next-tools",
      prevEl: ".button-prev-tools",
    },
    // Responsive breakpoints
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 2.3,
        noSwiping: false,
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 3,
        noSwiping: false,
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 4,
      },
      // when window width is >= 640px
      768: {
        slidesPerView: 4,
      },
      // when window width is >= 992px
      992: {
        slidesPerView: 5,
      },
      // when window width is >= 1200px
      1200: {
        slidesPerView: 6,
      },
    },
    on: {
      slideChange: () => {
        getActiveSlide(swiperToolsMenu);
      },
    },
  });
  return swiperToolsMenu;
};

// Check the active slide of the swiper
const getActiveSlide = (swiperInstance) => {
  const slidesArray = Array.from(swiperInstance.slides);
  slidesArray.forEach((value, i) => {
    if (value.classList.contains("menu-item-active")) {
      hiddenGradient(i + 1, swiperInstance);
    }
  });
};

//Hide the Gradient when the menu item is active
const hiddenGradient = (slidePosition, swiperInstance) => {
  const slidePositionPrev = swiperInstance.activeIndex + 1;
  const slidePositionNext =
    swiperInstance.params.slidesPerView + swiperInstance.activeIndex;
  if (slidePosition === slidePositionPrev) {
    swiperInstance.navigation.prevEl.classList.add("hidden-gradient");
  } else if (slidePosition === slidePositionNext) {
    swiperInstance.navigation.nextEl.classList.add("hidden-gradient");
  } else {
    swiperInstance.navigation.prevEl.classList.remove("hidden-gradient");
    swiperInstance.navigation.nextEl.classList.remove("hidden-gradient");
  }
};

// Activate the sticky in the tools menu
const activateStickyToolsMenu = () => {
  const windowScroll = window.pageYOffset;
  const toolsMenu = document.querySelector(".tools-menu");
  if (windowScroll >= toolsMenu.offsetTop) {
    toolsMenu.classList.add("sticky-tools-menu");
  } else {
    toolsMenu.classList.remove("sticky-tools-menu");
  }
};

// Get the click of each menu item
const getItemMenu = () => {
  const menuItemLink = document.querySelectorAll(".menu-item-link");
  menuItemLink.forEach((itemMenu) => {
    itemMenu.addEventListener(
      "click",
      () => {
        aux = 0;
        menuItemLink.forEach((itemMenu) => {
          itemMenu.parentElement.classList.remove("menu-item-active");
        });
        itemMenu.parentElement.classList.add("menu-item-active");
        filterTools(itemMenu.children[0].dataset);
      },
      false
    );
  });
};

// Filter cards by selected category
const filterTools = async ({ uuid, color }) => {
  const { cardsHerramientas } = await getDataCaass();
  const result = cardsHerramientas.filter((item) => {
    return item.listaCategorias.some((category) => category.uuid === uuid);
  });
  showDataHtmlCards(result, color);
};

// Show the content and html of the tools menu
const showDataHtmlCards = (cards, colorCategory) => {
  const financialCards = document.querySelector(
    ".container-tools .bc-container #rows-tools #rows-financial"
  );
  const notFinancialCards = document.querySelector(
    ".container-tools .bc-container #rows-tools #rows-notFinancial"
  );

  cards.sort((a, b) => a.productoNoFinanciero - b.productoNoFinanciero);
  let htmlFinancials = "";
  let htmlNotFinancials = "";

  cards.forEach((itemCard) => {
    const htmlListCategory = getCategoryList(itemCard);
    const { uuid, tituloCard, textoCard, urlCard, productoNoFinanciero } =
      itemCard;
    productoNoFinanciero
      ? (htmlNotFinancials += getCard({
          tituloCard,
          textoCard,
          htmlListCategory,
          colorCategory,
          urlCard
        }))
      : (htmlFinancials += getCard({
          tituloCard,
          textoCard,
          htmlListCategory,
          urlCard
        }));
  });
  financialCards.innerHTML = htmlFinancials;
  notFinancialCards.innerHTML = htmlNotFinancials;
  BcTooltipBehavior.setUpAll();
  showMoreTools();
};

const showMoreTools = () => {
  const numberCards= 6;
  const cardsTools = document.querySelectorAll('.container-tools .bc-container #rows-tools .card-item.bc-d-none');
  const cardsArray = Array.from(cardsTools).slice(0, numberCards);
  cardsArray.forEach(card => {
    card.classList.remove("bc-d-none");
    card.classList.add("bc-d-none-card");
  });
  if (cardsTools.length <= numberCards) {
    btnMoreTools.classList.add("bc-d-none");
  } else {
    btnMoreTools.classList.remove("bc-d-none");
  }
};

// Create HTML of Card
const getCard = ({
  tituloCard,
  textoCard,
  htmlListCategory,
  colorCategory,
  urlCard
}) => {
  console.log(urlCard);
  if(urlCard != 0){
    return `
    <div class="bc-col-md-6 bc-col-xl-4 bc-col-lg-4 bc-col-sm-6 bc-col-xs-6 bc-my-2 bc-px-2 card-item bc-d-none">
      <a class="card-link" href="${urlCard | '#'}">
        <div class="bc-card bc-card-tools bc-direction-column bc-h-100" style="background-color: ${
          colorCategory ? colorCategory : "#fff"
        }">
          <h5 id="titleCard">
            ${tituloCard}
          </h5>
          <p id="textCard">
            ${textoCard}
          </p>
          <div class="categories-tools bc-d-flex bc-flex-wrap bc-h-100 bc-align-items-flex-end">
            ${htmlListCategory}
          </div>
        </div>
      </a>
    </div>`;
  }
  else{
    return `
    <div class="bc-col-md-6 bc-col-xl-4 bc-col-lg-4 bc-col-sm-6 bc-col-xs-6 bc-my-2 bc-px-2 card-item bc-d-none">
      <a class="card-link">
        <div class="bc-card bc-card-tools bc-direction-column bc-h-100" style="background-color: ${
          colorCategory ? colorCategory : "#fff"
        }">
          <h5 id="titleCard">
            ${tituloCard}
          </h5>
          <p id="textCard">
            ${textoCard}
          </p>
          <div class="categories-tools bc-d-flex bc-flex-wrap bc-h-100 bc-align-items-flex-end">
            ${htmlListCategory}
          </div>
        </div>
      </a>
    </div>`;
  }

};

// Shows the html of the list of categories of each card
const getCategoryList = ({ listaCategorias }) => {
  return listaCategorias
    .map((itemCategory) => {
      return `
        <div class="category-tools" style="background-color: ${itemCategory.colorCategoria}">
          <i class="bc-icon bc-tooltip icon-tools" bctooltiptext="${itemCategory.nombreCategoria}" aria-hidden="true" aria-label="prueba" role="img">
            ${itemCategory.iconoCategoria}
          </i>
        </div>
      `;
    })
    .join("\n");
};
