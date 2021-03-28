import { Component } from '@angular/core';

export interface Link {
  url: String,
  text: String
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'verification';

  public links: Array<Link> = [
    {
      url: 'https://www.reddit.com/r/AirReps',
      text: 'Reddit'
    },
    {
      url: 'https://airreps.link/discord',
      text: 'Discord'
    },
    {
      url: 'https://github.com/AirReps',
      text: 'GitHub'
    },
    {
      url: 'https://docs.airreps.info/docs/',
      text: 'Docs'
    },
  ]

  public help: Link = {
    url: 'https://docs.airreps.info/docs/guide-verification',
    text: 'What is this?'
  }

}
