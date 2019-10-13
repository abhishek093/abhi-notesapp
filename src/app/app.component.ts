import { Component } from '@angular/core';
import {AllSetupService} from './services/all-setup.service';
import { Toast, ToasterService, ToasterConfig } from 'angular2-toaster';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'notesApp';
  folderList: any;
  notesList : any;
  displayFolderFlag = true;
  newNoteFlag = false;
  newNote : any;
  folder_id;
  notesLength = 0;
  notesData;
  private toasterService: ToasterService;
  public config1: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-right'
  });
  constructor(private service : AllSetupService, toasterService: ToasterService){
    this.toasterService = toasterService;
    if(this.folder_id === undefined){
      this.folder_id = 1;
    }
    
  }
  ngOnInit(){
    this.getAllFolders();
  }
  getAllFolders(){
    this.service.getFolderService().subscribe(data =>{
      this.folderList = data;
      // console.log("folder data:", this.folderList);
      this.getNotes(this.folderList[0].id);
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
  toggle(){
    if(this.displayFolderFlag){
      this.displayFolderFlag = false;
    }else{
      this.displayFolderFlag = true;
    }
  }
  createFolder(){
    let newFolder = prompt("Please enter folder name", "");
    const obj = {};
    if(newFolder === null || newFolder == "") {
    }else{
      obj['id'] = this.folderList.length+1;
      obj['folderName'] = newFolder;
      obj['createdDate'] = new Date();
      this.service.addFolderService(obj).subscribe(data =>{
        if(data){
          let toast: Toast = {
            type: 'success',
            body: 'Folder added successfully.',
            showCloseButton: true
          };
          this.toasterService.pop(toast);
          this.getAllFolders();
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
  
  selectedFolder(evt){
    this.activatedNote = undefined;
    // console.log("selected folder in app:", evt);
    this.folder_id = evt.id;
    this.getNotes(evt.id);
  }
  getNotes(id){
    this.service.getNotesService(id).subscribe(data =>{
      if(data){
        this.notesList = data;
        // console.log("notes list:", data);
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
  activatedNote : any;
  selectedNote(item){
    this.activatedNote = item
  }
  createNote(){
    this.activatedNote = undefined;
    this.service.getAllNotesService().subscribe(res =>{
      if(res){
        this.notesData = res;
        let id = Math.max.apply(Math, this.notesData.map(function(o) { return o.y; }))
        let body = {
          "id" : id+1,
          "folderId" : this.folder_id,
          "title" : "New note", 
          "subTitle" : "No addition text",
          "content" : "",
          "modifiedDateTime" : new Date()
        }
        this.service.addNoteService(body).subscribe(data =>{
          if(data){
            this.notesLength = body.id;
            this.getNotes(this.folder_id);
            let toast: Toast = {
              type: 'success',
              body: 'Note created successfully.',
              showCloseButton: true
            };
            this.toasterService.pop(toast);
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
        // this.notesLength = notesData.length;
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
  getUpdatedNotes(evt){
    this.notesList = evt;
    // console.log("updated notes list:", this.notesList);
  }
  // formatDate(date) {
  //   let day = date.getDate();
  //   let month = date.getMonth()+1;
  //   let year = date.getFullYear();
  //   let time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    
  //   return day + '/' +  month + '/' + year + ' ' + time;
  // }

  deleteNote(){
    // console.log("active note:", this.activatedNote);
    if(this.activatedNote){
      this.service.deleteNoteService(this.activatedNote.id).subscribe(data =>{
        if(data){
          // if(this.activatedNote.id === this.notesLength){
          //   this.notesLength = this.notesLength - 1;
          // }
          this.activatedNote = undefined;
          this.getNotes(this.folder_id);
          let toast: Toast = {
            type: 'success',
            body: 'Note deleted successfully.',
            showCloseButton: true
          };
          this.toasterService.pop(toast);
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
    }else{
      let toast: Toast = {
        type: 'error',
        body: 'Please select note.',
        showCloseButton: true
      };
      this.toasterService.pop(toast);
    }
  }
}
