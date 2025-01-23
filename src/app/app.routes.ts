import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ResultComponent } from './pages/result/result.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'result/:date', component: ResultComponent }
];
