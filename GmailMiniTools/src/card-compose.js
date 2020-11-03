function buildTemplateComposeCard() {
  const card = cs
    .newCardBuilder()
    .addSection(
      cs.newCardSection().addWidget(cs.newTextParagraph().setText('aaaaaaaaaaaaaaa'))
    )
    .build();
  return card;
}
