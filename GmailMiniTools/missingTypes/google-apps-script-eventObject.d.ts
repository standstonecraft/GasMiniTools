/// <reference path="google-apps-script.types.d.ts" />
/// <reference path="google-apps-script.base.d.ts" />

declare namespace GoogleAppsScript {
  namespace Script {
    /**
     * the top-level structure of Google Workspace Add-on event objects.
     * The event object structure includes a commonEventObject top-level field for
     * host-independent information. Each event object can also have one of the
     * following host-specific top-level fields, determined by the active host app:
     * gmailEventObject, calendarEventObject, or driveEventObject.
     * For backward compatibility, Google Workspace Add-on event objects also
     * include all the original fields used in Gmail add-on action event objects.
     */
    interface EventObject {
      /**  
        Common fields object  
        An object containing information common to all event objects,  
        regardless of the host application.  
  
      */
      commonEventObject: CommonEventObject;

      /**  
        Calendar event object  
  
        Only present if the calling host is Google Calendar. An object  
        containing calendar and event information.  
  
      */
      calendar: CalendarEventObject;

      /**  
        Drive event object  
  
        Only present if the calling host is Google Drive. An object  
        containing Drive information.  
  
      */
      drive: DriveEventObject;

      /**  
        Gmail event object  
  
        Only present if the calling host is Gmail. An object  
        containing Gmail information.  
  
      */
      gmail: GmailEventObject;

      /**  
        Docs event object  
  
        Only present if the calling host is Google Docs. An object  
        containing Docs information.  
  
      */
      docs: DocsEventObject;

      /**  
        Sheets event object  
  
        Only present if the calling host is Google Sheets. An object  
        containing Sheets information.  
  
      */
      sheets: SheetsEventObject;

      /**  
        Slides event object  
  
        Only present if the calling host is Google Slides. An object  
        containing Slides information.  
  
      */
      slides: SlidesEventObject;

      /**  
        @deprecated  
      */
      messageMetadata: MessageMetadata;

      /**  
        Deprecated. Indicates where the event  
        originates (web, iOS, or Android).  
  
        For Google Workspace Add-ons, find this information in the  
        eventObject.commonEventObject.platform  
        field.  
  
        @deprecated  
  
      */
      clientPlatform: string;

      /**  
        Deprecated. A map of the current values  
        of all form widgets in the card, restricted to one value per widget. The  
        keys are the string IDs associated with the widgets, and the values are  
        strings. The event object provides formInput as a  
        convenience for when you need to read data from multiple widgets with  
        expected singular values, such as text inputs and switches. For  
        multi-valued widgets such as checkboxes, you can read each value from  
        formInputs instead.  
        Note: Date and time picker widget values  
        can't be read from this field. Get those picker values from  
        commonEventObject.formInputs instead.  
  
  
        For Google Workspace Add-ons, find this information in the  
        eventObject.commonEventObject.formInputs  
        field instead; widgets with single values are represented as arrays with  
        a single element.  
  
  
        @deprecated
      */
      formInput: object;

      /**  
        Deprecated. A map of current values of  
        widgets in the card, presented as lists of strings. The keys are the  
        string IDs associated with the widget. For single-valued widgets, the  
        value is presented in a single-element array. For multi-valued widgets  
        such as checkbox groups, all the values are presented in a list.  
        Note: Date and time picker widget values  
        can't be read from this field. Get those picker values from  
        commonEventObject.formInputs instead.  
  
        For Google Workspace Add-ons, find this information in the  
        eventObject.commonEventObject.formInputs  
        field.  
  
        @deprecated  
      */
      formInputs: object;

      /**  
        Deprecated. A map of any additional  
        parameters you supply to the  
  
        Action using  
  
        Action.setParameters(). The map keys and values are  
        strings.  
  
        For Google Workspace Add-ons, find this information in the  
        eventObject.commonEventObject.parameters  
        field.  
  
        @deprecated  
      */
      parameters: object;

      /**  
        Deprecated and disabled by default. The  
        two-letter code indicating the user's country or region. It can also be  
        a numeric  
        UN M49 country code.  
  
        For Google Workspace Add-ons, find this information in the  
        eventObject.commonEventObject.userLocale  
        field.  
  
        @deprecated  
      */
      userCountry: string;

      /**  
        Deprecated and disabled by default. The  
        two-letter  
        ISO 639  
        code indicating the user's language. See  
        Accessing user  
        locale and timezone for more details.  
  
        For Google Workspace Add-ons, find this information in the  
        eventObject.commonEventObject.userLocale  
        field.  
  
  
        @deprecated  
      */
      userLocale: string;

      /**  
        Deprecated and disabled by default. The  
  
        timezone identifier of the user's timezone. Examples include:  
        America/New_York, Europe/Vienna, and  
        Asia/Seoul. See  
  
        Accessing user locale and timezone for more details.  
  
        For Google Workspace Add-ons, find this information in the  
        eventObject.commonEventObject.timeZone.id  
        field.  
  
  
        @deprecated  
      */
      userTimezone: Usertimezone;
    }

    /**
     * @deprecated
     */
    interface MessageMetadata {
      /**  
        Deprecated. An access token. You can use  
        this to enable access to user data using temporary Gmail add-on  
        scopes.  
  
        For Google Workspace Add-ons, find this information in the  
        eventObject.gmail.accessToken  
        field.  
  
        @deprecated  
      */
      accessToken: string;

      /**  
        Deprecated. The message ID of the thread  
        open in the Gmail UI.  
  
        For Google Workspace Add-ons, find this information in the  
        eventObject.gmail.messageId  
        field.  
  
        @deprecated  
      */
      messageId: string;
    }

