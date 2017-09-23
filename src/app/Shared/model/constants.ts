export enum TabEnum{
    Home,
    MessageHistory,
    Status,
    StickyMessage,
    Groups,
    MessageTemplates,
    Maps,
    Settings
  }

  export  class FirebaseDb{    
    static firebaseGroupTable: string = "WatchGroupList";
    static firebaseUserListTable: string = "UserList";
    static firebaseSettingsTable: string = "Settings";
    static firebaseWatchInformationTable:string="WatchList";
    static firebaseMessageHistoryTable:string="MessageHistoryList";
    static firebaseMessageTemplateTable:string="MessageTemplatesList";
    static firebaseStickyNoteTable:string="StickyList";
    static firebasePartialMessageListTable: string = "PartialMessageList";
  }
    
