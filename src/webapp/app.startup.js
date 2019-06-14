/**
 * @author Kholod, Serhii
 */

sap.ui.getCore().attachInit(() => {
  sap.ui.require([
    "sap/ui/core/ComponentContainer"
  ], (ComponentContainer) => {

    let mainComponent = sap.ui.component({
      id: "main-component",
      name: "baseUI5"
    });

    let mainContainer = new ComponentContainer("main-component-container", {
      component: mainComponent,
      height: "100%",
      width: "100%"
    });

    mainContainer.placeAt("content");
  });
});
