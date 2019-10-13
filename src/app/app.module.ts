import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {AllSetupService} from './services/all-setup.service';
import { FoldersComponent } from './components/folders/folders.component';
import { NotesComponent } from './components/notes/notes.component';
import { EditorsComponent } from './components/editors/editors.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ToasterModule, ToasterService} from 'angular2-toaster';

@NgModule({
  declarations: [
    AppComponent,
    FoldersComponent,
    NotesComponent,
    EditorsComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    ToasterModule
  ],
  providers: [AllSetupService, ToasterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
