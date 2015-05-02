/*

Customized for Data Science 10
taught by Professor DeNero

Modifications:

1. By default, shift-enter runs all, in place. (bug: jumps down to bottom of page)

*/

define([
     'base/js/namespace',
     'base/js/events'
 ], function(IPython, events) {
     events.on('app_initialized.NotebookApp', function(){
         IPython.toolbar.add_buttons_group([
             {
                 'label'   : 'run qtconsole',
                 'icon'    : 'fa-check-square-o', // select your icon from http://fortawesome.github.io/Font-Awesome/icons
                 'callback': function () {
                    var button = $(this).children('i');
                     if (button.hasClass('fa-square-o')) {
                        button.removeClass('fa-square-o').addClass('fa-check-square-o');
                     } else {
                        button.removeClass('fa-check-square-o').addClass('fa-square-o');
                     }
                 }
             }
             ]);
     });
});

define([
    'base/js/namespace',
    'jquery',
    'base/js/utils',
    'base/js/keyboard',
], function(IPython, $, utils, keyboard) {

    var arrShortCut = [{ name: 'shift-enter', key: 13, fx: shiftEnter }];

    var iShortCutControlKey = 16; // SHIFT;
    var bIsControlKeyActived = false;

    // http://www.sitepoint.com/jquery-capture-multiple-key-press-combinations/
    $(document).keyup(function(e) {
        if (e.which == iShortCutControlKey) bIsControlKeyActived = false;
    }).keydown(function(e) {
        if (e.which == iShortCutControlKey) bIsControlKeyActived = true;
        if (bIsControlKeyActived == true) {
            jQuery.each(arrShortCut, function(i) {
                if (arrShortCut[i].key == e.which) {
                    arrShortCut[i].fx(e);
                    throw '';
                }
            });
        }
    });

    function shiftEnter(e) {
        var cell = $('.cell.code_cell.selected');
        $('#run_all_cells').click();
        cell.click();
//        $(window).scrollTop(0);
    }
})