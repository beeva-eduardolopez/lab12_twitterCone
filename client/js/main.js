$(document).ready(function() {
    /*Using document ready runs code only after the DOM is ready for js code to run more on that here: https://learn.jquery.com/using-jquery-core/document-ready */
    function postData() {

        $("#messageForm").submit(function(event) {
            event.preventDefault();
            var $form = $(this),
                message = $form.find("messageContent").val(),
                url = $form.attr("action");

            var myObject = new Object();
            myObject.text = message;
            myObject.userName = 'edu';

            var myString = JSON.stringify(myObject);

            // Send the data using post
            var posting = $.post(url, { s: myObject });

            // Put the results in a div
            posting.done(function(data) {
                var content = $(data).find("#content");
                $("#message-container").empty().append(content);
            });
        });
		/*This function should create a post request using jquery. When posted it should:
			1) Add tweets to the 'database'
			2) After posted prepend message to list of messages and clear input box */

    }

    function getData() {
        $.get("/messages", function(data) {
            var temp = new Array();
            // this will return an array with strings "1", "2", etc.
            temp = data.split('\n');
            temp.forEach(function(element) {
                var obj = JSON.parse(element);
                var ul = document.getElementById("message-list");
                var li = document.createElement("li");
                var children = ul.children.length + 1
                li.setAttribute("id", "element" + children)
                li.appendChild(document.createTextNode(obj.text));
                ul.appendChild(li)
                //$("#message-container").append(obj.text + '\n');
            }, this);

        });
    }

    /*Calls function once page loaded to display tweets to page*/
    getData();
});