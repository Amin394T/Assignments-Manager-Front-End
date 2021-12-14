import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignement } from '../assignments.model';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {

  nomForm:string ="";
  dateForm?:Date;

  constructor(private assignmentService:AssignmentsService,
              private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    let newAssignement = new Assignement();
    if((this.nomForm) && (this.dateForm)){
      newAssignement.nom = this.nomForm;
      newAssignement.dateRendu = this.dateForm;
      newAssignement.rendu = false;
      newAssignement.id = Math.round(Math.random()*10000);

      this.assignmentService.addAssignment(newAssignement)
      .subscribe(message=>{
        console.log(message);
        
        this.router.navigate(["/home"]);
      })
      
    }
  }

}
