import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CourseComponent } from './course/course.component';
import { LoginsignupComponent } from './loginsignup/loginsignup.component';
import { CourseFormComponent } from './course-form/course-form.component';

const routes: Routes = [
  {path:'', component: LandingPageComponent},
  {path:'course',component: CourseComponent},
  {path:'loginsignup',component: LoginsignupComponent},
  {path:'course-form',component: CourseFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
