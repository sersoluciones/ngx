import { Component, HostListener } from '@angular/core';
import { GoogleAuthService } from '../../../../src/google/GoogleAuthService';
import { gapi, GoogleResponse } from '../../../../src/google/IGoogleApi';
import GoogleUser = gapi.auth2.GoogleUser;

@Component({
    selector: 'app-google',
    templateUrl: './google.component.html',
    styleUrls: ['./google.component.scss']
})
export class GoogleComponent {

    constructor(private googleAuth: GoogleAuthService) { }

    @HostListener('click')
    click() {

      this.googleAuth.getAuth().subscribe((auth) => {
          auth.signIn().then((res: GoogleUser) => {

            const profile = res.getBasicProfile();

            const googleProfile: GoogleResponse =  {
                id: profile.getId(),
                id_token: res.getAuthResponse().id_token,
                first_name: profile.getGivenName(),
                last_name: profile.getFamilyName(),
                email: profile.getEmail(),
                picture: profile.getImageUrl().replace('=s96-', '=-')
            };

            console.log(googleProfile);
        });
      });

    }

}
