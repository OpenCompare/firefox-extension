var data = require("sdk/self").data;
var self = require("sdk/self");


require("sdk/ui/button/action").ActionButton({
  id: "opencompare-extension",
  label: "OpenCompare extension",
  icon: "./icon.png",
  onClick: function() {
    worker = require("sdk/tabs").activeTab.attach({
      contentScriptFile: [data.url('findTables.js')]
    });
  }
});