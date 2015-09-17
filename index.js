(function() {
    "use strict";

    var data = require("sdk/self").data;
    var panels = require("sdk/panel");

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

        require("sdk/tabs").activeTab.attach({
            contentScriptFile: [data.url('findTables.js')]
        });
    }

    function handleHide() {
        button.state('window', {checked: false});
    }
})();
