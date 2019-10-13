import { Component, OnInit, Input, Output , EventEmitter} from '@angular/core';
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  @Input() data : any;
  @Output() activeNote = new EventEmitter<any>();
  selectedItem = {};
  constructor() { }

  ngOnInit() {
    // this.selectedItem = this.data[0];
  }
  ngOnChanges(){
    // if(this.data){
    //   // console.log("folder list: ", this.data);
      
    //   // this.selectedItem = this.data[0];
    // }
  }
  sortFunc(a, b) {
    return new Date(b.modifiedDateTime).getTime() - new Date(a.modifiedDateTime).getTime()
  }

  selectedNote(evt, item){
    this.selectedItem = item;
    this.activeNote.emit(item);
  }

}
