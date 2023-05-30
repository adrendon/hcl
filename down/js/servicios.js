//funcion de url de servicos
function urlService() {
    var dominio = document.domain;
    var urls = {};
    switch (dominio) {
        case 'dev.grupobancolombia.com':
            urls = {
                production: false,
                url: 'https://external-dev.apps.ambientesbc.com/portal-contenidos',
                URL_SERVICIOS: document.location.origin,
                captch: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
            }
            break;
        case 'qa.grupobancolombia.com':
            urls = {
                production: false,
                url: 'https://external-qa.apps.ambientesbc.com/portal-contenidos',
                URL_SERVICIOS: document.location.origin,
                captch: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
            }
            break;
        case 'www.grupobancolombia.com':
            urls = {
                production: false,
                url: 'https://external.apps.bancolombia.com/portal-contenidos',
                URL_SERVICIOS: document.location.origin,
                captch: '6LfbNqUUAAAAAIbyE8MWg6uRBh3VGQKoFYUOMqoB'
            }
            break;
        case 'www.bancolombia.com':
            urls = {
                production: false,
                url: 'https://external.apps.bancolombia.com/portal-contenidos',
                URL_SERVICIOS: document.location.origin,
                captch: '6LfPRoYaAAAAACwmLcTtEzXP_gtPIFVlCtUT1X40'
            }
            break;
        default:
            urls = null;
            break;
    }
    return urls;
}
//funcion de url de servicos OU
function urlServiceOU() {
    var dominioOu = document.domain;
    var urlsOu = {};
    switch (dominioOu) {
        case 'dev.grupobancolombia.com':
            urlsOu = {
                production: false,
                url: 'https://clientes-ext-dev.apps.ambientesbc.com/portal-contenidos',
                URL_SERVICIOS: document.location.origin,
                captch: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
            }
            break;
        case 'qa.grupobancolombia.com':
            urlsOu = {
                production: false,
                url: 'https://clientes-ext-qa.apps.ambientesbc.com/portal-contenidos',
                URL_SERVICIOS: document.location.origin,
                captch: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
            }
            break;
        case 'www.grupobancolombia.com':
            urlsOu = {
                production: false,
                url: 'https://clientes-ext.apps.bancolombia.com/portal-contenidos',
                URL_SERVICIOS: document.location.origin,
                captch: '6LfbNqUUAAAAAIbyE8MWg6uRBh3VGQKoFYUOMqoB'
            }
            break;
        case 'www.bancolombia.com':
            urlsOu = {
                production: false,
                url: 'https://clientes-ext.apps.bancolombia.com/portal-contenidos',
                URL_SERVICIOS: document.location.origin,
                captch: '6LfPRoYaAAAAACwmLcTtEzXP_gtPIFVlCtUT1X40'
            }
            break;
        default:
            urlsOu = null;
            break;
    }
    return urlsOu;
}