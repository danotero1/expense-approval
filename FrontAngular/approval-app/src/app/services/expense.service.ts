import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/evironment';
@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private apiUrl = `${environment.apiUrl}/ExpenseRequest`;
  constructor(private http: HttpClient) { }
    getAll(params?: any) {
    return this.http.get(this.apiUrl, { params });
  }
  getById(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  create(data: any) {
    return this.http.post(this.apiUrl, data);
  }
  update(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }
  approve(id: number) {
    return this.http.put(`${this.apiUrl}/${id}/approve`, {});
  }
  reject(id: number) {
    return this.http.put(`${this.apiUrl}/${id}/reject`, {});
  }
  getMetrics() {
    return this.http.get(`${this.apiUrl}/metrics`);
  }
}

