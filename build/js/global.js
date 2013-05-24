/**

 * Created with JetBrains WebStorm.

 * User: alex.toledo

 * Date: 10/16/12

 * Time: 2:27 PM

 * To change this template use File | Settings | File Templates.

 */

$(document).ready(function () {

    $('pre').addClass('prettyprint');

    prettyPrint();

    $('.sd-topnav-inner').html($('.sd-sidenav-inner').html());

    // side bar

    $('.sd-sidenav-inner').affix({
        offset: {
            top: function () { return $(window).width() <= 980 ? 100 : 10; }
        }
    });

    $('pre.bad').prepend('<i class="icon-remove icon-white"></i>');

    $('pre.good').prepend('<i class="icon-ok icon-white"></i>');

});