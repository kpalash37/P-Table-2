
import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'app-p-modal',
    template:`<div class="modal fade packSearchModalWrapperSave" id="customModal" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="false">
    <div class="modal-dialogSave">
        <div class="modal-content packSearchModalPanel filPSMod">
            <div class = "modal-header">
            <button type = "button" class = "close" data-dismiss = "modal" aria-hidden = "true">
                  &times;
            </button>           
            <h4 class = "modal-title custom-modal-title" id = "customModalTitle">
              {{modalSettingOption.modalTitle}}
            </h4>
         </div>
         <div class = "modal-body">
            <div class="row">
                <ng-content></ng-content>
                    <div class="col-sm-12"><div class="col-sm-12 filHeadingMod"><span class=""> </span></div></div> 
            </div>
         </div>

          <div class = "modal-footer">
            <button type = "button" class = "btn btn-default" data-dismiss = "modal">
               Close
            </button>
            <button type="button" class="btn btn-default pull-right" id="saveNextBtnAction" (click)="fnSaveModalInfo()" >{{modalSettingOption.modalSaveBtnCaption}}</button>
         </div>         
        </div>
    </div>
</div>`
})
export class PModalComponent {
    @Output() fnActionOnSaveBtn: EventEmitter<string> = new EventEmitter<string>();
    @Input() public modalSettingOption:any;
    // @Input() public modalSaveFnParam: string;
    // @Input() public saveBtnVisibility: boolean;
    // @Input() public btnCaption: string="";
    constructor() { 
       // alert(this.modalSettingOption["modalTitle"]);
        console.log("input info: "+JSON.stringify(this.modalSettingOption));
    }

    fnSaveModalInfo() {
        alert(this.modalSettingOption);
        console.log("input info: "+JSON.stringify(this.modalSettingOption));
         this.fnActionOnSaveBtn.emit('');
    }
    
}