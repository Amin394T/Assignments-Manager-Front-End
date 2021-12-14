import { Component, OnInit } from '@angular/core';
import { Routes } from '@angular/router';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignement } from './assignments.model';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {

  assignments:Assignement[] = [];
  value: string = "";
  displayedColumns: string[] = ['id', 'nom', 'dateRendu', 'rendu', 'action', 'delete'];

  constructor(private assignmentService:AssignmentsService) { }

  ngOnInit(): void {
    this.getAssignments();
  }

  getAssignments(){
    this.assignmentService.getAssignments()
    .subscribe(assignments=>{
      this.assignments = assignments.filter(name => name.nom.indexOf(this.value) !== -1);
    });  
  }

  onDelete(assignment:any): void {
    this.assignmentService.deleteAssignment(assignment).subscribe(() => this.ngOnInit());
  }

  onSearch(){
    this.ngOnInit();
  }
}