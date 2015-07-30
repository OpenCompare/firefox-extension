var tables =$("table");
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

            /* chrome.runtime.sendMessage({
             "message": "convert_to_editor",
             "table": tables[id].outerHTML,
             "index": id
             });*/
       });
        var buttonContent = document.createTextNode("Replace this table");
        button.appendChild(buttonContent);
        var parentDiv = tables[index].parentNode;
        parentDiv.insertBefore(button, tables[index]);
    }
