(function() {
    "use strict";

    var data = require("sdk/self").data;
    var panels = require("sdk/panel");
    var tabs = require("sdk/tabs");

    var tabsData = {};

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
        var tabData = tabsData[tabs.activeTab.id];
        if (typeof tabData !== 'undefined') {
            tabData.worker.port.emit("addButtons");
            tabData.isEnabled = true;
        }
    });


    panel.port.on("removeButtons", function() {
        var tabData = tabsData[tabs.activeTab.id];
        if (typeof tabData !== 'undefined') {
            tabData.worker.port.emit("removeButtons");
            tabData.isEnabled = false;
        }
    });

    function handleChange(state) {
        if (state.checked) {
            // Get status of content script
            var tabData = tabsData[tabs.activeTab.id];
            if (typeof tabData !== 'undefined') {
                panel.port.emit("status", {
                    enabled: tabData.isEnabled
                });
            }

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

        tabsData[tab.id] = {
            worker: worker,
            isEnabled: false
        };

    });





})();
