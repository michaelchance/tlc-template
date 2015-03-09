var fs = require('fs');
var cheerio = require('cheerio');

function appendTemplate($tag, $template){
	
	}

var TemplateModule = function(tlc){
	var templates = {};
	
	this.loadTemplatesFromFile = function(filename){
		fs.readFile(filename,function(err,result){
			var $ = cheerio.load(text);
			$('[id]').each(function(i,e){
				templates[$(this).attr('id')] = $(this).removeAttr('id');
				});
			});
		}
	this.loadTemplates = function(htmlString){
		var $ = cheerio.load(htmlString){
			$('[id]').each(function(i,e){
				templates[$(this).attr('id')] = $(this).removeAttr('id');
				});
			}
		}
		
	this.tlcModule = {
		translate : function(tlc){
			var data = tlc.args('data');
			if(data){
				var templateid = tlc.args('templateid');
				if(templateid){
					$tag.append(templates[templateid].html());
					}
				return tlc.run($tag,data);
				}
			else{
				return false;
				}
			},
		append : function(tlc){
			var templateid = tlc.args('templateid');
			if(templateid){
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