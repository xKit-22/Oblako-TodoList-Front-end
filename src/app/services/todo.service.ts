import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import {Observable, Subject} from "rxjs";
import {Todo} from "../entities/todo";
import {SERVER_URL} from "./server.config";
import {Project} from "../entities/project";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  public updateProjectsEvent: Subject<void> = new Subject<void>()

  constructor(private httpClient: HttpClient) { }

  createTodo(projectId: number, text: string ): Observable<Todo> {
    return this.httpClient.post<Todo>(SERVER_URL + `/todos`, {
      id: projectId,
      text: text,
      isCompleted: false
    })
  }

  updateTodo(todo: Todo, projectId: number):Observable<Todo> {
    return this.httpClient.patch<Todo>(SERVER_URL + `/projects/${projectId}/todo/${todo.id}`, todo)
  }

  getProjects():Observable<Project[]> {
      return this.httpClient.get<Project[]>(SERVER_URL + `/projects/`)
  }

  createProject(title: string): Observable<Project>{
    return this.httpClient.post<Project>(SERVER_URL + `/projects/`, {
      title: title
    })
  }



}
