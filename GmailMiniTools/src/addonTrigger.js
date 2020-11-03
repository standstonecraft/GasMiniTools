/**
 *
 * @param {GoogleAppsScript.Script.CommonEventObject} e
 */
function onNontextualOpen(e) {
  if (e.hostApp == 'gmail') {
    console.log('called');
    return buildHomepageCard();
  } else {
    console.log(e);
  }
}

/**
 *
 * @param {GoogleAppsScript.Script.CommonEventObject} e
 */
function onGmailMessageOpen(e) {
  // PropertiesService.getUserProperties().deleteAllProperties();
  return buildMainCard(e);
}

/**
 * manifest の oauthScopes に下記を追加
 * "https://www.googleapis.com/auth/gmail.addons.current.action.compose",
 *
 * manifest の gmail に下記を追加
 * "composeTrigger": {
 *   "selectActions": [
 *     {
 *       "text": "Add template to email",
 *       "runFunction": "onComposeOpen"
 *     }
 *   ],
 *   "draftAccess": "METADATA"
 * },
 * @param {GoogleAppsScript.Script.EventObject} e
 */
function onComposeOpen(e) {
  return buildTemplateComposeCard();
}
