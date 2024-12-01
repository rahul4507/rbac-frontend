import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ModuleService {
  private baseUrl = `${environment.API_URL}/api/v1/modules`;

  constructor(private http: HttpClient) {}

  getModules(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  getModuleById(moduleId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${moduleId}`);
  }

  createModule(moduleData: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, moduleData);
  }

  updateModule(moduleId: string, moduleData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${moduleId}`, moduleData);
  }

  deleteModule(moduleId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${moduleId}`);
  }
}
