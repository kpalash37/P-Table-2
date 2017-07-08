# P-Table Description
[![Build Status][travis-badge]][travis-badge-url]


**A simple component for Angular 2 which has sorting, filtering, paging, column resize feature. It’s open source you can easily modify this component so that you can easily use this in your project. No dependency for 3rd party.**



## Installation
To show demo, please clone using git command
git clone https://github.com/palash924332931/P-Table-2.git
Then install npm using npm install command.
and finally run the applicaiton using npm start command.


## Documentation


#Inputs:<br/><br/>
	pTableSetting <br/>
	--	<b>tableID </b>(?string) – If you want to set table Id, you can easily set as input otherwise component will set it automatically.<br/>
	--	<b>tableClass</b> (?string) – If you want to set additional class for this table use this input and set your class name.<br/>
	--	 <b>tableName </b>(?string) -  To show table title, set your table title here.<br/>
	--	<b>enabledColumnFilter </b>(Boolean)  To enable column wise filter on P-table use this flag. Just like Excel.<br/>
	--	<b>enabledColumnResize</b> (Boolean)  Sometimes we need to resize column as custom so that we can easily drag the column size as we like. Use this flag to resize your column.<br/>
	--	  <b>pageSize </b>(?Number):  To show number of record in a page, set this variable as your expected number otherwise it will 10 number in a page.<br/>
	--	  <b>displayPaggingSize </b>(?Number) How much number will show in footer to change page of shift left end and right end, set your expected number otherwise it will work automatically.<br/>
	--	<b>enabledSerialNo </b>(?Boolean) – To show auto serial no with row, you can easily handle this using enabledSerialNo true, false.  <br/>
	--	<b>enabledSearch </b>(Boolean) – To enable global search on p-table record set this variable as true.<br/>
	--	<b>enabledCheckbox</b> (Boolean) – To show checkbox in left side of table row, set this flag true. <br/>
	--	 <b> checkboxColumnHeader</b> (String)  You can set your choice able title for checkbox column otherwise it will show ‘Select’ title.<br/>
	--	<b>checkboxCallbackFn </b>(Boolean)  After clicking checkbox callback function will be enabled or not. Using this flag you can easily handle this so that you can easily do any action after clicking any checkbox. <br/>
	--	<b>enabledRadioBtn </b>(Boolean)  To show radio button in left side of each record, set this flag as true.<br/>
	--	<b>radioBtnColumnHeader</b> (String)  To set column title of radio button column.<br/>
	--	<b>enabledEditBtn </b>(?Boolean) – To show edit button with every record set this flag true.<br/>
	--	<b>enabledRecordCreateBtn </b>(Boolean) – To enable a button for new record creation set this flag as true.<br/>
	--	 <b> enabledDataLength </b>(Boolean)  To show and provide available facility so that anyone can change page size using droupdown.<br/>
	--	<b>enabledPagination </b>(Boolean)  To show and enabled facility for pagination.<br/> 
	--	<b> enabledCellClick </b>(Boolean)  Any particular action will be done to click any cell. You can easily handle this using this flag. <br/> 
	--	<b>disabledTableReset </b>(Boolean)  After any particular action table will be automatically reset. If you want to off table reset you can use this flag.<br/><br/>
		<b>tableColDef: array[]</b><br/>
		o	<b>headerName </b>(?:string)  Set column title.<br/>
		o	 <b> width</b> (?:string)  Set column width as percentage for example 10%, 20% etc.<br/>
		o	 <b> internalName </b>(?:string)  Column name which used in dataset.<br/>
		o	 <b> className </b>(?:string)  set class name if you want to set class name particular column.<br/>
		o	 <b> sort </b>(?:Boolean)  to enable sorting on column set this flag.<br/>
		o	  <b>Type </b>(?:string) Column type for example text, hyperlink etc.<br/>
		o	<b>  onClick</b> (?:string)  click method will be enabled or not pass true false value.<br/>
		o	<b>  applyColFilter</b>(?:string)  Individual column filter will be applied or not.<br/><br/><br/>

	<b>pTableMasterData (any[])</b>: pass your data set which you want to show in p-table<br/><br/>

#Outputs:<br/><br/>
	<b>callbackFnOnPageChange :</b> If you want to perform any action after change a page. Define this method otherwise no need to define this.<br/>
	<b>cellClickCallbackFn :</b> If you perform any action after clicking any cell then you define this method otherwise no need to define this method.<br/>
	<b>checkboxCallbackFn:</b> If you want to perform any action after clicking checkbox define that method.<br/>
	<b>radioButtonCallbackFn:</b>  If you want to perform any action after clicking radio button. Define that function here.
<br/>
## Just enjoy P-Table to develop your application faster.
