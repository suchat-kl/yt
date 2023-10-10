import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
// import { Subject } from 'rxjs';
import { AppComponent } from './app.component';

import {InputTextModule} from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MenubarModule} from 'primeng/menubar';

import {PasswordModule} from 'primeng/password';
import {ButtonModule} from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AccordionModule} from 'primeng/accordion';
import { MenuComponent } from './menu/menu.component';
import { IndexComponent } from './index/index.component';
import { RegisterComponent } from './register/register.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserService } from './user.service';
import {YtServiceService} from './yt-service.service';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { DownloadFileComponent } from './download-file/download-file.component';
import { ChangePwdComponent } from './change-pwd/change-pwd.component';
import { ResetPwdComponent } from './reset-pwd/reset-pwd.component';
// import { ReactiveFormsModule } from '@angular/forms';
import { UploadImgComponent } from './upload-img/upload-img.component';
import {MessagesModule} from 'primeng/messages';
import { PaydateComponent } from './paydate/paydate.component';

// import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    IndexComponent,
    RegisterComponent,
    
    UploadFileComponent,
    DownloadFileComponent,
    ChangePwdComponent,
    ResetPwdComponent,
    UploadImgComponent,
    PaydateComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    InputTextModule,
    FormsModule,
    MenubarModule,
    PasswordModule,
    ButtonModule,
    BrowserAnimationsModule,
    AccordionModule,
    FontAwesomeModule,
    HttpClientModule,
    DialogModule,
    ReactiveFormsModule,
    MessagesModule,
    DropdownModule,
    // Subject,
    // MessagesModule,
    // PdfViewerModule
  ],
  providers: [YtServiceService,UserService],
  bootstrap: [AppComponent]
})
export class AppModule {
 // constructor(ytSv:YtServiceService){}
 }
