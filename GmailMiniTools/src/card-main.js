/**
 *
 * @param {GoogleAppsScript.Script.EventObject} e
 */
function buildMainCard(e) {
  const messageId = e.gmail.messageId;
  const msg = GmailApp.getMessageById(messageId);

  const date = Utilities.formatDate(msg.getDate(), 'JST', 'yyyy-MM-dd HH:mm');
  const headerParagraph = `<b>Subject</b> ${msg.getThread().getFirstMessageSubject()}
<b>From</b> ${msg.getFrom()}
<b>Date</b> <time>${date}</time>`;

  return cs
    .newCardBuilder()
    .addCardAction(buildSettingsMenuAction())
    .addSection(
      cs.newCardSection().addWidget(cs.newTextParagraph().setText(headerParagraph))
    )
    .addSection(buildTasksSection())
    .addSection(buildDraftTemplateSection())
    .build();
}
