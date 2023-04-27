$( document ).ready( function() {
	$(".form-range").each(function(){
		$(this).bootstrapSlider();
		$(this).on("change", function(slideEvt) {
			console.log(slideEvt)
			$(this).parents(".group-form-range").find(".form-range-value").text(slideEvt.value.newValue);
		});
		
	});
	
 } );
