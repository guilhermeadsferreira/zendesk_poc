var conversationFieldsIds = {
  deviceModel: "24313436468116",
};

function translateParamsToConversationFields(obj) {
  let conversationFields = [];
  Object.entries(obj).forEach(([key, value]) => {
    let conversationFieldId = conversationFieldsIds[key];
    if (value && conversationFieldId) {
      conversationFields.push({ id: conversationFieldId, value });
    }
  });
  return conversationFields;
}

function getUrlParams() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  //Device Info
  var deviceModel = urlParams.get("device_model");
  var appVersion = urlParams.get("app_version");
  var deviceLocation = urlParams.get("device_location");
  var source = urlParams.get("source");
  var deviceId = urlParams.get("device_id");

  //User Info Optional
  var accountId = urlParams.get("accound_id");
  var accountName = urlParams.get("account_name");
  var accountNumber = urlParams.get("account_number");
  var membershipId = urlParams.get("membership_id");

  //User Info Mandatory
  var userUsername = urlParams.get("user_username");
  var userEmail = urlParams.get("user_email");
  var userDocument = urlParams.get("user_document");
  var userId = urlParams.get("user_id");
  var userPhone = urlParams.get("user_phone");

  //Extra Info
  var errorMessage = urlParams.get("error_message");
  var currentPage = urlParams.get("current_page");

  var obj = {
    deviceModel,
    appVersion,
    deviceLocation,
    source,
    deviceId,
    accountId,
    accountName,
    accountNumber,
    membershipId,
    userUsername,
    userEmail,
    userDocument,
    userId,
    userPhone,
    errorMessage,
    currentPage,
  };

  return obj;
}

function removeHideButton() {
  var iframes = document.querySelectorAll("iframe");
  let launcherIframe;
  iframes.forEach((frame) => {
    if (frame.contentWindow.document.getElementsByTagName("title")) {
      launcherIframe = frame;
    }
  });
  launcherIframe.remove();
}

function initZendesk() {
  document.body.style.display = "none";
  zE("messenger", "open");
  setTimeout(() => {
    document.body.style.display = "block";
    removeHideButton();
    var params = getUrlParams();
    var conversationFields = translateParamsToConversationFields(params);
    if (conversationFields.length) {
      console.log({ conversationFields });
      zE("messenger:set", "conversationFields", conversationFields);
    }
  }, 3000);
}

(function () {
  window.onbeforeunload = () => {
    zE("messenger:set", "cookies", false);
  };
  window.onload = () => {
    initZendesk();
  };
})();
