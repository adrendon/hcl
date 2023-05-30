<script>

const initialTabAppFilter = 0;
let response = [];
const btnVerMas = document.querySelector('#btn-ver-mas');
const btnVerMenos = document.querySelector('#btn-ver-menos');
var btnVerMasState = true;
var btnVerMenState = false;
var Doc = document;

async function getContent() {
    try {
        const responsePromise = await fetch('https://www.grupobancolombia.com/caass?current=true&urile=wcm:path:bancolombiapersonas/asFormasdepago/asCaas/contTags&mime-type=application/json');
        response = await responsePromise.json();
        
        // document.getElementById("contentTags").innerHTML = "";
        // document.getElementById("bodyFilter").innerHTML = "";
        // document.getElementById("allTags").innerHTML = "";

        let tags = [];
        let listTagsContentAll = [];
        let allItems = [];

        response.tags.forEach(tag => {

            tags += getDivTag(tag);
            
            let tagsContent = [];
            tag.items.forEach(item => {
                tagsContent += getDivElement(item, 'view');
                allItems += getDivElement(item, 'd-none');
            });
            listTagsContentAll += `<div class="contFilter bc-row bc-justify-content-center">${tagsContent}</div>`
        });

        document.getElementById("contentTags").innerHTML = `<span class="filter-text swiper-slide">Filtrar: </span>` + tags;
        document.getElementById("bodyFilter").innerHTML = listTagsContentAll;
        document.getElementById("allTags").innerHTML = allItems;

        let tabsTag =   [...document.querySelectorAll('#contentTags .filterTag')];        
        let tabsAppFilter = [...document.querySelectorAll('#bodyFilter .contFilter')];
        let allTags = document.getElementById("allTags");
        
        

        var mySwiperfilterApp = new Swiper('.swiper-contenedor-appfilter', 
            {
                effect: 'slide',
                slidesPerView: 5,
                noSwiping: true,
                allowSlidePrev: true,
                allowSlideNext: true,
                initialSlide: 0,
                loop: false,
                speed: 600,
                autoplay: false,
                keyboard: false,
                breakpoints: {
                    max: {
                        slidesPerView: 2.2,
                        noSwiping: true,
                        allowSlidePrev: false,
                        allowSlideNext: false,
                        spaceBetween: 0
                    },
                    767: {
                        slidesPerView: 2.2,
                        noSwiping: true,
                        allowSlidePrev: false,
                        allowSlideNext: false,
                        spaceBetween: 0
                    },
                    585: {
                        slidesPerView: 1.67,
                        noSwiping: true,
                        allowSlidePrev: true,
                        allowSlideNext: true,
                        spaceBetween: 0
                    },
                    425: {
                        slidesPerView: 2,
                        noSwiping: true,
                        allowSlidePrev: true,
                        allowSlideNext: true,
                        spaceBetween: 0
                    }
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                }
                
            }
        );

        // tabsTag[0].style.borderBottom = '1px solid #ffd200';
        // tabsAppFilter[0].style.display = 'flex';

        let currentIndex = -1;

        const activeTab = (index) => {

            if (currentIndex === index){
                tabsAppFilter.forEach((el, indexI) => {
                    el.style.display = 'none';
                    tabsTag[indexI].style.background = 'white';
                    tabsTag[indexI].style.color = '#2C2A29';
                    allTags.style.display = 'flex';
                    tabsTag[indexI].lastElementChild.style.display = 'none';
                    currentIndex = -1;
                    if (btnVerMasState){
                        btnVerMas.classList.remove('d-none');
                    }
                    if (btnVerMenState){
                        btnVerMenos.classList.remove('d-none');
                    }
                })
            }else{
                tabsAppFilter.forEach((el, indexI) => {
                    el.style.display = 'none';
                    tabsTag[indexI].style.background = 'white';
                    tabsTag[indexI].style.color = '#2C2A29';
                    tabsTag[indexI].lastElementChild.style.display = 'none';
    
                })
                tabsAppFilter[index].style.display = 'flex';
                tabsTag[index].style.background = '#2C2A29';
                tabsTag[index].style.color = 'white';
                tabsTag[index].lastElementChild.style.display = 'flex';

                allTags.style.display = 'none';
                currentIndex = index;
                btnVerMas.classList.add('d-none');
                btnVerMenos.classList.add('d-none');
            }
            
        }

        tabsTag.forEach((el, index) => {
            el.addEventListener('click', () => {
                activeTab(index)
            })
        });
        verMasGeneral(6)

    } catch (error) {
        throw new Error(error);
    }
}

function getDivTag(tag){
    return `<div class="filterTag swiper-slide">
                <i class="bc-icon">${tag.IconoCat}</i>
                <span>${tag.TituloCat}</span>
                <i class="iconClose-custom bc-icon bc-xs">error</i>
            </div>`
}

function getDivElement(item, classNone) {
    return `<div class="bc-col-md-2 bc-col-sm-3 bc-col-xs-3 item-card-pay ${classNone}">
                <div class="itemfilter">
                    <button class="btn-filter bc-fab-button bc-fab-button-secondary">
                        <i class="bc-icon bc-st">${item.iconName}</i>
                    </button>
                    <p class="title-item">${item.tituloContenido}</p>
                    <a href="${item.url}">${item.linkText}<i class="bc-icon">arrow2-right</i></a>
                </div>
            </div>`;
}

function verMasGeneral(numDiv){
    //Numero de elementos mostrados
    var NUM_RESULT = numDiv;
    // Boton ver mas
    var linkVerMasResultados = document.querySelector('#btn-ver-mas');
    var linkVerMenosResultados = document.querySelector('#btn-ver-menos');
    // Llama la funcion cuando esta cargado el html

    // LLama a mostrar tarjetas al hacer click en ver mas
    var verMasResultados = function() {
        if (linkVerMasResultados) {
            linkVerMasResultados.addEventListener('click', function() { return mostrarResultados(); });
        }
    };
    var verMenosResultados = function() {
        if (linkVerMenosResultados) {
            linkVerMenosResultados.addEventListener('click', function() { return mostrarMenosResultados(); });
        }
    };

    var mostrarMenosResultados = function(){
        var resultadosNodesM = document.querySelectorAll('#allTags .item-card-pay');
        var cardsArrayM = Array.from(resultadosNodesM)
        cardsArrayM.forEach(function(card) {
            card.classList.add('d-none');
        });
        linkVerMasResultados.classList.remove('d-none');
        linkVerMenosResultados.classList.add('d-none');
        btnVerMasState = true;
        btnVerMenState = false;
        mostrarResultados();
    }
    //Funcion para mostrar Preguntas - (7 Preguntas)
    var mostrarResultados = function() {
        // lista Cards - (NodeList)
        var resultadosNodes = document.querySelectorAll('#allTags .item-card-pay.d-none');
        // Convierte la Lista (7 Preguntas) de cards en Array - 
        var cardsArray = Array.from(resultadosNodes).slice(0, NUM_RESULT);
        cardsArray.forEach(function(card) {
            card.classList.remove('d-none');
        });
        // Oculta el boton ver mas
        if (resultadosNodes.length <= NUM_RESULT && linkVerMasResultados) {
            linkVerMasResultados.classList.add('d-none');
            linkVerMenosResultados.classList.remove('d-none');
            btnVerMasState = false;
            btnVerMenState = true;
        }
    };
    mostrarResultados();
    verMasResultados();
    verMenosResultados();
}


getContent();





</script>