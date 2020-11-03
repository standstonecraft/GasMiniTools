const TEMPLATE_DIR_TITLES = {
  [TEMPLATE_EDIT_MODE.ADD]: 'Add Template',
  [TEMPLATE_EDIT_MODE.EDIT]: 'Edit Template',
  [TEMPLATE_EDIT_MODE.DELETE]: 'Delete Template'
};

/**
 *
 * @param {string} editMode
 * @param {GoogleAppsScript.Script.EventObject} e
 * @returns {GoogleAppsScript.Card_Service.Card} card
 */
function buildTemplateEditorCard(editMode, e) {
  let cardTitle = TEMPLATE_DIR_TITLES[editMode];

  let name = '';
  let body = '';
  const index = getStringInput(e, FIELDS.REPLY_TEMPLATE);
  if (editMode != TEMPLATE_EDIT_MODE.ADD) {
    const json = JSON.parse(getProperty(PROPKEY.TEMPLATES));
    name = json.templates[index].name;
    body = json.templates[index].body;
  }
  return cs
    .newCardBuilder()
    .setHeader(cs.newCardHeader().setTitle(cardTitle))
    .addSection(
      cs
        .newCardSection()
        .addWidget(
          cs
            .newTextInput()
            .setTitle('Name')
            .setFieldName(FIELDS.TEMPLATE_EDIT_NAME)
            .setMultiline(false)
            .setValue(name)
        )
        .addWidget(
          cs
            .newTextInput()
            .setTitle('Body')
            .setFieldName(FIELDS.TEMPLATE_EDIT_BODY)
            .setMultiline(true)
            .setValue(body)
        )
    )
    .setFixedFooter(
      cs
        .newFixedFooter()
        .setPrimaryButton(
          cs
            .newTextButton()
            .setText(editMode == TEMPLATE_EDIT_MODE.DELETE ? 'DELETE' : 'OK')
            .setOnClickAction(
              cs.newAction().setFunctionName('onEditTemplateDone').setParameters({
                index: index,
                value: 'okey',
                editMode: editMode
              })
            )
        )
        .setSecondaryButton(
          cs
            .newTextButton()
            .setText('CANCEL')
            .setOnClickAction(
              cs.newAction().setFunctionName('onEditTemplateDone').setParameters({
                index: index,
                value: 'cancel',
                editMode: editMode
              })
            )
        )
    )
    .build();
}
/**
 *
 * @param {GoogleAppsScript.Script.EventObject} e
 */
function onEditTemplateDone(e) {
  const index = e.commonEventObject.parameters.index;
  const value = e.commonEventObject.parameters.value;
  const editMode = e.commonEventObject.parameters.editMode;
  if (value == 'okey') {
    const newTemplate = {
      name: getStringInput(e, FIELDS.TEMPLATE_EDIT_NAME),
      body: getStringInput(e, FIELDS.TEMPLATE_EDIT_BODY)
    };
    if (!newTemplate.name) {
      return buildToast('Input name.');
    }
    if (!newTemplate.body) {
      return buildToast('Input body.');
    }
    let json = JSON.parse(getProperty(PROPKEY.TEMPLATES));
    switch (editMode) {
      case TEMPLATE_EDIT_MODE.ADD:
        if (json.templates.filter((t) => newTemplate.name == t.name).length > 0) {
          return buildToast(`Template "${newTemplate.name}" is already exists.`);
        }
        json.templates.push(newTemplate);
        break;
      case TEMPLATE_EDIT_MODE.EDIT:
        if (
          json.templates.filter((t, i) => newTemplate.name == t.name && i != index)
            .length > 0
        ) {
          return buildToast(`Template "${newTemplate.name}" is already exists.`);
        }
        json.templates[index] = newTemplate;
        break;
      case TEMPLATE_EDIT_MODE.DELETE:
        json.templates = json.templates.filter((t, i) => i != index);
        break;
    }
    setProperty(PROPKEY.TEMPLATES, JSON.stringify(json));
  }
  return cs
    .newActionResponseBuilder()
    .setNavigation(cs.newNavigation().popToRoot().updateCard(buildMainCard(e)))
    .build();
}