    /**
     * @deprecated
     */
    interface Usertimezone {
      /**  
        Deprecated and disabled by default. The  
  
        timezone identifier of the user's timezone. Examples include:  
        America/New_York, Europe/Vienna, and  
        Asia/Seoul. See  
  
        Accessing user locale and timezone for more details.  
  
        For Google Workspace Add-ons, find this information in the  
        eventObject.commonEventObject.timeZone.id  
        field.  
  
        @deprecated  
  
      */
      id: string;

      /**  
        Deprecated and disabled by default. The  
  
        time offset from Coordinated Universal Time (UTC) of the user's  
        timezone, measured in milliseconds. See  
  
        Accessing user locale and timezone for more details.  
  
        For Google Workspace Add-ons, find this information in the  
        eventObject.commonEventObject.timeZone.offset  
        field.  
  
  
        @deprecated  
      */
      offset: string;
    }

    /**
     * object containing information common to all event objects, regardless of the host application
     */
    interface CommonEventObject {
      /**  
        Indicates where the event originates (`WEB`,`IOS`, or `ANDROID`).  
      */
      platform: string;

      /**  
        A map containing the current values of the  
        widgets in the displayed card. The map keys are the string IDs  
        assigned with each widget, and each value is another wrapper object with  
        a single "" key. The structure of the map value object is  
        dependent on the widget type:  
  
        - Single-valued widgets (for example, a text box): a list of strings (only one element).  
          Example: for a text input widget with  
          employeeName as its ID, access the text  
          input value with:  
          e.formInputs.employeeName[""].stringInputs.value[0].  
  
        - Multi-valued widgets (for example, checkbox groups): a list of strings.  
          Example: for a multi-value widget with  
          participants as its ID, access the value  
          array with:  
          e.formInputs.participants[""].stringInputs.value.  
  
        - A date-time picker: a DateTimeInput object.  
          Example: For a picker with an ID of myDTPicker,  
          access the  
          DateTimeInput object  
          using  
          e.formInputs.myDTPicker[""].dateTimeInput.  
  
        - A date-only picker: a DateInput object.  
          Example: For a picker with an ID of myDatePicker,  
          access the  
          DateInput  object using  
          e.formInputs.myDatePicker[""].dateInput.  
  
        - A time-only picker: a TimeInput object.  
          Example: For a picker with an ID of myTimePicker,  
          access the  
          TimeInput object using  
          e.formInputs.myTimePicker[""].timeInput.  
      */
      formInputs: object;

      /**  
        Indicates the host app the add-on is active in  
        when the event object is generated. Possible values include the  
        following:  
        - gmail
        - calendar
        - drive
        - docs
        - sheets
        - slides
      */
      hostApp: string;

      /**  
        Any additional parameters you  
        supply to the Action using Action.setParameters().  
      */
      parameters: object;

      /**  
        Disabled by default. The user's language  
        and country/region identifier in the format of  
        ISO 639  
        language code-ISO 3166  
        country/region code. For example, en-US.  
  
        To enable this field, you must set `addOns.common.useLocaleFromApp` to  
        `true` in your add-on's manifest. Your add-on's scope list must also  
        include `https://www.googleapis.com/auth/script.locale`.  
        See  
        Accessing user locale and timezone for more details.  
      */
      userLocale: string;

      /**  
        Disabled by default. The timezone ID  
        and offset. To enable this field, you must set  
        `addOns.common.useLocaleFromApp` to `true` in your add-on's manifest.  
        Your add-on's scope list must also include  
        `https://www.googleapis.com/auth/script.locale`.  
        See  
        Accessing user locale and timezone for more details.  
      */
      timeZone: string | TimeZone;
    }

    interface TimeZone {
      /**  
        The timezone identifier of the user's timezone. Examples include:  
        America/New_York, Europe/Vienna, and  
        Asia/Seoul. To enable this field, you must set  
        `addOns.common.useLocaleFromApp` to `true` in your add-on's manifest.  
        Your add-on's scope list must also include  
        `https://www.googleapis.com/auth/script.locale`. See Accessing user locale and timezone for more details.  
      */
      id: string;

      /**  
        The time offset from Coordinated Universal Time (UTC) of the user's  
        timezone, measured in milliseconds. See Accessing user locale and timezone for more details.  
      */
      offset: string;
    }

    /**
     * The Gmail event object is the portion of the overall event object that carries
     * information about a user's Gmail messages. It's only present in an event object
     * if the host application is Gmail.
     */
    interface GmailEventObject {
      /**
        The Gmail-specific access token. You can use  
        this token with the  
          
        GmailApp.setCurrentMessageAccessToken(accessToken)  
        method to grant your add-on temporary access to a user's currently  
        open Gmail message or let your add-on compose new drafts.  
      */
      accessToken: string;

      /**  
        Disabled by default. The list  
        of "BCC:" recipient email addresses currently included in a draft the  
        add-on is composing. To enable this field, you must set the  
        `addOns.gmail.composeTrigger.draftAccess` field in your manifest to  
        `METADATA`.  
      */
      bccRecipients: String[];

      /**  
        Disabled by default. The list  
        of "CC:" recipient email addresses currently included in a draft the  
        add-on is composing. To enable this field, you must set the  
        `addOns.gmail.composeTrigger.draftAccess` field in your manifest to  
        `METADATA`.  
      */
      ccRecipients: String[];

      /**  
        The ID of the currently open Gmail message.  
      */
      messageId: string;

      /**  
        The currently open Gmail thread ID.  
      */
      threadId: string;

      /**  
        Disabled by default. The list  
        of "To:" recipient email addresses currently included in a draft the  
        add-on is composing. To enable this field, you must set the  
        `addOns.gmail.composeTrigger.draftAccess` field in your manifest to  
        `METADATA`.  
      */
      toRecipients: String;
    }
  }
}
