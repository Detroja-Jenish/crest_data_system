import { Component } from '@angular/core';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent {
  arr=[
    {
      name:"cbdhc",
      image:"assets/img/c1.jpg",
      levels:10,
      str:"https://media.geeksforgeeks.org/wp-content/uploads/20231229150325/dm1.jpeg"
    },
    {
      name:"vneied",
      image:"assets/img/c1.jpg",
      str:"https://media.geeksforgeeks.org/wp-content/uploads/20231229145100/d2.webp"
    }
  ]
  
}
