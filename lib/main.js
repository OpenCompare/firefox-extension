var data = require("sdk/self").data;
var self = require("sdk/self");


require("sdk/ui/button/action").ActionButton({
    id: "opencompare-extension",
    label: "OpenCompare extension",
    icon: "./icon.png",
    onClick: function() {
        worker = require("sdk/tabs").activeTab.attach({
            contentScriptFile: [data.url("jquery-2.1.4.min.js"), data.url('findTables.js')]
        });
    }
});