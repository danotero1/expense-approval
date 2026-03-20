import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseListComponent } from './pages/expense-list/expense-list.component';
import { ExpenseFormComponent } from './pages/expense-form/expense-form.component';
import { ExpenseDetailComponent } from './pages/expense-detail/expense-detail.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: ExpenseListComponent },
 { path: 'create', component: ExpenseFormComponent },
 { path: 'edit/:id', component: ExpenseFormComponent },
 { path: 'detail/:id', component: ExpenseDetailComponent },
 { path: 'dashboard', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
