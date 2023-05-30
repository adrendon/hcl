function seteaLinksActivos(itemAct) {
    document.querySelectorAll("#tabs-menu-horizontal .tab-link").forEach(function (item) {
        if (item !== itemAct) {
            item.classList.remove("activeTab");
        }
    });
  }
  
  function seteaTabsActivos(tabsAct) {
    var selectDoc = document.querySelectorAll('#' + document.querySelector('#tabs-menu-horizontal').dataset.contenedorid +' .tab-panel') || null;
    selectDoc.forEach(function (item) {
        if (item !== tabsAct) {
            item.classList.remove("open-tab");
        }
    });
  }
  
  function verifContTab(tabId) {    
    if (document.querySelector(tabId)) {
        var tabSeleccionado = document.querySelector(tabId);
        seteaTabsActivos(tabSeleccionado);
        tabSeleccionado.classList.add("open-tab");
    } else {
        console.log("No hay tab Configurado");
    }
  }
  
  function activaTabPanel(itemTab) {
    seteaLinksActivos(itemTab);
    var linkTab = itemTab.getAttribute("href");
    itemTab.classList.add("activeTab");
    verifContTab(linkTab);
  } // CHEQUEA QUE SCREEN SEA MENOR A 768 
  
  
  function detectaWidthScreen(window, el) {
    if (window.matches) {
        delete el.dataset.responsive;
    }
    return el;
  } // Espera que cargue el DOM
  
  
  function ready_sc(cargaDOM) {
    // in case the document is already rendered
    if (document.readyState != "loading") cargaDOM(); // modern browsers
    else if (document.addEventListener) document.addEventListener("DOMContentLoaded", cargaDOM); // IE <= 8
    else document.attachEvent("onreadystatechange", function () {
        if (document.readyState == "complete") cargaDOM();
    });
  }
  
  ready_sc(function () {
    var navTabs = document.querySelector("#tabs-menu-horizontal") || null;
    if (navTabs) {
        // Se agrega Id unico al contenedor de tabs
        navTabs.nextElementSibling.setAttribute('id', navTabs.dataset.contenedorid);
        navTabs.querySelectorAll(".tab-link").forEach(function (item) {
            item.addEventListener("click", function (e) {
                e.preventDefault();
                e.stopPropagation();
                activaTabPanel(this);
            }, false);
        });
    }
  });