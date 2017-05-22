
jQuery(document).ready(function() {
	
    /*
        Fullscreen background
    */    
    $.backstretch("assets/img/backgrounds/1.jpg");
    $('#btnKeyCard').hide();
    $('#top-navbar-1').on('shown.bs.collapse', function(){
    	$.backstretch("resize");
    });
    $('#top-navbar-1').on('hidden.bs.collapse', function(){
    	$.backstretch("resize");
    });
    
    /*
        Form validation
    */
    $('.registration-form input, .registration-form textarea').on('focus', function() {
    	$(this).removeClass('input-error');
    });
    
    $('.registration-form').on('submit', function(e) {
    	$(this).find('input, textarea').each(function(){
            e.preventDefault();
    		if( $(this).val() == "" ) {

    			$(this).addClass('input-error');
    		}
    		else {
    			$(this).removeClass('input-error');
    			//create account
				$(this).hide();
				$('#formDesc').text('To simplify Login in the future and easier access on mobile phone, you may add KeyCard Login option');
				$('#btnCreateAcc').hide();
                $('#btnKeyCard').show();
    		}
    	});
    	
    });
    
    
});
