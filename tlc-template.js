var fs = require('fs');
var cheerio = require('cheerio');

function appendTemplate($tag, $template){
	
	}

function TemplateModule(tlc){
	var templates = {};
	
	this.loadTemplatesFromFile = function(filename){
		fs.readFile(filename,'utf-8',function(err,result){
			if(err){
				console.error(err);
				}
			else if (result){
				var $ = cheerio.load(result);
				$('[id]').each(function(i,e){
					templates[$(this).attr('id')] = $.html($(this).removeAttr('id'));
					});
				}
			});
		}
	this.loadTemplates = function(htmlString){
		
		var $ = cheerio.load(htmlString);
		$('[id]').each(function(i,e){
			templates[$(this).attr('id')] = $.html($(this).removeAttr('id'));
			});
			
		}
		
	this.tlcModule = {
		translate : function(context){
			var data = context.args('data');
			console.dir(data);
			if(data){
				var templateid = context.args('templateid');
				console.dir(templates);
				var $tag = context.$focus();
				if(templateid){
					console.log(templates[templateid]);
					$tag.append(templates[templateid]);
					console.log('post append');
					console.log($tag.html());
					}
				console.dir(tlc);
				return tlc.run($tag,data);
				}
			else{
				return false;
				}
			},
		append : function(context){
			var templateid = context.args('templateid');
			if(templateid){
				var $tag = context.$focus();
				return $tag.append(templates[templateid].html());
				}
			else{
				return false;
				}
			}
		}
	tlc.addModule('template',this.tlcModule);
	}
	
module.exports = TemplateModule