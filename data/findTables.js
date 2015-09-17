(function() {
    var tables = document.getElementsByTagName("table");
    var ocServer = "opencompare.org";
//var ocServer = "localhost:9000";

    for(var index = 0; index < tables.length; index++) {
        var table = tables[index];

        /* Replace table button */
        var button = document.createElement("button");
        button.class = "waves-effect waves-light btn";
        button.style = "margin-top: 10px";
        button.id = index.toString();
        button.setAttribute("data-type", 'OpenCompareButton');

        button.addEventListener('click', function(event) {

            id = event.target.getAttribute("id");
            document.getElementById(id).style.display = 'none';
            sendTable(event.target.getAttribute("id"));
        });
        var buttonContent = document.createTextNode("Replace this table");
        button.appendChild(buttonContent);
        var parentDiv = tables[index].parentNode;
        parentDiv.insertBefore(button, tables[index]);

        /* Open in OpenCompare button */

        var button2 = document.createElement("button");

        button2.class = "waves-effect waves-light btn";
        button2.style = "margin-top: 10px";
        button2.id = index.toString();
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
                var ocIframe = document.createElement("iframe");
                ocIframe.setAttribute("type", "content");
                ocIframe.src = "http://opencompare.org/embedPCM/" + req.responseText + "?enableEdit=false&enableExport=false&enableTitle=false&enableShare=true&deleteAfterLoaded=true";
                ocIframe.scrolling = "auto";
                ocIframe.width = "100%";

                var originalheight = tables[id].offsetHeight;
                if(originalheight < 300) {
                    ocIframe.height = "300px";
                } else {
                    ocIframe.height = originalheight;
                }

                ocIframe.style = "border:none;";
                var table = tables[id];
                table.parentNode.replaceChild(ocIframe, table);
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
                self.port.emit("openTable", req.responseText);
            }
        };
    }

    self.port.on("removeButtons", function() {
        var buttons = document.querySelectorAll("button[data-type='OpenCompareButton'");
        var index;
        var button;
        for (index = 0; index < buttons.length; index++) {
            button = buttons[index];
            button.parentNode.removeChild(button);
        }

    });


})();
