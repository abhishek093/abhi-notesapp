import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http' ;
import { throwError} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Toast, ToasterService, ToasterConfig } from 'angular2-toaster';

@Injectable({
  providedIn: 'root'
})
export class AllSetupService {
  private toasterService: ToasterService;
  public config1: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-center'
  });
  constructor(private http : HttpClient, toasterService: ToasterService) {
    this.toasterService = toasterService;
  }
  addFolderService(body){
    return this.http.post('http://localhost:3000/folders', body)
    .pipe(
      retry(0),
      catchError(this.customError)
    );
  }
  getFolderService(){
    return this.http.get('http://localhost:3000/folders?_sort=folderName&_order=asc')
    .pipe(
      retry(0),
      catchError(this.customError)
    );
  }
  getNotesService(id){
    return this.http.get('http://localhost:3000/notes?folderId='+id)
    .pipe(
      retry(0),
      catchError(this.customError)
    );
  }
  getAllNotesService(){
    return this.http.get('http://localhost:3000/notes')
    .pipe(
      retry(0),
      catchError(this.customError)
    );
  }
  addNoteService(body){
    return this.http.post('http://localhost:3000/notes', body)
    .pipe(
      retry(0),
      catchError(this.customError)
    );
  }
  updateNoteService(body , id){
    return this.http.put('http://localhost:3000/notes/'+id, body)
    .pipe(
      retry(0),
      catchError(this.customError)
    );
  }
  deleteNoteService(id){
    return this.http.delete('http://localhost:3000/notes/'+id)
    .pipe(
      retry(0),
      catchError(this.customError)
    );
  }
  customError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = 'Error Code: '+ error.status + '\n Message: '+ error.error.detail;
    }
    return throwError(errorMessage);
  }
}
