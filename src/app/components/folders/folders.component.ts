import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.scss']
})
export class FoldersComponent implements OnInit {
  @Input() data : any;
  @Output() activeFolder = new EventEmitter<any>();
  @Input() activatedFolder : any;
  selectedItem ={};
  sortedData : any;
  folderList;
  constructor() { 
    
  }

  ngOnInit() {
  }
  ngOnChanges(){

    if(this.data){
      // console.log("folder list: ", this.data);
      
      this.folderList = this.data;

      if(!this.activatedFolder){
        this.selectedItem = this.folderList[0];
      }else{
        this.selectedItem = this.activatedFolder;
      }
      // this.folderList.sort(function (a, b) {
      //   return a.folderName.rendered - b.folderName.rendered;
      // });
      // console.log("thsidsfsdf:" , this.folderList);
      
      // this.folderList.sort((a,b) => a.folderName.rendered.localeCompare(b.folderName.rendered));
    }
    
  }
  selectedfolder(evt, folderDetails){
    this.selectedItem = folderDetails;
    this.activeFolder.emit(folderDetails);
  }

}
