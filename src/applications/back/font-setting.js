/**
 * Enhance the font style for font-family selector
 */
function drag_block_font_family_field() {
    
    $(document).on('click change', 'select[id*=inspector-select-control]', function(){
        // not a font selector
        if (!$(this).find('option[value=Poppins]').length) return;
    
        $(this).find('option').each(function(){
            $(this).css('font-family', $(this).attr('value'));            
        });
    
        $(this).css('font-family', $(this).val()).css('font-size', '20px');;
    });
}

jQuery(function(){
    $ = jQuery;
    drag_block_font_family_field();    
});

