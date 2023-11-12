import { UpdateCategoryComponent } from './pages/admin/update-category/update-category.component';
import { StartComponent } from './pages/user/start/start.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { UpdateQuestionComponent } from './pages/admin/update-question/update-question.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { ViewQuizQuestionsComponent } from './pages/admin/view-quiz-questions/view-quiz-questions.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { AddQuizzesComponent } from './pages/admin/add-quizzes/add-quizzes.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { ViewCategoryComponent } from './pages/admin/view-category/view-category.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { loginGuard } from './guards/login.guard';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { adminGuard } from './guards/admin.guard';
import { normalGuard } from './guards/normal.guard';
import { LoadQuizComponent } from './pages/user/load-quiz/load-quiz.component';
import { SidebarComponent } from './pages/admin/sidebar/sidebar.component';
const routes: Routes = [
  {
    path:'signup',
    component:SignupComponent,
    pathMatch:'full',
    canActivate:[loginGuard]
    
  },
  {
    path:'login',
    component:LoginComponent,
    pathMatch:'full',
    canActivate:[loginGuard]
  },
  {
    path:'profile',
    component:ProfileComponent,
    pathMatch:'full',
  },
  {
    path:'',
    component:HomeComponent,
    pathMatch:'full',
    canActivate:[loginGuard]
  },
  {
    path:'admin',
    component:DashboardComponent,
    children:[
      {
        path:'',
        component:SidebarComponent
      },
      {
        path:'categories',
        component:ViewCategoryComponent
      },
      {
        path:'add-category',
        component:AddCategoryComponent
      },
      {
        path:'quizzes',
        component:ViewQuizzesComponent
      },
      {
        path:'add-quizzes',
        component:AddQuizzesComponent
      },
      {
        path:'quiz/:qid',
        component:UpdateQuizComponent
      },
      {
        path:'category/:cid',
        component:UpdateCategoryComponent
      },
      {
        path:'view-questions/:qid/:title',
        component:ViewQuizQuestionsComponent
      },
      {
        path:'add-question/:qid/:title',
        component:AddQuestionComponent
      },
      {
        path:'question/:qid',
        component:UpdateQuestionComponent
      },
    ],
    canActivate:[adminGuard]
  },
  {
    path:'user-dashboard',
    component:UserDashboardComponent,
    children:[
      {
        path:':catId',
        component:LoadQuizComponent
      },
      {
        path:'instructions/:qid',
        component:InstructionsComponent
      },
    ],
    canActivate:[normalGuard]

  },
  {
    path:'start/:qid',
    component:StartComponent,
    canActivate:[normalGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
