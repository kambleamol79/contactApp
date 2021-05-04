import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddContactComponent } from './components/add-contact/add-contact.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { EditContactComponent } from './components/edit-contact/edit-contact.component';
const routes: Routes = [

  {
    path: "contactApp", component: HeaderComponent, children: [
      { path: "", component: HomeComponent },
      { path: "add", component: AddContactComponent },
      { path: "edit/:id", component: EditContactComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
