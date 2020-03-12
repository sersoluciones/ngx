import { ExternalScriptService } from './../../../../src/external-script/external-script.service';
import { FacebookResponse } from './facebook-response';
import { Component, OnInit, HostListener } from '@angular/core';
import { HttpParams } from '@angular/common/http';
declare var FB: any;

@Component({
    selector: 'app-facebook',
    templateUrl: './facebook.component.html',
    styleUrls: ['./facebook.component.scss']
})
export class FacebookComponent implements OnInit {

    constructor(private externalScriptService: ExternalScriptService) { }

    @HostListener('click')
    click() {

        FB.login((response: any) => {
            if (response.status === 'connected') {
                FB.api('/me', {fields: 'first_name,last_name,email'}, (res: any) => {

                    const facebookProfile: FacebookResponse =  {
                        id: res.id,
                        access_token: response.authResponse.accessToken,
                        first_name: res.first_name,
                        last_name: res.last_name,
                        email: res.email,
                    };

                    FB.api('/me/picture', {
                        width: 300,
                        redirect: 'false'
                    }, (pic: any) => {

                        if (pic?.data?.url) {
                            facebookProfile.picture = pic.data.url;
                        }

                        const loginFormEncoded = new HttpParams()
                            .set('token', facebookProfile.access_token)
                            .set('third_type', 'facebook')
                            .set('grant_type', 'delegation')
                            .set('client_id', 'third_proggresi_client')
                            .set('client_secret', '01D8CA96-37AA-43A6-8211-4C5DEBCEC848')
                            .set('scope', 'proggresi_api.full_access openid roles email profile offline_access');

                    });
                });

            } else {
                console.warn('Popup closed by user');
            }
        }, { scope: 'public_profile,email' });
    }

    ngOnInit() {
        (window as any).fbAsyncInit = () => {
            FB.init({
                appId: '889373954845473',
                cookie: true,
                xfbml: true,
                version: 'v5.0'
            });

            FB.AppEvents.logPageView();
        };

        this.externalScriptService.insert('facebook-jssdk', 'https://connect.facebook.net/en_US/sdk.js');
    }

}
