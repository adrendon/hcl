(function() {
    scrollTo();
})();

function scrollTo() {
    const links = document.querySelectorAll('.anclas-boton');
    links.forEach(each => (each.onclick = scrollAnchors));
}

function scrollAnchors(e, respond = null) {
    const distanceToTop = el => Math.floor(el.getBoundingClientRect().top);
    e.preventDefault();
    var targetID = (respond) ? respond.getAttribute('data-target') : this.getAttribute('data-target');
    const targetAnchor = document.querySelector(targetID);
    if (!targetAnchor) return;
    const originalTop = distanceToTop(targetAnchor);
    window.scrollBy({ top: originalTop, left: 0, behavior: 'smooth' });
    const checkIfDone = setInterval(function() {
        const atBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
        if (distanceToTop(targetAnchor) === 0 || atBottom) {
            targetAnchor.tabIndex = '-1';
            targetAnchor.focus();
            /* window.history.pushState('', '', targetID); */
            clearInterval(checkIfDone);
        }
    }, 100);
}

// if (document.querySelector('#personas-tab')) {

//     document.querySelector('#personas-tab').addEventListener('click', function (e) {
//         console.log("target1", e.target);
//         if (e.target.classList.contains('active')) { } else {
//             document.querySelector('#subtitle').classList.remove('hidden');
//             document.querySelector('#subtitle1').classList.add('hidden');
//         }
//     });
// }

// if (document.querySelector('#negocios-tab')) {
//     document.querySelector('#negocios-tab').addEventListener('click', function (f) {
//         console.log("target12", f.target);
//         if (f.target.classList.contains('active')) {
//             console.log("HAVE A CLASS")
//          } else {
//             document.querySelector('#subtitle').classList.add('hidden');
//             document.querySelector('#subtitle1').classList.remove('hidden');

//         }
//     });
// }

function selector(elemento) {
    let tabContent = document.querySelector(elemento);
    if (tabContent) {
        console.log("console", elemento, "otro", tabContent)
        tabContent.classList.add('show');
        tabContent.classList.add('active');
    }
}


// new codigo
let TabsByron = document.querySelectorAll(".tab-menu-360");
let TabsContentCachon = document.querySelectorAll(".tab-content-360");

function ClassRemove(array) {
    array.forEach((element) => {
        if (
            element.classList.contains("active") &&
            element.classList.contains("show")
        ) {
            element.classList.remove("active", "show");
        }
    });
}
TabsByron.forEach((obj) => {
    console.log("tabs", obj)
    obj.addEventListener("click", function(e) {
        console.log("CLICKKKK")
        e.preventDefault();
        let idTab = e.currentTarget.getAttribute("href")
        ClassRemove(TabsByron);
        ClassRemove(TabsContentCachon)
        e.currentTarget.classList.add("active", "show");
        let idTabContent = document.querySelector(idTab);

        idTabContent.classList.add("active", "show");
    });
});
// end new codigo


selector("#movilidad #nav-personas-1");
selector("#movilidad #nav-tab a");

selector("#inmobiliario #nav-personas-inmobiliario-1");
selector("#inmobiliario #nav-tab a");

selector("#content-tabs #contenido-tab-1");
selector("#tabs-options .nav-tabs a");

selector("#content-tabs #contenido-tab-1 .nav-tabs a");
selector("#content-tabs #contenido-tab-1 #nav-tu360-constructor-1");

