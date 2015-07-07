var $ = jQuery;
$(document).ready(function() {
	$("body").addClass("background-img");
	var characters = [];
	var img_url = ''
	$.getJSON('http://jacobsommerfeld.net/ct-tv/characters.php', '', function(respons) {
	})
	.complete(function(respons) {
		if(respons.responseText!='') {
			characters = respons.responseJSON;
		}
		img_url="http://jacobsommerfeld.net/ct-tv/images/";
	})
	.fail(function( jqxhr, textStatus, error ) {
		alert("Problem loading character data please reload page");
	});
	var episodes = [];
	$.getJSON('http://jacobsommerfeld.net/ct-tv/videos.php', '', function(respons) {
		episodes = respons.items;
		console.log(episodes);
		output = getAllEpisodes(true);
		$("#entry").html(output);
		reset();
	})
	.fail(function() {
		alert("Problem loading data for episodes please reload page");
	});
	$("#video-overlay input").click(function(e) {
		$("#video-overlay").fadeOut(500);
		e.stopPropagation();
	});
	function reset() {
		$('.video-thumb, a[data-target="episode"]').off();
		$('.video-thumb, a[data-target="episode"]').click(function(e) {
			var id = $(this).data('id');
			$("#video-overlay iframe").attr('src', 'https://www.youtube.com/embed/'+id+'?rel=0');
			cur_ep=0;
			while(cur_ep<episodes.length) {
				if(episodes[cur_ep].snippet.resourceId.videoId==id) {
					var text = episodes[cur_ep].snippet.description;
					var title = episodes[cur_ep].snippet.title;
					$("#video-overlay .row h1").html(title);
					$("#video-overlay .row div p").html(text);
					var char_list='';
					var cur_char = 0;
					while(cur_char<characters.length) {
						if(characters[cur_char].episodes.indexOf(id)!=-1) {
							char_list = char_list + '<li><a href="#" data-id="'+cur_char+'" data-target="character">'+characters[cur_char].name+'</a></li>';
						}
						cur_char++;
					}
					char_list = char_list.replace('undefined' ,'');
					$("#video-overlay ul").html(char_list);
				}
				cur_ep++
			}
			$("#video-overlay").delay(500).fadeIn(500);
			e.stopPropagation();
			reset();
		});
		$("nav a").off();
		$("nav a").click(function(e) {
			if($(this).data('nav')=='welcome') {
				var output = '<h1 class="col-lg-12">Welcome</h1>'+getAllEpisodes(true);
				$("#entry").html(output);
				$("#welcome-message").show();
			} else {
				$("#welcome-message").hide();
				var the_class = $(this).data('nav');
				var the_class_name = $(this).html();
				var output = '<h1 class="col-lg-12">'+the_class_name+'</h1>';
				cur_char=0;
				while(cur_char<characters.length) {
					if(characters[cur_char].class==the_class) {
						output = output + '<div class="col-md-4 col-sm-6 character-thumb" data-id="'+cur_char+'"><h2>'+characters[cur_char].name+'</h2><img src="images/'+characters[cur_char].image+'" alt="'+characters[cur_char].name+'"></div>'
					}
					cur_char++;
				}
				$("#entry").html(output);
			}
			reset();
			e.stopPropagation();
		});
		$('a[data-target="character"]').off();
		$('a[data-target="character"], .character-thumb').click(function(e) {
			$("#welcome-message").hide();
			var id = $(this).data('id');
			var output = '<div class="col-lg-3 col-lg-push-1"><h1>'+characters[id].name+'</h1><img src="images/'+characters[id].image+'" alt="'+characters[id].name+'"><h2>Episodes</h2><ul>';
			var cur_ep=0;
			while(cur_ep<episodes.length) {
				var ep_id = episodes[cur_ep].snippet.resourceId.videoId;
				if(characters[id].episodes.indexOf(ep_id)!=-1) {
					output = output + '<li><a href="#" data-target="episode" data-id="'+ep_id+'">'+episodes[cur_ep].snippet.title+'</a></li>';
				}
				cur_ep++;
			}
			output = output + '</ul></div><div class="col-lg-4 col-lg-push-2"><h2>Biography</h2><p>'+characters[id].bio+'</p></div>';
			$("#entry").html(output);
			$("#video-overlay").fadeOut(500);
			reset();
			e.stopPropagation();
		});
	}
	function getAllEpisodes(thumb) {
		var output;
		if(thumb==false) {
			output = '<h2>Episodes</h2><ul>';
		} else {
		}
		var i=0
		while(i<episodes.length) {
			var episode_id = episodes[i].snippet.resourceId.videoId;
			ep_thumb = episodes[i].snippet.thumbnails.high.url;
			var episode_title = episodes[i].snippet.title;
			if(thumb==false) {
				output = output + '<li><a href="#" data-id="'+episode_id+'" data-target="episode">'+episode_title+'</a></li>';
			} else {
				output = output + '<div class="col-md-4 col-sm-6 video-thumb" data-id="'+episode_id+'"><h2>'+episode_title+'</h2><img src="'+ep_thumb+'" alt="'+episode_title+'"></div>';
			}
				
			i++
		}
		if(thumb==false) {
			output = output +'</ul>';
		}
		output = output.replace('undefined', '');
		return output;
	}
});