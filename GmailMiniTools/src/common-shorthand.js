/**
 *
 * @param {string} msg
 */
function buildToast(msg) {
  return cs
    .newActionResponseBuilder()
    .setNotification(cs.newNotification().setType(cs.NotificationType.INFO).setText(msg))
    .build();
}

/**
 *
 * @param {string} iconUrl
 * @param {string} altText
 * @param {string} functionName
 */
function buildImageButton(iconUrl, altText, functionName) {
  return cs
    .newImageButton()
    .setIconUrl(iconUrl)
    .setAltText(altText)
    .setOnClickAction(cs.newAction().setFunctionName(functionName));
}

/**
 * get user property value or default value(if property does not exist)
 * @param {string} propName
 */
function getProperty(propName) {
  let propValue = PropertiesService.getUserProperties().getProperty(propName);
  if (!propValue) {
    propValue = PROP_DEFAULTS[propName];
    setProperty(propName, propValue);
  }
  return propValue;
}

/**
 * set user property
 * @param {string} propName
 * @param {string} value
 */
function setProperty(propName, value) {
  PropertiesService.getUserProperties().setProperty(propName, value || '');
}

/**
 *
 * @param {GoogleAppsScript.Script.EventObject} e
 * @param {string} fieldName
 * @returns {string} or null
 */
function getStringInput(e, fieldName) {
  if (e.commonEventObject.formInputs[fieldName]) {
    return e.commonEventObject.formInputs[fieldName].stringInputs.value;
  }
}