var swiper = new Swiper(".swiper-container", {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: false,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        640: {
            slidesPerView: 1,
            spaceBetween: 0,
        },
        768: {
            slidesPerView: 4,
            spaceBetween: 0,
        },
        1024: {
            slidesPerView: 4,
            spaceBetween: 0,
        },
    },
});
let hash = location.hash;
let tabsclick = document.querySelectorAll('a.nav-link.tabs__item.nunito.font18.tab-menu-360');
if (hash) {
    function clickHandler(e) {
        e.preventDefault();
        // const href = this.getAttribute("href");
        const offsetTop = document.querySelector(hash).offsetTop;

        scroll({
            top: offsetTop,
            behavior: "smooth"
        });
    }

    tabsclick.forEach(element => {
        if (element.getAttribute("href") == hash) {
            // console.log(element);
            element.click()
        }
    });
}
tabsclick.forEach(obj => {
    obj.addEventListener("click", function(e) {
        // alert(e.currentTarget.getAttribute('href'))
        console.log("ADBFHSSDIFSD")
        window.location.hash = e.currentTarget.getAttribute('href');
    })
});


// Menu tab tu360 inmobiliaria
const openTab = (e) => {

    //contenedores de los tabs
    const personasContent = document.getElementById("personas-content");
    const constructorasContent = document.getElementById("constructoras-content");
    const personas = document.getElementById("tabs-personas");
    const constructoras = document.getElementById("tabs-constructoras");

    // el target del elemento tab
    const tabId = e.currentTarget.id
        // lógica del tab
    if (tabId == 'tabs-personas') {
        e.currentTarget.classList.add('active')
        if (constructoras.classList.contains('active')) {
            constructoras.classList.remove('active')
        }
        personasContent.classList.add('openTab');
        if (constructorasContent.classList.contains('openTab')) {
            constructorasContent.classList.remove('openTab')
        }
    }
    if (tabId == 'tabs-constructoras') {
        e.currentTarget.classList.add('active')
        if (personas.classList.contains('active')) {
            personas.classList.remove('active')
        }
        constructorasContent.classList.add('openTab')
        if (personasContent.classList.contains('openTab')) {
            personasContent.classList.remove('openTab')
        }
    }

}



/* Scripts nuevo menu movil tu360  */

const menuMobile = document.getElementById('menuMobile');
const oldButton = document.getElementById('old-mobile-button');
const CloseOldButton = document.getElementById('old-button-close');

const _OpenMobile = () => {
    menuMobile.classList.add('open');
    oldButton.classList.remove('active');
    CloseOldButton.classList.add('active');

}
const _CloseMobile = () => {
    menuMobile.classList.remove('open');
    oldButton.classList.add('active');
    CloseOldButton.classList.remove('active');
}

const _OpenMobileTu360 = () => {
    menuMobile.classList.add('open');
    oldButton.classList.remove('active');
    CloseOldButton.classList.add('active');
    document.querySelector("body").classList.add("modal-open");

}
const _CloseMobileTu360 = () => {
    menuMobile.classList.remove('open');
    oldButton.classList.add('active');
    CloseOldButton.classList.remove('active');
    document.querySelector("body").classList.remove("modal-open");
    $('#modal-inicio').modal('hide');
}

//Modal Términos
const modalTerminos = document.getElementById("layoutModal");
const openModalTerminos = () => {
    modalTerminos.classList.add('open')
}
const closeModalTerminos = () => {
    modalTerminos.classList.remove('open')
}

// Método para abrir el segundo nivel
const openSecondLevel = (e) => {
    // el target del elemento tab
    const secondLvl = e.currentTarget
        // obtengo el hijo del elemento con la clase .tab que necesitamos agregar la clase
    const contenidoOculto = secondLvl.nextElementSibling
        //agregamos la clase con el método toggle al <div> que necesitamos mostrar u ocultar.
    contenidoOculto.classList.toggle('open')

}


// Función para agregar la clase utilizando el método toggle de JS
const openThirdLevel = (e) => {
    // el target del elemento tab
    const thirdLvl = e.currentTarget;
    // obtengo el hijo del elemento con la clase .tab que necesitamos agregar la clase
    const hiddenContent = thirdLvl.children[1];
    const arrowContent = thirdLvl.children[0];
    //agregamos la clase con el método toggle al <div> que necesitamos mostrar u ocultar.
    arrowContent.classList.toggle('open');
    hiddenContent.classList.toggle('open');

}

