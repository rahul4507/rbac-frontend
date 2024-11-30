import { Component } from '@angular/core';

@Component({
  selector: 'app-about-tech',
  templateUrl: './about.tech.component.html',
  styleUrl: './about.tech.component.css'
})

export class AboutTechComponent {
  redirectToGitHubRepo() {
    window.open('https://github.com/rahul4507/rbac-frontend', '_blank');
  }
}
