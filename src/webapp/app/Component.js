/**
 * @author Kholod, Serhii
 */

import UIComponent from "sap/ui/core/UIComponent";

export default class Component extends UIComponent {

  metadata = {
    manifest: "json"
  };

  onAfterRendering() {
    // $("container>block").draggable({ scroll: true, cursor: "move",
    //   start: function(e, ui) {
    //     $(ui.helper).addClass('dragging');
    //   },
    //   stop: function(e, ui) {
    //     $(ui.helper).removeClass('dragging');
    //   }
    // });
  }
}