const styleFuncTest1 = (e) => {
    // el target del elemento tab
    const styleF1 = e.currentTarget
        // obtengo el hijo del elemento con la clase .tab que necesitamos agregar la clase
    const contenido1 = styleF1.nextElementSibling
        //agregamos la clase con el método toggle al <div> que necesitamos mostrar u ocultar.
    contenido1.classList.toggle('test1')

}
const styleFuncTest2 = (e) => {
    // el target del elemento tab
    const styleF2 = e.currentTarget
        // obtengo el hijo del elemento con la clase .tab que necesitamos agregar la clase
    const contenido2 = styleF2.nextElementSibling
        //agregamos la clase con el método toggle al <div> que necesitamos mostrar u ocultar.
    contenido2.classList.toggle('test2')

}

const styleFuncTest3 = (e) => {
    // el target del elemento tab
    const styleF3 = e.currentTarget
        // obtengo el hijo del elemento con la clase .tab que necesitamos agregar la clase
    const contenido3 = styleF3.nextElementSibling
        //agregamos la clase con el método toggle al <div> que necesitamos mostrar u ocultar.
    contenido3.classList.toggle('test3')

}
const styleFuncTest4 = (e) => {
    // el target del elemento tab
    const styleF4 = e.currentTarget
        // obtengo el hijo del elemento con la clase .tab que necesitamos agregar la clase
    const contenido4 = styleF4.nextElementSibling
        //agregamos la clase con el método toggle al <div> que necesitamos mostrar u ocultar.
    contenido4.classList.toggle('test4')

}





//
const hiddenSecondLevel = (e) => {
    const currentLevel = e.currentTarget;
    const hiddenLevel = currentLevel.parentElement;
    hiddenLevel.classList.remove('open');
}

//Menu tab móvil

const openTabMovil = (e) => {

        //contenedores de los tabs
        const contentPersonasTab = document.getElementById("contentPersonasTab");
        const contentConstructorasTab = document.getElementById("contentConstructorasTab");
        const menuTabsPersonas = document.getElementById("menuTabsPersonas");
        const menuTabsConstructoras = document.getElementById("menuTabsConstructoras");

        // el target del elemento tab
        const tabId = e.currentTarget.id
            // lógica del tab
        if (tabId == 'menuTabsPersonas') {
            e.currentTarget.classList.add('active')
            if (menuTabsConstructoras.classList.contains('active')) {
                menuTabsConstructoras.classList.remove('active')
            }
            contentPersonasTab.classList.add('openTab');
            if (contentConstructorasTab.classList.contains('openTab')) {
                contentConstructorasTab.classList.remove('openTab')
            }
        }
        if (tabId == 'menuTabsConstructoras') {
            e.currentTarget.classList.add('active')
            if (menuTabsPersonas.classList.contains('active')) {
                menuTabsPersonas.classList.remove('active')
            }
            contentConstructorasTab.classList.add('openTab')
            if (contentPersonasTab.classList.contains('openTab')) {
                contentPersonasTab.classList.remove('openTab')
            }
        }

    }
    /* ---------------------------------------------- */



