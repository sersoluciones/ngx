import { FacebookUserProfile } from './../../../../src/facebook/IFacebook';
import { Component, HostListener } from '@angular/core';
import { FacebookSDKService } from '../../../../src/facebook/FacebookSDKService';
declare var FB: any;

@Component({
  selector: 'app-facebook',
  templateUrl: './facebook.component.html',
  styleUrls: ['./facebook.component.scss']
})
export class FacebookComponent {

  constructor(private facebookSDKService: FacebookSDKService) { }

  @HostListener('click')
  click() {
    this.facebookSDKService.login().subscribe((res: FacebookUserProfile) => {
      console.log('Facebook profile: ', res);
    });
  }

}
