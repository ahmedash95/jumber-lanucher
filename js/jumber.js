'use strict';

/**
 * Jumber
 *
 * This file is part of the Jumber; an opensource Google Chrome extension
 * http://github.com/ahmedash95/jumber-lanucher
 *
 * MIT (c) Ahmed Ashraf <ahmed29329@gmail.com>
 */
(function(){

	// Actions
	function getActions() {
		return {
			url : {
				image: 'https://image.flaticon.com/icons/svg/1034/1034507.svg',
				text: '#input#',
				isValid: function(val) {
					var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
					  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
					  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
					  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
					  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
					  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
					 return pattern.test(val);
				},
				execute: function(val) {
					return 'window.open(\''+ val +'\',\'_blank\');';
				}
			},
			google : {
				image: 'https://image.flaticon.com/icons/svg/281/281764.svg',
				text: 'Search Google for \'#input#\'',
				execute: function(val) {
					return 'window.open(\'https://www.google.com/search?q='+val+'\',\'_blank\');';
				}
			}
		}
	}

	function listenForInput(){
		var self = this;
		$('body').find('#jumber-input').on('input',function(){
        	let el = $(this);
        	let input = el.val();
        	let results = [];
        	let actionsList = getActions();
        	Object.keys(actionsList).forEach(function(action){
        		let a = actionsList[action];
        		if(a.isValid && !a.isValid(input)) {
        			return;
        		}
        		a.actionName = action;
        		a.text = a.text.replace('#input#',input);
        		results.push(a);
        	})
        	let html = buildResultsHtml(results,input)
        	$('#jumber-list').empty().append(html);
        });
	}

	function buildResultsHtml(actions,inputText){
		var output = '';
		actions.forEach(function(item){
			output += '<li class="tab-item" onclick="'+item.execute(inputText)+'">' +
			        '<span class="favicon-img">' +
			        '<img src="'+ item.image +'">' +
			        '</span>' +
			        '<span class="title">'+ item.text +'</span>' +
			        '</li>';
		})
		return output
	}

	function runLanucher(){
		if($('#jumber').length === 0) {
			  var div=document.createElement("div");
			  document.body.appendChild(div);
			  div.innerHTML = '<div class="jumber" id="jumber">' +
			  				 '<input type="text" id="jumber-input" autofocus>' +
			  				 '<ul id="jumber-list" class="actions-list"></ul>' +
			  				 '</div>';

			  $('#jumber-input').focus()
			  $('#jumber-list').on('click','li',function(){
			  		closeLanucher();
			  })

			  listenForInput()
		}
	}

	function closeLanucher(){
		$('#jumber').remove();
	}

    $(document).ready(function () {
        window.runLanucher = runLanucher
        $(document).keyup(function(e) {
		     if (e.key === "Escape") { // escape key maps to keycode `27`
		        closeLanucher()
		    }
		});
    });

}());
