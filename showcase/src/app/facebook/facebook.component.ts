import { FacebookUserProfile } from '../../../../src/facebook/Ifacebook';
import { Component, HostListener } from '@angular/core';
import { FacebookSDKService } from '../../../../src/facebook/facebook-sdk.service';
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
