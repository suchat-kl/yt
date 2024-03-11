import { ActivatedRoute, RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';

import { IndexComponent } from './index/index.component';
import { RegisterComponent } from './register/register.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { DownloadFileComponent } from './download-file/download-file.component';
import { ChangePwdComponent } from './change-pwd/change-pwd.component';
import { ResetPwdComponent } from './reset-pwd/reset-pwd.component';
import { UploadImgComponent } from './upload-img/upload-img.component';
import { PaydateComponent } from './paydate/paydate.component';
import { ChangeusrComponent } from './changeusr/changeusr.component';
const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'uploadimg', component: UploadImgComponent },
  { path: 'uploadfile', component: UploadFileComponent },
  { path: 'downloadfile', component: DownloadFileComponent },
  { path: 'changepwd', component: ChangePwdComponent },
  { path: 'resetpwd', component: ResetPwdComponent },
  { path: 'paydate', component: PaydateComponent },
  { path: 'changeusr',component:ChangeusrComponent},
  { path: '**', component: IndexComponent }, //this is last line only
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
