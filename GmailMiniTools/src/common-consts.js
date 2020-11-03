const cs = CardService;

/** property keys */
const PROPKEY = {
  TASK_LIST_ID: 'taskListId',
  ROWS_LIMIT: 'messageRowsLimit',
  TEMPLATES: 'templates',
  TEMPLATE_ID: 'templateId'
};

/** default values of properties */
const PROP_DEFAULTS = {
  [PROPKEY.TASK_LIST_ID]: '',
  [PROPKEY.ROWS_LIMIT]: 20,
  [PROPKEY.TEMPLATES]: '{"templates":[]}',
  [PROPKEY.TEMPLATE_ID]: 0
};

/** field name */
const FIELDS = {
  TASK_LIST: 'taskListId',
  ROWS_LIMIT: 'messageRowsLimit',
  NOTES: 'notes',
  REPLY_TEMPLATE: 'replyTemplate',
  TEMPLATE_EDIT_NAME: 'templateEditName',
  TEMPLATE_EDIT_BODY: 'templateEditBody'
};

/** icon url for ImageButton */
const BUTTON_URL = {
  // COPY: 'https://img.icons8.com/fluent-systems-filled/24/000000/copy.png',
  ADD: 'https://img.icons8.com/fluent-systems-filled/24/000000/plus-math.png',
  EDIT: 'https://img.icons8.com/fluent-systems-filled/24/000000/edit.png',
  DELETE: 'https://img.icons8.com/fluent-systems-filled/24/000000/delete.png',
  OKEY: 'https://img.icons8.com/fluent-systems-filled/24/000000/checkmark.png',
  CANCEL: 'https://img.icons8.com/fluent-systems-filled/24/000000/delete-sign.png'
};
