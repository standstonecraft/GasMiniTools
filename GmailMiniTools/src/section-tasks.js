function buildTasksSection() {
  return cs
    .newCardSection()
    .addWidget(
      buildTaskListSelection()
        .setFieldName(FIELDS.TASK_LIST)
        .setType(cs.SelectionInputType.DROPDOWN)
        .setOnChangeAction(cs.newAction().setFunctionName('onTaskListChanged'))
    )
    .addWidget(
      cs.newTextInput().setTitle('Notes').setFieldName(FIELDS.NOTES).setMultiline(true)
    )
    .addWidget(
      cs
        .newTextButton()
        .setText('CREATE TODO')
        .setOnClickAction(cs.newAction().setFunctionName('onCreateTodoClicked'))
        .setTextButtonStyle(cs.TextButtonStyle.FILLED)
    );
}

function buildTaskListSelection() {
  const taskListId = getProperty(PROPKEY.TASK_LIST_ID);
  const taskLists = Tasks.Tasklists.list().items;
  const widget = cs.newSelectionInput();
  taskLists.forEach((list) => widget.addItem(list.title, list.id, taskListId == list.id));
  return widget;
}

/**
 *
 * @param {GoogleAppsScript.Script.EventObject} e
 */
function onCreateTodoClicked(e) {
  const messageId = e.gmail.messageId;
  const msg = GmailApp.getMessageById(messageId);

  const lines = msg.getPlainBody().split('\n');
  const rowNum = getProperty(PROPKEY.ROWS_LIMIT);
  let body = lines.slice(0, rowNum).join('\n');
  body += lines.length > rowNum ? '(More ' + (lines.length - 20) + ' lines)' : '';
  const messageURL =
    'https://mail.google.com/mail/u/0/#inbox/' +
    encodeURIComponent(`#${e.gmail.threadId}|${e.gmail.messageId}`);

  let notes = '';
  if (getStringInput(e, FIELDS.NOTES)) {
    notes += `[Notes]
${getStringInput(e, FIELDS.NOTES)}
`;
  }
  notes += `[From]
${msg.getFrom()}
[Date]
${Utilities.formatDate(msg.getDate(), 'JST', 'yyyy/MM/dd (E) HH:mm')}
[Body]
${body}
------------
🐈Added by GmailMiniTools🐩
[Message URL]
${messageURL}
[Message ID] ${msg.getId()}`;

  const task = Tasks.newTask();
  task.title = msg.getSubject();
  task.notes = notes;
  Tasks.Tasks.insert(task, getStringInput(e, FIELDS.TASK_LIST));

  return buildToast('TODO created.');
}

/**
 *
 * @param {GoogleAppsScript.Script.EventObject} e
 */
function onTaskListChanged(e) {
  setProperty(PROPKEY.TASK_LIST_ID, getStringInput(e, FIELDS.TASK_LIST));
}
