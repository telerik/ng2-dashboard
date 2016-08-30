import { Component, ViewEncapsulation } from '@angular/core';
import { GithubService } from '../../../shared/github.service'

@Component({
  selector: 'profile',
  encapsulation: ViewEncapsulation.None,
  styles: [
      require("../app.style.scss").toString()
  ],
  providers: [GithubService],
  templateUrl: './profile.template.html'
})
export class Profile {
  public user = {};
  private profileDialogVisible = false;
  private deleteDialogVisible = false;
  constructor(public githubService: GithubService) {
    githubService.getGithubUser('kirilnn').subscribe(data => {
      this.user = data;
    });
  }

  public onProfileDialogClose() {
    this.profileDialogVisible = false;
  }

  public onUpdateClick() {
    this.profileDialogVisible = true;
  }

  public onDeleteClick() {
    this.deleteDialogVisible = true;
  }

  public onDeleteDialogClose() {
    this.deleteDialogVisible = false;
  }
}
