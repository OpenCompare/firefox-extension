(function() {
    "use strict";

    var data = require("sdk/self").data;
    var panels = require("sdk/panel");
    var tabs = require("sdk/tabs");
    var worker;

    var button = require("sdk/ui/button/toggle").ToggleButton({
        id: "opencompare-extension",
        label: "OpenCompare extension",
        icon: "./icon.png",
        onChange: handleChange
    });

    var panel = panels.Panel({
        contentURL: data.url("panel.html"),
        contentScriptFile: data.url("panel.js"),
        onHide: handleHide
    });

    function handleChange(state) {
        if (state.checked) {
            panel.show({
                position: button
            });
        }

    }

    function handleHide() {
        button.state('window', {checked: false});
    }

    panel.port.on("checkPage", function() {
         worker = tabs.activeTab.attach({
            contentScriptFile: [data.url('findTables.js')]
        });

        worker.port.on("openTable", function(id) {
            tabs.open('http://opencompare.org/pcm/' + id + '?deleteAfterLoaded=true', '_blank');
        });
    });

    panel.port.on("removeButtons", function() {
        worker.port.emit("removeButtons");
    });


})();
