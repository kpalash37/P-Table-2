# P-Table Description
[![Build Status][travis-badge]][travis-badge-url]


**A simple component for Angular 2 which has sorting, filtering, paging, column resize feature. It’s open source you can easily modify this component so that you can easily use this in your project. No dependency for 3rd party.**



## Installation
To show demo, please clone using git command
git clone https://github.com/palash924332931/P-Table-2.git
Then install npm using npm install command.
and finally run the applicaiton using npm start command.


## Documentation


Inputs:
	pTableSetting <br/>
	--	tableID (?string) – If you want to set table Id, you can easily set as input otherwise component will set it automatically.<br/>
	--	tableClass (?string) – If you want to set additional class for this table use this input and set your class name.<br/>
	--	 tableName (?string) -  To show table title, set your table title here.<br/>
	--	enabledColumnFilter (Boolean)  To enable column wise filter on P-table use this flag. Just like Excel.<br/>
		enabledColumnResize (Boolean)  Sometimes we need to resize column as custom so that we can easily drag the column size as we like. Use this flag to resize your column.<br/>
		  pageSize (?Number):  To show number of record in a page, set this variable as your expected number otherwise it will 10 number in a page.<br/>
		  displayPaggingSize (?Number) How much number will show in footer to change page of shift left end and right end, set your expected number otherwise it will work automatically.<br/>
		enabledSerialNo (?Boolean) – To show auto serial no with row, you can easily handle this using enabledSerialNo true, false.  
		enabledSearch (Boolean) – To enable global search on p-table record set this variable as true, 
		enabledCheckbox (Boolean) – To show checkbox in left side of table row, set this flag true. 
		  checkboxColumnHeader (String)  You can set your choice able title for checkbox column otherwise it will show ‘Select’ title.
		checkboxCallbackFn (Boolean)  After clicking checkbox callback function will be enabled or not. Using this flag you can easily handle this so that you can easily do any action after clicking any checkbox. 
		enabledRadioBtn (Boolean)  To show radio button in left side of each record, set this flag as true.
		radioBtnColumnHeader (String)  To set column title of radio button column.
		enabledEditBtn (?Boolean) – To show edit button with every record set this flag true.
		enabledRecordCreateBtn (Boolean) – To enable a button for new record creation set this flag as true.
		  enabledDataLength (Boolean)  To show and provide available facility so that anyone can change page size using droupdown.
		enabledPagination (Boolean)  To show and enabled facility for pagination. 
		 enabledCellClick (Boolean)  Any particular action will be done to click any cell. You can easily handle this using this flag.  
		disabledTableReset (Boolean)  After any particular action table will be automatically reset. If you want to off table reset you can use this flag.
		tableColDef: array[]
		o	headerName (?:string)  Set column title.
		o	  width (?:string)  Set column width as percentage for example 10%, 20% etc.
		o	  internalName (?:string)  Column name which used in dataset.
		o	  className (?:string)  set class name if you want to set class name particular column.
		o	  sort (?:Boolean)  to enable sorting on column set this flag.
		o	  Type (?:string) Column type for example text, hyperlink etc.
		o	  onClick (?:string)  click method will be enabled or not pass true false value.
		o	  applyColFilter(?:string)  Individual column filter will be applied or not.

	pTableMasterData (any[]): pass your data set which you want to show in p-table

Outputs:
	callbackFnOnPageChange : If you want to perform any action after change a page. Define this method otherwise no need to define this.
	cellClickCallbackFn : If you perform any action after clicking any cell then you define this method otherwise no need to define this method.
	checkboxCallbackFn: If you want to perform any action after clicking checkbox define that method.
	radioButtonCallbackFn:  If you want to perform any action after clicking radio button. Define that function here.

## Just enjoy P-Table to develop your application faster.
