import { Component } from '@angular/core';

@Component({
  selector: 'app-about-developer',
  templateUrl: './about.developer.component.html',
  styleUrl: './about.developer.component.css'
})

export class AboutDeveloperComponent {
  redirectToPortfolio() {
    window.open('https://rahulhiragond-me.vercel.app/', '_blank');
  }

  redirectToLinkedIn() {
    window.open('https://www.linkedin.com/in/rahul-hiragond/', '_blank');
  }
}
