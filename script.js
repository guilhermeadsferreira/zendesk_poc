var conversationFieldsIds = {
  deviceModel: "24313436468116",
  appVersion: "24989792837908",
  deviceLocation: "24989972732052",
  source: "24990030645396",
  deviceId: "24990004588692",
  accountId: "24990005708820",
  accountName: "24990389348500",
  accountNumber: "24990358095636",
  membershipId: "24990381349908",
  userUsername: "24990427223444",
  userEmail: "24990396730900",
  userDocument: "24990398984980",
  userId: "24990400210964",
  userPhone: "24990417960852",
  errorMessage: "24990464514324",
  currentPage: "24990439188244",
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
  iframes.forEach((frame) => {
    var iframeZendeskDocument = frame.contentDocument;
    var iframeZendeskButtons = iframeZendeskDocument.querySelector(
      "[data-garden-id='buttons.icon_button']"
    );
    iframeZendeskButtons?.remove();
  });
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
