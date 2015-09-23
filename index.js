(function() {
    "use strict";

    var data = require("sdk/self").data;
    var panels = require("sdk/panel");
    var tabs = require("sdk/tabs");

    var workers = {};

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

    panel.port.on("checkPage", function() {
        var worker = workers[tabs.activeTab.id];
        worker.port.emit("addButtons");
    });


    panel.port.on("removeButtons", function() {
        var worker = workers[tabs.activeTab.id];
        worker.port.emit("removeButtons");
    });

    function handleChange(state) {
        if (state.checked) {
            // Get status of content script
            var worker = workers[tabs.activeTab.id];
            worker.port.emit("getStatus");

            // Display panel
            panel.show({
                position: button
            });
        }

    }

    function handleHide() {
        button.state('window', {checked: false});
    }

    tabs.on("ready", function(tab) {
        var worker = tab.attach({
            contentScriptFile: [data.url('findTables.js')]
        });

        workers[tab.id] = worker;

        worker.port.on("status", function(status) {
            panel.port.emit("status", status);
        });
    });





})();
