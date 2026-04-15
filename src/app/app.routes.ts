import { Routes } from '@angular/router';
import { PostDetail } from './post-detail/post-detail';
import { PostList } from './post-list/post-list';


export const routes: Routes = [
  { path: 'list', component: PostList },
  { path: 'post/:id', component: PostDetail },
  { path: '', redirectTo: '/list', pathMatch: 'full' }
];