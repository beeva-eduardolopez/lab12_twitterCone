$(document).ready(function() {

    $('#buttonMessage').on('click', function postData() {
        //e.preventDefault();
        var message = $('textarea#messageBody').val();
        var myObject = new Object();
        myObject.text = message;
        myObject.userName = 'edu';
        var stringJSON = JSON.stringify(myObject);
        var json = JSON.parse(myObject);
        $.post("/messages", {json }, "json");

    })


    function getData() {
        $.get("/messages", function(data) {
            var temp = new Array();
            temp = data.split('\n');
            temp.forEach(function(element) {
                if (element !== "") {
                    var obj = JSON.parse(element);
                    var ul = document.getElementById("message-list");
                    var li = document.createElement("li");
                    var children = ul.children.length + 1
                    li.setAttribute("id", "element" + children)
                    li.appendChild(document.createTextNode(obj.text));
                    ul.appendChild(li)
                }
            }, this);

        });
    }

    /*Calls function once page loaded to display tweets to page*/
    getData();
});