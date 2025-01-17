
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//--
import { HomeRoutedComponent } from './components/shared/home-routed/home-routed.component';
//--
import { AdminUserViewRoutedComponent } from './components/user/admin-user-view-routed/admin-user-view-routed.component';
import { AdminUserPlistRoutedComponent } from './components/user/admin-user-plist-routed/admin-user-plist-routed.component';
import { AdminUserEditRoutedComponent } from './components/user/admin-user-edit-routed/admin-user-edit-routed.component';
import { AdminUserNewRoutedComponent } from './components/user/admin-user-new-routed/admin-user-new-routed.component';
import { AdminThreadPlistRoutedComponent } from './components/thread/admin-thread-plist-routed/admin-thread-plist-routed.component';
import { AdminReplyNewRoutedComponent } from './components/reply/admin-reply-new-routed/admin-reply-new-routed.component';

//--
const routes: Routes = [
  { path: '', component: HomeRoutedComponent },
  { path: 'home', component: HomeRoutedComponent },
  { path: 'admin/user/plist', component: AdminUserPlistRoutedComponent },
  { path: 'admin/user/view/:id', component: AdminUserViewRoutedComponent },  
  { path: 'admin/user/edit/:id', component: AdminUserEditRoutedComponent },
  { path: 'admin/user/new', component: AdminUserNewRoutedComponent },
  { path: 'admin/tread/plist', component: AdminThreadPlistRoutedComponent },
  { path: 'admin/reply/new', component: AdminReplyNewRoutedComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
