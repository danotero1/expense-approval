import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExpenseService } from '../../services/expense.service';

@Component({
  selector: 'app-expense-detail',
  standalone: false,
  templateUrl: './expense-detail.component.html',
  styleUrl: './expense-detail.component.scss'
})
export class ExpenseDetailComponent implements OnInit {
 expense: any = null;
 loading = false;
 constructor(
   private route: ActivatedRoute,
   private service: ExpenseService
 ) {}
  ngOnInit(): void {
   const id = Number(this.route.snapshot.paramMap.get('id'));
   this.loadExpense(id);
 }
 loadExpense(id: number) {
   this.loading = true;
   this.service.getById(id).subscribe({
     next: (data: any) => {
       this.expense = data;
       this.loading = false;
     },
     error: () => {
       this.loading = false;
     }
   });
 }
}
