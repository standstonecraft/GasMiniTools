/// <reference path="google-apps-script.types.d.ts" />
/// <reference path="google-apps-script.conference-data.d.ts" />
/// <reference path="google-apps-script.gmail.d.ts" />

declare namespace GoogleAppsScript {
  namespace Card_Service {
    /**
     * A builder for Card objects.
     */
    interface CardBuilder {
      setFixedFooter(fixedFooter: FixedFooter): CardBuilder;
    }
  }
}
