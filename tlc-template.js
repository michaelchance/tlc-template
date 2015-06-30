var fs = require('fs');
var cheerio = require('cheerio');

function appendTemplate($tag, $template){
	
	}

function TemplateModule(tlc, moduleName){
	moduleName = moduleName || "template"
	var templates = {};
	
	this.loadTemplatesFromFile = function(filename){
		fs.readFile(filename,'utf-8',function(err,result){
			if(err){
				// console.error(err);
				}
			else if (result){
				var $ = cheerio.load(result);
				$('[id]').each(function(i,e){
					//console.log($(this).attr('id'));
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
					r = tlc.run($tag,data);
					//console.log(r);
					context.$focus().append($tag.html());
					}
				// console.dir(tlc);
				// var opts = context.opts();
				// console.log(opts);
				return r;
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
	tlc.addModule(moduleName,this.tlcModule);
	//console.log(moduleName);
	this.templates = function(){
		return templates;
		}
	}
	
module.exports = TemplateModule