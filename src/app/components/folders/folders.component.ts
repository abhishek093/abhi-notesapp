import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.scss']
})
export class FoldersComponent implements OnInit {
  @Input() data : any;
  @Output() activeFolder = new EventEmitter<any>();
  selectedItem = {};
  sortedData : any;
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(){
    if(this.data){
      // console.log("folder list: ", this.data);
      this.selectedItem = this.data[0];
    }
    
  }
  selectedfolder(evt, folderDetails){
    this.selectedItem = folderDetails;
    this.activeFolder.emit(folderDetails);
  }

}
