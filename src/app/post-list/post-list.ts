import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { environment } from '../environment';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './post-list.html',
  styleUrls: ['./post-list.css']
})
export class PostList {
  allPosts: any[] = [];
  filteredPosts: any[] = [];

  // Search Models
  searchTopic: string = '';
  searchId: number | null = null;
  searchDate: string = '';

  constructor(private http: HttpClient,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.fetchPosts();
  }

  fetchPosts() {
    this.http.get<any[]>(`${environment.apiUrl}/masterclass`).subscribe({
      next: (data) => {
        this.allPosts = data;
        this.filteredPosts = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load posts', err);
        this.cdr.detectChanges();
      }
    });
  }

  applyFilters() {
    this.filteredPosts = this.allPosts.filter(post => {
      const matchesTopic = post.topic.toLowerCase().includes(this.searchTopic.toLowerCase());
      const matchesId = this.searchId ? post.id === this.searchId : true;
      const matchesDate = this.searchDate ? post.createdAt.includes(this.searchDate) : true;
      this.cdr.detectChanges();
      return matchesTopic && matchesId && matchesDate;
    });
  }
}
