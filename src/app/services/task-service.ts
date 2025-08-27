import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  API_URL = environment.api_url;

  // We can use a intance of HttpClient object to make API calls for data
  // This is accomplished by importing provideHttpClient module
  constructor(private httpClientInstance: HttpClient) {}

  gettasks(): Observable<Task[]> {
    // We can use < > to specify the type of data we expect from the API call
    return this.httpClientInstance.get<Task[]>(this.API_URL + '/tasks');
  }

  gettask(id: number): Observable<Task> {
    // We can use < > to specify the type of data we expect from the API call
    return this.httpClientInstance.get<Task>(this.API_URL + '/tasks/' + id);
  }

  addtask(course: Task): Observable<Task> {
    // We can use < > to specify the type of data we expect from the API call
    return this.httpClientInstance.post<Task>(this.API_URL + '/tasks', course);
  }

  updatetask(id: number, updatedtask: Task): Observable<Task> {
    // We can use < > to specify the type of data we expect from the API call
    return this.httpClientInstance.patch<Task>(
      this.API_URL + '/tasks/' + id,
      updatedtask
    );
  }

  deletetask(id: number): Observable<Task> {
    // We can use < > to specify the type of data we expect from the API call
    return this.httpClientInstance.delete<Task>(this.API_URL + '/tasks/' + id);
  }
}
