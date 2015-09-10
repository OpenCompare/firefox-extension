var tables =$("table");
var ocServer = "opencompare.org";
//var ocServer = "localhost:9000";

    for(var index = 0; index < tables.length; index++) {
        var table = tables[index];

        var button = document.createElement("button");
        button.setAttribute("class", "waves-effect waves-light btn");
        button.setAttribute("style", "margin-top: 10px");
        button.setAttribute("id", index.toString());
        button.setAttribute("data-type", 'OpenCompareButton');

        button.addEventListener('click', function(event) {

            id = event.target.getAttribute("id");
            $('#'+id).hide();
            sendTable(event.target.getAttribute("id"));
       });
        var buttonContent = document.createTextNode("Replace this table");
        button.appendChild(buttonContent);
        var parentDiv = tables[index].parentNode;
        parentDiv.insertBefore(button, tables[index]);

        /* Open in OpenCompare button */

        var button2 = document.createElement("button");

        button2.setAttribute("class", "waves-effect waves-light btn");
        button2.setAttribute("style", "margin-top: 10px");
        button2.setAttribute("id", index.toString());
        button2.setAttribute("data-type", 'OpenCompareButton');

        button2.addEventListener('click', function(event) {

            id = event.target.getAttribute("id");
            openTable(event.target.getAttribute("id"));
        });
        var buttonOpen = document.createTextNode("Open in OpenCompare.org");
        button2.appendChild(buttonOpen);
        var parentDiv = tables[index].parentNode;
        parentDiv.insertBefore(button2, tables[index]);

    }

function sendTable(id) {

    var fd = new FormData();

    var blob = new Blob([tables[id].outerHTML], {type: "text/html"});
    fd.append("file", blob);
    fd.append('title', 'Test');
    fd.append('productAsLines', true);
    var req = new XMLHttpRequest();
    req.open("POST", "http://opencompare.org/api/embedFromHtml");
    req.send(fd);

    req.onreadystatechange=function(){
        if (req.readyState==4 && req.status==200){
            var editor = '<iframe src="http://opencompare.org/embedPCM/' + req.responseText + '?enableEdit=false&enableExport=false&enableTitle=false&enableShare=true&deleteAfterLoaded=true" ' +
                'scrolling="auto"  width="100%" height="600px" style="border:none;"></iframe>';

            tables.eq(id).replaceWith(editor);
        }
    };
}

function openTable(id) {

    var fd = new FormData();

    var blob = new Blob([tables[id].outerHTML], {type: "text/html"});
    fd.append("file", blob);
    fd.append('title', 'Test');
    fd.append('productAsLines', true);
    var req = new XMLHttpRequest();
    req.open("POST", "http://opencompare.org/api/embedFromHtml");
    req.send(fd);

    req.onreadystatechange=function(){
        if (req.readyState==4 && req.status==200){
            window.open('http://' + ocServer + '/pcm/' + req.responseText + '?deleteAfterLoaded=true', '_blank');
        }
    };
}
