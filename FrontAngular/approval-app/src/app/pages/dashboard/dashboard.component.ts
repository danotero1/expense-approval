import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
    metrics: any = null;
    loading = false;
   constructor(private service: ExpenseService) {}
    ngOnInit(): void {
      this.loadMetrics();
    }
    loadMetrics() {
      this.loading = true;
      this.service.getMetrics().subscribe({
        next: (data: any) => {
          this.metrics = data;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
    }
 }

