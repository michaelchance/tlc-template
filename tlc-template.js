var cheerio = require('cheerio');

function appendTemplate($tag, $template){
	
	}

function TemplateModule(){
	var templates = {};
	
	this.loadTemplates = function(htmlString){
		var $ = cheerio.load(htmlString);
		$('[id]').each(function(i,e){
			templates[$(this).attr('id')] = $.html($(this).removeAttr('id'));
			});
			
		}
		
	this.tlcModule = {
		translate : function(context){
			var data = context.args('data');
			//console.dir(data);
			if(data){
				var templateid = context.args('templateid');
				// console.dir(templates);
				// console.log(templateid);
				// console.log(typeof templates[templateid]);
				var r = false;
				if(templateid){
					var $tag = cheerio.load(templates[templateid]);
					//console.log(templates[templateid]);
					//$tag.append(templates[templateid]);
					// console.log('post append');
					r = context.tlc.run($tag,data);
					//console.log(r);
					var html = cheerio.html($tag);
					context.focus(html);
					}
				// console.dir(tlc);
				// var opts = context.opts();
				// console.log(opts);
				return r;
				}
			else{
				return false;
				}
			}
		}
	//console.log(moduleName);
	this.templates = function(){
		return templates;
		}
	}
	
module.exports = TemplateModule