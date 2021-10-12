var viewer;

async function launchViewer(urn, accessToken) {
  var options = {
    env: "AutodeskProduction",
    getAccessToken: (callback) => callback(accessToken, 3600),
  };

  Autodesk.Viewing.Initializer(options, () => {
    var documentId = "urn:" + urn;
    Autodesk.Viewing.Document.load(
      documentId,
      onDocumentLoadSuccess,
      onDocumentLoadFailure
    );
  });
}

function onDocumentLoadSuccess(doc) {
  var viewables = doc.getRoot().getDefaultGeometry();
  viewer = new Autodesk.Viewing.GuiViewer3D(
    document.getElementById("forgeViewer"),
    { extensions: ["Autodesk.DocumentBrowser"] }
  );
  viewer.start();
  viewer.loadDocumentNode(doc, viewables).then((i) => {
    // documented loaded, any action?
  });
}

function onDocumentLoadFailure(viewerErrorCode, viewerErrorMsg) {
  console.error(
    "onDocumentLoadFailure() - errorCode:" +
      viewerErrorCode +
      "\n- errorMessage:" +
      viewerErrorMsg
  );
}
