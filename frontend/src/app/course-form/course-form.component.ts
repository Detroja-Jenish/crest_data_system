import { Component } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.css'
})
export class CourseFormComponent {
  constructor(private login : LoginService){}

  onSubmit(e : any){
    const fd = new FormData()
    this.login.addCourse(fd).subscribe(
      res => {console.log(res)},
      error => {console.error(error)}
    )
  }
}
