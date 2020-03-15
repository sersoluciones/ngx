import { GoogleSDKService } from '../../../../src/google/GoogleSDKService';
import { Component, HostListener } from '@angular/core';
import { GoogleUserProfile } from '../../../../src/google/IGoogle';

@Component({
  selector: 'app-google',
  templateUrl: './google.component.html',
  styleUrls: ['./google.component.scss']
})
export class GoogleComponent {

  constructor(private googleApiService: GoogleSDKService) { }

  @HostListener('click')
  click() {
    this.googleApiService.login().subscribe((res: GoogleUserProfile) => {
      console.log('Google profile: ', res);
    });
  }

}
