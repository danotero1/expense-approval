import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpenseService } from '../../services/expense.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-expense-form',
  standalone: false,
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.scss'
})
export class ExpenseFormComponent  implements OnInit{
  form!: FormGroup;
  isEdit = false;
  id!:number;
  constructor(
    private fb: FormBuilder,
    private service: ExpenseService,
    private route: ActivatedRoute,
    private router: Router
  ){}
  ngOnInit(): void {
    this.form = this.fb.group({
      category: ['', Validators.required],
      description: [''],
      amount: [0, [Validators.required, Validators.min(1)]],
      expensDate: ['', Validators.required],
      requestBy: ['', Validators.required]
    });
    this.id = Number(this.route.snapshot.paramMap.get('id'));
      if (this.id) {
        this.isEdit = true;
        this.service.getById(this.id).subscribe((data: any) => {
          const formattedDate = data.expensDate.split('T')[0]
          this.form.patchValue({
            ...data,
            expensDate:formattedDate
          });
        });
      }
  }
  submit(){
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }
    const data = this.form.value;
    if(this.isEdit){
      this.service.update(this.id,data).subscribe(()=>{
        this.router.navigate(['/']);
      })
    }else{
      this.service.create(data).subscribe(()=>{
        this.router.navigate(['/']);
      })
    }
  }

}
