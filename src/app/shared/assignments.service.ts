import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Assignement } from '../assignments/assignments.model';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  assignments: Assignement[] = [];
  url = 'https://assignments-manager01.herokuapp.com/api/assignments';

  constructor(private loggingService: LoggingService,
    private http: HttpClient) { }

  getAssignments(): Observable<Assignement[]> {
    return this.http.get<Assignement[]>(this.url);
  }

  getAssignment(id: number): Observable<Assignement | undefined> {
    return this.http.get<Assignement>(this.url + "/" + id);
  }

  addAssignment(assignment: Assignement): Observable<any> {
    this.loggingService.log(assignment.nom, "Ajouté");
    return this.http.post(this.url, assignment);
  }

  updateAssignment(assignment: Assignement | undefined): Observable<any> {
    if (assignment)
      this.loggingService.log(assignment.nom, "Modifié");
    return this.http.put<Assignement>(this.url, assignment);
  }

  deleteAssignment(assignment: Assignement): Observable<any> {
    this.loggingService.log(assignment.nom, "Supprimé");
    return this.http.delete(this.url + "/" + assignment._id);
  }
}