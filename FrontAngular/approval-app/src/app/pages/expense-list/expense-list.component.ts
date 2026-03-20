import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';

@Component({
  selector: 'app-expense-list',
  standalone: false,
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.scss'
})
export class ExpenseListComponent implements OnInit{

  filters = {
    status:'',
    category:'',
    startDate:'',
    endDate:''
  }
  expenses:any[]=[]
  loading = false;
  error= "";

  constructor(private expenseService:ExpenseService){}

  ngOnInit(): void {
    this.loadExpenses()
  }

  loadExpenses(){
    this.loading  = true;
    this.error = "";
    const params:any = {}
    if (this.filters.status) params.status = this.filters.status;
    if (this.filters.category) params.category = this.filters.category;
    if (this.filters.startDate) params.startDate = this.filters.startDate;
    if (this.filters.endDate) params.endDate = this.filters.endDate;
    this.expenseService.getAll(params).subscribe({
      next:(data:any)=>{
        this.expenses =data;
        this.loading = false;
      },
      error:(err) =>{
        console.log(err)
        this.error = 'Error al cargar solicitudes';
        this.loading = false;
      }
    })
  }
  clearFilter(){
    this.filters= {
      status:'',
      category:'',
      endDate:'',
      startDate:''
    }
    this.loadExpenses()
  }
  approve(id:number){
    this.expenseService.approve(id).subscribe(()=>{
      this.loadExpenses()
    })
  }
  reject(id:number){
     this.expenseService.reject(id).subscribe(()=>{
      this.loadExpenses()
    })
  }
}
