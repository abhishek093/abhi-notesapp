import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {AllSetupService} from '../../services/all-setup.service';
import { Toast, ToasterService, ToasterConfig } from 'angular2-toaster';

@Component({
  selector: 'app-editors',
  templateUrl: './editors.component.html',
  styleUrls: ['./editors.component.scss']
})
export class EditorsComponent implements OnInit {
  @Input() data: any;
  @Output() updatedNotesList = new EventEmitter<any>();
  editorData : any;
  editorContent : string;
  private toasterService: ToasterService;
  public config1: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-right'
  }); 
  constructor(private service : AllSetupService ,toasterService: ToasterService) { 
    this.toasterService = toasterService;
  }

  ngOnInit() {
   
  }
  ngOnChanges(){
    this.editorData = this.data;
    // console.log("editor data:", this.editorData);
    if(this.editorData){
      if(this.editorData.title){
        this.editorContent = this.editorData.title+'\n'+this.editorData.subTitle+'\n'+this.editorData.content
      }
    }
  }
  contentChanges(content){
    // console.log("content", content);
    var [title, subTitle, ...cont] = content.split('\n');
    let obj = {
      "folderId" : this.editorData.folderId,
      "title" : title,
      "subTitle" : subTitle,
      "content" : cont.join(''),
      "modifiedDateTime" : new Date()
    }
    // console.log("obj :", obj);
    this.service.updateNoteService(obj, this.editorData.id).subscribe(data =>{
      if(data){
        this.service.getNotesService(this.editorData.folderId).subscribe(res =>{
          if(res){
            this.updatedNotesList.emit(res);
          }
        },
        error =>{
          const toast: Toast = {
            type: 'error',
            body: error,
            showCloseButton: true
          };
          this.toasterService.pop(toast);
        });
      }
      
    },
    error =>{
      const toast: Toast = {
        type: 'error',
        body: error,
        showCloseButton: true
      };
      this.toasterService.pop(toast);
    });
    
  }

}