const openMegaMenu = () => {

    var isOpen = false;
    var isOpen2 = false;
    var isOpen3 = false;
    var isOpen4 = false;

    const menu1 = document.getElementById('old-link1');
    const menu2 = document.getElementById('old-link2');
    const menu3 = document.getElementById('old-link3');
    const menu4 = document.getElementById('old-link4');

    const subMenu1 = document.getElementById('old-link-content1');
    const subMenu2 = document.getElementById('old-link-content2');
    const subMenu3 = document.getElementById('old-link-content3');
    const subMenu4 = document.getElementById('old-link-content4');

    const bannerP = document.getElementById('banner');
    
    const cerrar1 = document.getElementById('cerrar-link1');

    cerrar1.addEventListener("click", function(e) {
        subMenu1.classList.remove('open');
        isOpen = false;
        document.getElementById("ah1").classList.remove("actived")
        document.getElementById("ah0").classList.add("actived")
    })
    const cerrar2 = document.getElementById('cerrar-link2');
    cerrar2.addEventListener("click", function(e) {
        subMenu2.classList.remove('open');
        isOpen2 = false;
        document.getElementById("ah2").classList.remove("actived")
        document.getElementById("ah0").classList.add("actived")
    })
    const cerrar3 = document.getElementById('cerrar-link3');
    cerrar3.addEventListener("click", function(e) {
        subMenu3.classList.remove('open');
        isOpen3 = false;
        document.getElementById("ah3").classList.remove("actived")
        document.getElementById("ah0").classList.add("actived")
    })
    const cerrar4 = document.getElementById('cerrar-link4');
    cerrar4.addEventListener("click", function(e) {
        subMenu4.classList.remove('open');
        isOpen4 = false;
        document.getElementById("ah04").classList.remove("actived")
        document.getElementById("ah0").classList.add("actived")
    })

    menu1.addEventListener("click", function(e) {
        // e.preventDefault();
        if (!isOpen) {
            // bannerP.addEventListener("click", function(e) {
                subMenu1.classList.remove('open');
                isOpen = false;
                document.getElementById("ah0").classList.add("actived")
                document.getElementById("ah1").classList.remove("actived")
            // })
            isOpen = true;
            isOpen2 = false;
            isOpen3 = false;
            isOpen4 = false;
            subMenu1.classList.add('open');
            subMenu2.classList.remove('open');
            subMenu3.classList.remove('open');
            subMenu4.classList.remove('open');

            document.getElementById("ah1").classList.add("actived")
            document.getElementById("ah0").classList.remove("actived")
            document.getElementById("ah2").classList.remove("actived")
            document.getElementById("ah04").classList.remove("actived")
            document.getElementById("ah3").classList.remove("actived")
        } else {
            isOpen = false;
            subMenu1.classList.remove('open');
            document.getElementById("ah1").classList.remove("actived")
            document.getElementById("ah0").classList.add("actived")
        }
    });

    menu2.addEventListener("click", function(e) {
        // e.preventDefault();
        if (!isOpen2) {
            // bannerP.addEventListener("click", function(e) {
                subMenu2.classList.remove('open');
                isOpen2 = false;
                document.getElementById("ah0").classList.add("actived")
                document.getElementById("ah2").classList.remove("actived")
            // })
            isOpen = false;
            isOpen2 = true;
            isOpen3 = false;
            isOpen4 = false;
            subMenu2.classList.add('open');
            subMenu1.classList.remove('open');
            subMenu3.classList.remove('open');
            subMenu4.classList.remove('open');

            document.getElementById("ah2").classList.add("actived")
            document.getElementById("ah0").classList.remove("actived")
            document.getElementById("ah1").classList.remove("actived")
            document.getElementById("ah04").classList.remove("actived")
            document.getElementById("ah3").classList.remove("actived")
        } else {
            isOpen2 = false;
            subMenu2.classList.remove('open');
            document.getElementById("ah2").classList.remove("actived")
            document.getElementById("ah0").classList.add("actived")
        }
    });

    menu3.addEventListener("click", function(e) {
        // e.preventDefault();
        if (!isOpen3) {
            // bannerP.addEventListener("click", function(e) {
                subMenu3.classList.remove('open');
                isOpen3 = false;
                document.getElementById("ah0").classList.add("actived")
                document.getElementById("ah3").classList.remove("actived")
            // })
            isOpen = false;
            isOpen2 = false;
            isOpen4 = false;
            isOpen3 = true;
            subMenu3.classList.add('open');
            subMenu1.classList.remove('open');
            subMenu2.classList.remove('open');
            subMenu4.classList.remove('open');

            document.getElementById("ah3").classList.add("actived")
            document.getElementById("ah0").classList.remove("actived")
            document.getElementById("ah1").classList.remove("actived")
            document.getElementById("ah2").classList.remove("actived")
            document.getElementById("ah04").classList.remove("actived")
        } else {
            isOpen3 = false;
            subMenu3.classList.remove('open');
            document.getElementById("ah3").classList.remove("actived")
            document.getElementById("ah0").classList.add("actived")
        }
    });

    menu4.addEventListener("click", function(e) {
        // e.preventDefault();
        if (!isOpen4) {
            // bannerP.addEventListener("click", function(e) {
                subMenu4.classList.remove('open');
                isOpen4 = false;
                document.getElementById("ah0").classList.add("actived")
                document.getElementById("ah04").classList.remove("actived")
            // })
            isOpen = false;
            isOpen2 = false;
            isOpen3 = false;
            isOpen4 = true;
            subMenu4.classList.add('open');
            subMenu3.classList.remove('open');
            subMenu1.classList.remove('open');
            subMenu2.classList.remove('open');

            document.getElementById("ah04").classList.add("actived")
            document.getElementById("ah0").classList.remove("actived")
            document.getElementById("ah2").classList.remove("actived")
            document.getElementById("ah1").classList.remove("actived")
            document.getElementById("ah3").classList.remove("actived")
        } else {
            isOpen4 = false;
            subMenu4.classList.remove('open');
            document.getElementById("ah04").classList.remove("actived")
            document.getElementById("ah0").classList.add("actived")
        }
    });


}
openMegaMenu();



