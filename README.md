#jQuery Form Viewer plugin

##Introduction

The jQuery Form Viewer plugin allows web developers to easily add preview functionality to any HTML form that follows W3C standards so that users can see a section of the web page update as they fill out the form.

##Usage

###Basic

	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.js"></script>
	<script type="text/javascript" src="jquery.formviewer.js"></script>
	<script type="text/javascript">
		$(function(){
			$("#form_area").formviewer();
		});
	</script>

###Advanced

	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.js"></script>
	<script type="text/javascript" src="jquery.preview.js"></script>
	<script type="text/javascript">
		$(function(){
			$(".form_area").formviewer({"prefix": "fviewr-"});
		});
	</script>

##Setup Instructions

* Load the jquery form viewer plugin file (jquery.formviewer.js) to your website
* Add a script link to the jquery.formviewer.js file (after calling jquery itself)

* Apply the .formviewer() function to a tag that contains both the form and the preview area (for example: the body tag)
* Make sure each form input element must have an id that is unique to the page
* To load the contents for the form field into an HTML element, add a class to the HTML element that is the combintion of formviewer prefix and the id of the source form field

##Requirements

* jQuery 1.4+

##Compatibility

* IE
* Firefox
* Opera
* Chrome
* Safari
* Konqueror

##Formatting Options

HTML elements can be formatted to words or added commas by adding additional classes to the target HTML element

* [prefix]-towords < Add this class to HTML elements where you want numbers converted to words
* [prefix]-addcommas < Add this class to HTML elements where you want numbers with commas separating thousands

##Options

* prefix < A text string that all classes start with (default is formviewer-)
* activeclass < The class applied to HTML elements when the form field has focus

##Example Code

	<div id="form_area">
		<form>
			<input type="text" id="source1" name="quantity" value="" />
		</form>

		<br />
		<div class="formviewer-source1 formviewer-towords"></div>
	</div>
