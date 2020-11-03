function buildSettingsMenuAction() {
  return cs
    .newCardAction()
    .setText('Addon Settings')
    .setOnClickAction(cs.newAction().setFunctionName('onSettingClicked'));
}
function onSettingClicked() {
  return cs
    .newActionResponseBuilder()
    .setNavigation(cs.newNavigation().pushCard(buildSettingCard()))
    .build();
}
function buildSettingCard() {
  const rowLimit = parseInt(getProperty(PROPKEY.ROWS_LIMIT)).toFixed();
  return cs
    .newCardBuilder()
    .setHeader(cs.newCardHeader().setTitle('SETTINGS'))
    .addSection(
      cs
        .newCardSection()
        .addWidget(
          cs
            .newTextInput()
            .setTitle('Max Row count of message content exported to TODO')
            .setFieldName('messageRowsLimit')
            .setMultiline(false)
            .setValue(rowLimit)
            .setOnChangeAction(cs.newAction().setFunctionName('onRowsLimitChanged'))
        )
    )
    .build();
}

/**
 *
 * @param {GoogleAppsScript.Script.EventObject} e
 */
function onRowsLimitChanged(e) {
  let inputRowsLimit = getStringInput(e, FIELDS.ROWS_LIMIT);
  if (!inputRowsLimit || parseInt(inputRowsLimit) < 1) {
    inputRowsLimit = PROP_DEFAULTS[P_ROWS_LIMIT];
  }
  setProperty(P_ROWS_LIMIT, inputRowsLimit);
  return buildToast('Settings saved.');
}