//TABS HOME TU360

document.addEventListener('DOMContentLoaded', function() {

    //Movilidad
    const movilidadPersonasTab = document.querySelectorAll('#movilidad #personas-tab');
    const movilidadNegociosTab = document.querySelectorAll('#movilidad #negocios-tab');

    const personasContentTab = document.getElementById('personas');
    const negociosContentTab = document.getElementById('negocios');

    const tabPanes1 = document.querySelectorAll('#myTabContenido1 .tab-pane');
    const tabPanes2 = document.querySelectorAll('#myTabContenido2 .tab-pane');

    const personasContentImages = document.getElementById('myTabContenido1');
    const negociosContentImages = document.getElementById('myTabContenido2');


    const linkTabs1 = document.querySelectorAll('#personas .nav-item');
    const linkTabs2 = document.querySelectorAll('#negocios .nav-item');

    //Inmobiliaria
    const inmobiliariaPersonasTab = document.querySelectorAll('#inmobiliario #personas-tab');
    const inmobiliariaNegociosTab = document.querySelectorAll('#inmobiliario #negocios-tab');

    const inmobiliariaPersonasContentTab = document.getElementById('personas-inmobiliario');
    const inmobiliariaNegociosContentTab = document.getElementById('negocios-inmobiliario');

    const inmobiliariaTabPanes1 = document.querySelectorAll('#inmobiliario #myTabContenido3 .tab-pane');
    const inmobiliariaTabPanes2 = document.querySelectorAll('#inmobiliario #myTabContenido4 .tab-pane');

    const inmobiliariaPersonasContentImages = document.getElementById('myTabContenido3');
    const inmobiliariaNegociosContentImages = document.getElementById('myTabContenido4');

    const inmobiliariaLinkTabs1 = document.querySelectorAll('#personas-inmobiliario .nav-item');
    const inmobiliariaLinkTabs2 = document.querySelectorAll('#negocios-inmobiliario .nav-item');

    const tabPane = document.getElementById('myTabContenido3');



    const addWrapContentMovilidad = () => {
        const myTabContenido1Tabs = document.querySelectorAll('#myTabContenido1 .tab-pane');
        const myTabContenido2Tabs = document.querySelectorAll('#myTabContenido2 .tab-pane');

        for (let index = 0; index < myTabContenido1Tabs.length; index++) {
            const element = myTabContenido1Tabs[index];
            console.log("element", element)
            if (element.id.startsWith('nav-negocios')) {
                element.remove();
            }
            console.log("element2", element)
        }
        for (let index = 0; index < myTabContenido2Tabs.length; index++) {
            const element = myTabContenido2Tabs[index];
            console.log("element", element)
            if (element.id.startsWith('nav-personas')) {
                element.remove();
            }
            console.log("element2", element)
        }
    }
    const addWrapContentInmobiliario = () => {
        const myTabContenido3Tabs = document.querySelectorAll('#myTabContenido3 .tab-pane');
        const myTabContenido4Tabs = document.querySelectorAll('#myTabContenido4 .tab-pane');

        for (let index = 0; index < myTabContenido3Tabs.length; index++) {
            const element = myTabContenido3Tabs[index];
            console.log("element", element)
            if (element.id.startsWith('nav-negocios')) {
                element.remove();
            }
            console.log("element2", element)
        }
        for (let index = 0; index < myTabContenido4Tabs.length; index++) {
            const element = myTabContenido4Tabs[index];
            console.log("element", element)
            if (element.id.startsWith('nav-personas')) {
                element.remove();
            }
            console.log("element2", element)
        }
    }
    addWrapContentMovilidad()
    addWrapContentInmobiliario()
    personasContentImages.classList.add('active');
    const navNegocios = document.getElementById('nav-negocios-1');
    navNegocios.classList.add('active');
    //tabPanes2[0].classList.add('active');
    linkTabs1[0].classList.remove('show');
    tabPanes1[0].classList.remove('show');
    inmobiliariaTabPanes1[0].classList.remove('show')
    inmobiliariaLinkTabs1[0].classList.remove('show')
    inmobiliariaPersonasContentImages.classList.add('active');
    inmobiliariaTabPanes2[0].classList.add('active');
    const navNegociosInmo = document.getElementById('nav-negocios-inmobiliario-1');
    // const navPersonasInmo = document.getElementById('nav-personas-inmobiliario-2');
    // navPersonasInmo.classList.add('active');
    navNegociosInmo.classList.add('active');
    linkTabs2[0].classList.add('active');
    inmobiliariaLinkTabs1[0].classList.add('active');
    inmobiliariaLinkTabs2[0].classList.add('active');


    const movilidadPersonasTabFunction = (e) => {
        e.preventDefault();
        if (personasContentTab.classList.contains('active')) {
            return
        }
        negociosContentTab.classList.remove('active');
        movilidadNegociosTab[0].classList.remove('active');
        negociosContentImages.classList.remove('active');
        movilidadPersonasTab[0].classList.add('active');
        personasContentTab.classList.add('active');
        personasContentImages.classList.add('active');


    }
    const movilidadNegociosTabFunction = (e) => {
        e.preventDefault();
        if (negociosContentTab.classList.contains('active')) {
            return
        }
        personasContentTab.classList.remove('active');
        movilidadPersonasTab[0].classList.remove('active');
        personasContentImages.classList.remove('active');
        movilidadNegociosTab[0].classList.add('active');
        negociosContentTab.classList.add('active');
        negociosContentImages.classList.add('active');
    }

    const contentImagesFunction1 = (e) => {
        if (e.target.classList.contains('active')) {
            return
        }
        for (let index = 0; index < linkTabs1.length; index++) {
            const element = linkTabs1[index];
            element.classList.remove('active');
        }
        e.target.classList.add('active');
        for (let index = 0; index < tabPanes1.length; index++) {
            const element = tabPanes1[index];
            element.classList.remove('active');
            let href = e.target.attributes[1].nodeValue.replace(/^./, "");
            if (href === element.id) {
                element.classList.add('active');
            }
        }
    }
    const contentImagesFunction2 = (e) => {
        if (e.target.classList.contains('active')) {
            return
        }
        for (let index = 0; index < linkTabs2.length; index++) {
            const element2 = linkTabs2[index];
            element2.classList.remove('active');
        }
        e.target.classList.add('active');
        for (let index = 0; index < tabPanes2.length; index++) {
            const element = tabPanes2[index];
            element.classList.remove('active');
            let href = e.target.attributes[1].nodeValue.replace(/^./, "");
            if (href === element.id) {
                element.classList.add('active');
            }
        }
    }
    for (let index = 0; index < linkTabs1.length; index++) {
        const element = linkTabs1[index];
        element.onclick = contentImagesFunction1;
    }
    for (let index = 0; index < linkTabs2.length; index++) {
        const element = linkTabs2[index];
        element.onclick = contentImagesFunction2;
    }

    //Inmobiliaria
    const inmobiliariaPersonasTabFunction = (e) => {
        e.preventDefault();
        if (inmobiliariaPersonasContentTab.classList.contains('active')) {
            return
        }
        inmobiliariaNegociosContentTab.classList.remove('active');
        inmobiliariaNegociosTab[0].classList.remove('active');
        inmobiliariaNegociosContentImages.classList.remove('active');

        inmobiliariaPersonasTab[0].classList.add('active');
        inmobiliariaPersonasContentTab.classList.add('active');
        inmobiliariaPersonasContentImages.classList.add('active');


    }
    const imobiliariaNegociosTabFunction = (e) => {
        e.preventDefault();
        if (inmobiliariaNegociosContentTab.classList.contains('active')) {
            return
        }
        inmobiliariaPersonasContentTab.classList.remove('active');
        inmobiliariaPersonasTab[0].classList.remove('active');
        inmobiliariaPersonasContentImages.classList.remove('active');

        inmobiliariaNegociosTab[0].classList.add('active');
        inmobiliariaNegociosContentTab.classList.add('active');
        inmobiliariaNegociosContentImages.classList.add('active');
    }

    const contentImagesFunction3 = (e) => {
        console.log("holi")
        if (e.target.classList.contains('active')) {
            console.log("holi")
            return
        }

        for (let index = 0; index < inmobiliariaLinkTabs1.length; index++) {
            const element = inmobiliariaLinkTabs1[index];
            element.classList.remove('active');
        }
        e.target.classList.add('active');
        for (let index = 0; index < inmobiliariaTabPanes1.length; index++) {
            const element = inmobiliariaTabPanes1[index];
            element.classList.remove('active');
            let href = e.target.attributes[1].nodeValue.replace(/^./, "");
            console.log("0", e.target.attributes)
            console.log("1", e.target.attributes[1].nodeValue)
            console.log("2", href)
            console.log("3", element.id)
            if (href === element.id) {
                element.classList.add('active');
            }
        }
    }
    const contentImagesFunction4 = (e) => {
        if (e.target.classList.contains('active')) {
            return
        }
        for (let index = 0; index < inmobiliariaLinkTabs2.length; index++) {
            const element2 = inmobiliariaLinkTabs2[index];
            element2.classList.remove('active');
        }
        e.target.classList.add('active');
        for (let index = 0; index < inmobiliariaTabPanes2.length; index++) {
            const element = inmobiliariaTabPanes2[index];
            element.classList.remove('active');
            let href = e.target.attributes[1].nodeValue.replace(/^./, "");
            if (href === element.id) {
                element.classList.add('active');
            }
        }
    }
    for (let index = 0; index < inmobiliariaLinkTabs1.length; index++) {
        const element = inmobiliariaLinkTabs1[index];
        element.onclick = contentImagesFunction3;
    }
    for (let index = 0; index < inmobiliariaLinkTabs2.length; index++) {
        const element = inmobiliariaLinkTabs2[index];
        element.onclick = contentImagesFunction4;
    }


    movilidadPersonasTab[0].onclick = movilidadPersonasTabFunction;
    movilidadNegociosTab[0].onclick = movilidadNegociosTabFunction;
    inmobiliariaPersonasTab[0].onclick = inmobiliariaPersonasTabFunction;
    inmobiliariaNegociosTab[0].onclick = imobiliariaNegociosTabFunction;

});