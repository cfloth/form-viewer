/*!
 * jquery.formviewer. The jQuery form view plugin
 *
 * Copyright (c) 2013 Curtis Floth
 * http://movefromcenter.com
 *
 * Licensed under MIT
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Launch  : May 2013
 * Version : 1.0.0-rc1
 */
(function($) {
	$.fn.formviewer = function(settings) {
		var defaults = {
			prefix: 'formviewer-',
			activeclass: 'active'
		};

		//------
		// Convert numbers to words
		// copyright 25th July 2006, by Stephen Chapman http://javascript.about.com
		// permission to use this Javascript on your web page is granted
		// provided that all of the code (including this copyright notice) is
		// used exactly as shown (you can change the numbering system if you wish)

		// American Numbering System
		var th = ['','Thousand','Million', 'Billion','Trillion'];
		// uncomment this line for English Number System
		// var th = ['','thousand','million', 'milliard','billion'];
		var dg = ['Zero','One','Two','Three','Four','Five','Six','Seven','Eight','Nine'];
		var tn = ['Ten','Eleven','Twelve','Thirteen', 'Fourteen','Fifteen','Sixteen', 'Seventeen','Eighteen','Nineteen'];
		var tw = ['Twenty','Thirty','Forty','Fifty','Sixty','Seventy','Eighty','Ninety'];
		function _toWords(s){s = s.toString(); s = s.replace(/[\, ]/g,''); if (s != parseFloat(s)) return 'Not a Number'; var x = s.indexOf('.'); if (x == -1) x = s.length; if (x > 15) return 'Too Big'; var n = s.split(''); var str = ''; var sk = 0; for (var i=0; i < x; i++) {if ((x-i)%3==2) {if (n[i] == '1') {str += tn[Number(n[i+1])] + ' '; i++; sk=1;} else if (n[i]!=0) {str += tw[n[i]-2] + ' ';sk=1;}} else if (n[i]!=0) {str += dg[n[i]] +' '; if ((x-i)%3==0) str += 'Hundred ';sk=1;} if ((x-i)%3==1) {if (sk) str += th[(x-i-1)/3] + ' ';sk=0;}} if (x != s.length) {var y = s.length; str += 'Point '; for (var i=x+1; i<y; i++) str += dg[n[i]] +' ';} return str.replace(/\s+/g,' ');}
		//------

		function _addCommas(s) {
			try {
				var reg_s = (s == undefined) ? '' : s.replace(/\D/g,'');
				return reg_s.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
			} catch(e) {
				return s;
			}
		}

		if(!settings || typeof settings !== 'object') settings = {};
		if (typeof settings.prefix === 'string') defaults.prefix = settings.prefix;
		if (typeof settings.activeclass === 'string') defaults.activeclass = settings.activeclass;

		function _doDefault(src, outterObj) {
			if ($(src).val() !== '') {
				//value of the input field is priority default
				jQuery.data(src, 'data-domview-default', $(src).val());
			}else{
				var val = $(outterObj).find('.' + defaults.prefix + $(src).attr('id')).html();
				if (val !== '') {
					//value of the html object is second priority default
					jQuery.data(src, 'data-domview-default', val);
				}else{
					jQuery.data(src, 'data-domview-default', '');
				}
			}
		}

		function _doUpdate(src, outterObj) {
			var val = $(src).val();
			var dataDefault = jQuery.data(src, 'data-domview-default');
			if (val !== '') {
				//cycle through each target, adjusting formatting if classes exist
				$(outterObj).find('.' + defaults.prefix + $(src).attr('id')).each(function() {
					if ($(this).hasClass(defaults.prefix+'towords')) {
						$(this).html(_toWords(val));
					}else{
						if ($(this).hasClass(defaults.prefix+'addcommas')) {
							$(this).html(_addCommas(val));
						}else{
							$(this).html(val);
						}
					}
				});
			}else{
				//empty, set the HTML to the default
				$(outterObj).find('.' + defaults.prefix + $(src).attr('id')).html(dataDefault);
			}
		}

		$.each(this,function() {
			var outterObj = $(this);
			// for each input field in each form
			$(this).find('input').each(function () {
				// see if there is a matching DOM element ()
				var target = $(outterObj).find('.' + defaults.prefix + $(this).attr('id'));
				if (target.length) {
					// set the default value
					_doDefault(this, outterObj);
					_doUpdate(this, outterObj);

					// bind a keyup method to update the DOM element
					$(this).keyup(function() {
						var val = $(this).val();
						_doUpdate(this, outterObj);
					});

					// handle the adding and removing of the hightlight color
					$(this).focus(function() {
						$(outterObj).find('.' + defaults.prefix + $(this).attr('id')).addClass(defaults.prefix + defaults.activeclass);
					});
					$(this).blur(function() {
						$(outterObj).find('.' + defaults.prefix + $(this).attr('id')).removeClass(defaults.prefix + defaults.activeclass);
						_doUpdate(this, outterObj);
					});
				}
			});
		});
	};

})(jQuery);
