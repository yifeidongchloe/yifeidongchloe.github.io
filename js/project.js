//The project js file is to implement the selection of each project
//Automatically loaded the web content from a xml file 
//Created by ClarkYAN on March13 2019

$(function () { $("[data-toggle='tooltip']").tooltip(); });
$(function() {
        $('.lazy').lazy();
    });

//get the key value
var keyValue = gup('key');
var num = 1;
//var url = window.location.hostname;

function gup(name)
{
 name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
 var regexS = "[\\?&]"+name+"=([^&#]*)";
 var regex = new RegExp( regexS );
 var results = regex.exec( window.location.href );
 if( results == null )
  return "";
else
 return results[1];
}

try //Internet Explorer  
{  
 xmlDoc=new ActiveXObject("Microsoft.XMLDOM");  
 xmlDoc.async=false;  
 xmlDoc.load("project-content.xml");  
 
 displayContent(keyValue);

}  
catch(e)  
{  
 try //Firefox, Mozilla, Opera, etc.  
 {  
  xmlDoc=document.implementation.createDocument("","",null);  
  xmlDoc.async=false;  
  xmlDoc.load("project-content.xml");  
  
  displayContent(keyValue);

 }  
 catch(e)  
 {  
  try //Google Chrome  
  {  
   var xmlhttp = new XMLHttpRequest();  
   xmlhttp.open("GET", "project-content.xml", true);
   xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4) {
        xmlDoc = xmlhttp.responseXML.documentElement;
        displayContent(keyValue);
       }
     }
     
     xmlhttp.send();  
    
  }  
  catch(e)  
  {  
   error=e.message;  
  }  
 }  
}  

function displayContent(num){
	var id = num;
	document.getElementById("project-name").innerHTML = xmlDoc.getElementsByTagName("name")[id].childNodes[0].nodeValue;
	//start the img selection
	var imgLength = getNodeLength("img", id);
	var imgChild = xmlDoc.getElementsByTagName("img")[id];		
    for (var j = 0; j < imgLength; j++){
	    document.getElementById("imgFrame").innerHTML += "<div class='projectImage'><img src='" + imgChild.getElementsByTagName("src")[j].childNodes[0].nodeValue + "' class='img-responsive postImage lazy' alt='' id='img" + j + "' data-toggle='modal' data-target='#img" + j + "Modal'></div>";
	    
	//load the modal img
    //id is the page of image, img id is the order of image
    //img Modal Start
    document.getElementById("imgFrame").innerHTML += "<div class='modal fade text-center' id= 'img" + j + "Modal' tabindex='-1' role='dialog' aria-hidden='true'><div class='modal-dialog modal-lg' style='display:inline-block;width:auto;'><div class='modal-content'><div class='card'><button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button><br /><img src='" + imgChild.getElementsByTagName("src")[j].childNodes[0].nodeValue + "' alt='' style='width:100%'></div></div></div>"; 
	    
    }
    //basic information	
	document.getElementById("category").innerHTML = xmlDoc.getElementsByTagName("cata")[id].childNodes[0].nodeValue;
	document.getElementById("techniques").innerHTML = xmlDoc.getElementsByTagName("tech")[id].childNodes[0].nodeValue;
	document.getElementById("date").innerHTML = xmlDoc.getElementsByTagName("date")[id].childNodes[0].nodeValue;
	document.getElementById("details").innerHTML = xmlDoc.getElementsByTagName("detail")[id].childNodes[0].nodeValue;
    //related links
	var linkLength = getNodeLength("rlink", id);
	var childLink = xmlDoc.getElementsByTagName("rlink")[id];
	if (linkLength > 0){
	    document.getElementById("info").innerHTML += "<h3 class='sidebarprojecttitle'>Related Links</h3><p class='sidebarEntry' id='links'></p>";
		for (var j = 0; j < linkLength; j++){
	    document.getElementById("links").innerHTML += "<a href='" + childLink.getElementsByTagName("link")[j].childNodes[0].nodeValue + "' target='_blank'>" + childLink.getElementsByTagName("link")[j].childNodes[0].nodeValue + "</a>" + "<br/>";
        }
	}      
    
}

function getNodeLength(tag, num){
	var nodeLink = xmlDoc.getElementsByTagName(tag)[num].childNodes; 
	for (var i = 0; i < nodeLink.length; i++){
		//remove the node if there is a space here
       if(nodeLink[i].nodeType == 3 && /\s/.test(nodeLink[i].nodeValue)){
          nodeLink[i].parentNode.removeChild(nodeLink[i]);       
       }
	}
	return nodeLink.length; 
}

function previous(){
	if (keyValue > 0){
		keyValue--;
		var currAddr = changeURL(keyValue);
		directTo(currAddr);
	}
	else{
		alert("Already the first post!");
	}
}

function next(){
	if (keyValue < xmlDoc.getElementsByTagName("content").length - 1){
		keyValue++;
		var currAddr = changeURL(keyValue);
		directTo(currAddr);
	}
	else{
		alert("Already the last post!");
	}
}

function directTo(addr){
	location.replace(addr);
}

function changeURL(num){
	var newAddr = "project.html?key=" + num;
	return newAddr;
}