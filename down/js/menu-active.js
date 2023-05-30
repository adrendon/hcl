function currentPage() {
    var arrPath = location.pathname.split('/')
    return arrPath[4];
}

if (jQuery('#menu-top')[0]) {
    var page = currentPage();
    if (page) {
        jQuery('#menu-top ul li').each(function() {
            var $this = jQuery(this);

            if ($this.find('a').attr('href').indexOf(page) !== -1) {
                //$this.addClass('active');
            }
        });
    }
}
// $(function() {
//   $(".logoMob img").first().css( "display", "none" );
// });