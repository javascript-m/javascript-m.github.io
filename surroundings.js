$(document).ready(function() {
    $('.cont').hide();
    
    $('.cost').click(function() {
        $('tr').removeClass('current');
        $('.cont').hide();

        $(this).children('tr:first').addClass('current');
        $(this).children('.cont').show();
      });
    
    $("input").on("keydown", function (e) {
        return e.which !== 32;
    });
});