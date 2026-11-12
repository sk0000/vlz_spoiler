// скрипт работы спойлеров
$(document).ready(function(){

	// инициируем спойлеры. если не указан класс open то добавляем класс closed
	$('.vlz_spoiler').each(function(){ 
		if ( !$(this).hasClass("open") ) { 
			// $(this).addClass("closed").find('div').hide();
			$(this).addClass("closed").children('div').first().hide();
		}   
	});


	$('.vlz_spoiler>h5').click(function(){
		let spoiler = $(this).parent();
		let load_url = spoiler.data('load');
		let load_content = spoiler.data('load_content');
		spoiler.toggleClass("closed").toggleClass("open"); // .next().slideToggle("fast")
		let spoiler_body = $(this).next('div');
		spoiler_body.slideToggle("fast");
		if(load_url !== undefined && spoiler.hasClass("open") && load_content === undefined && !spoiler.data('loading')){
			spoiler.data('loading', true);
			spoiler_body.load(load_url, function(responseText, status){
				spoiler.data('loading', false);
				if(status === 'success' || status === 'notmodified'){
					load_content = responseText;
					spoiler.data('load_content', load_content);
				}else{
					spoiler_body.html('<span class="err_load">Не удалось загрузить содержимое.</span>');
				}
			});
		}
	})

	$('.vlz_spoiler .btm_fold').click(function(){
		$(this).parent().parent().toggleClass("closed").toggleClass("open"); // .next().slideToggle("fast")
		$(this).parent().slideToggle("fast");
	})
});//$(document).ready
