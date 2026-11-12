// скрипт работы спойлеров
$(document).ready(function(){

	// инициируем спойлеры. если не указан класс open то добавляем класс closed
	$('.vlz_spoiler').each(function(){ 
		if ( !$(this).hasClass("open") ) { 
			// $(this).addClass("closed").find('div').hide();
			$(this).addClass("closed").children('div').first().hide();
		}   
	});


	var load_content = null;
	$('.vlz_spoiler>h5').click(function(){
		let load_url = $(this).parent().data('load');
		$(this).parent().toggleClass("closed").toggleClass("open"); // .next().slideToggle("fast")
		let spoiler_body = $(this).next('div');
		spoiler_body.slideToggle("fast");
		if(load_url !== undefined){
			spoiler_body.load(load_url);
		}
	})

	$('.vlz_spoiler .btm_fold').click(function(){
		$(this).parent().parent().toggleClass("closed").toggleClass("open"); // .next().slideToggle("fast")
		$(this).parent().slideToggle("fast");
	})
});//$(document).ready
