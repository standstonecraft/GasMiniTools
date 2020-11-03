const TEMPLATE_EDIT_MODE = {
  ADD: '0',
  EDIT: '1',
  DELETE: '2'
};

function buildDraftTemplateSection() {
  return cs
    .newCardSection()
    .addWidget(
      buildTemplateSelection()
        .setTitle('Reply template')
        .setFieldName(FIELDS.REPLY_TEMPLATE)
        .setType(cs.SelectionInputType.RADIO_BUTTON)
    )
    .addWidget(
      cs
        .newButtonSet()
        .addButton(
          cs
            .newTextButton()
            .setText('CREATE DRAFT')
            .setOnClickAction(cs.newAction().setFunctionName('onCopyTemplateClicked'))
            .setTextButtonStyle(cs.TextButtonStyle.FILLED)
        )
        .addButton(buildImageButton(BUTTON_URL.ADD, 'add', 'onAddTemplateClicked'))
        .addButton(buildImageButton(BUTTON_URL.EDIT, 'edit', 'onEditTemplateClicked'))
        .addButton(
          buildImageButton(BUTTON_URL.DELETE, 'delete', 'onDeleteTemplateClicked')
        )
    );
}

function buildTemplateSelection() {
  const selection = cs.newSelectionInput();
  const json = JSON.parse(getProperty(PROPKEY.TEMPLATES));
  let selectionId = getProperty(PROPKEY.TEMPLATE_ID);
  if (json.templates.length < selectionId + 1) {
    selectionId = 0;
  }
  json.templates.forEach((t, i) => selection.addItem(t.name, `${i}`, i == selectionId));
  if (json.templates.length == 0) {
    selection.addItem('Add Item from "+".', '0', true);
  }
  return selection;
}

/**
 *
 * @param {GoogleAppsScript.Script.EventObject} e
 */
function onCopyTemplateClicked(e) {
  const messageId = e.gmail.messageId;

  const json = JSON.parse(getProperty(PROPKEY.TEMPLATES));
  const indexStr = getStringInput(e, FIELDS.REPLY_TEMPLATE);
  const index = parseInt(indexStr);
  if (json.templates.length < index + 1) {
    return buildToast('Add Item from "+".');
  } else {
    setProperty(PROPKEY.TEMPLATE_ID, indexStr);
    const body = (json.templates[index].body || '').replace('\n', '<br>');
    if (messageId) {
      const msg = GmailApp.getMessageById(messageId);
      return CardService.newComposeActionResponseBuilder()
        .setGmailDraft(msg.createDraftReplyAll('', { htmlBody: body }))
        .build();
    } else {
      return CardService.newComposeActionResponseBuilder()
        .setGmailDraft(GmailApp.createDraft('', '', '', { htmlBody: body }))
        .build();
    }
  }
}

/**
 *
 * @param {GoogleAppsScript.Script.EventObject} e
 */
function onAddTemplateClicked(e) {
  return cs
    .newActionResponseBuilder()
    .setNavigation(
      cs.newNavigation().pushCard(buildTemplateEditorCard(TEMPLATE_EDIT_MODE.ADD, e))
    )
    .build();
}

/**
 *
 * @param {GoogleAppsScript.Script.EventObject} e
 */
function onEditTemplateClicked(e) {
  const json = JSON.parse(getProperty(PROPKEY.TEMPLATES));
  const indexStr = getStringInput(e, FIELDS.REPLY_TEMPLATE);
  const index = parseInt(indexStr);
  if (json.templates.length < index + 1) {
    return buildToast('Add Item from "+".');
  } else {
    return cs
      .newActionResponseBuilder()
      .setNavigation(
        cs.newNavigation().pushCard(buildTemplateEditorCard(TEMPLATE_EDIT_MODE.EDIT, e))
      )
      .build();
  }
}

/**
 *
 * @param {GoogleAppsScript.Script.EventObject} e
 */
function onDeleteTemplateClicked(e) {
  const json = JSON.parse(getProperty(PROPKEY.TEMPLATES));
  const indexStr = getStringInput(e, FIELDS.REPLY_TEMPLATE);
  const index = parseInt(indexStr);
  if (json.templates.length < index + 1) {
    return buildToast('Add Item from "+".');
  } else {
    return buildTemplateEditorCard(TEMPLATE_EDIT_MODE.DELETE, e);
  }
}
