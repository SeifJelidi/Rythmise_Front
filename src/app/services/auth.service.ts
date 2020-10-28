import {Injectable, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable()
export class AuthService {

  @Output() isSessionID: BehaviorSubject<boolean> = new BehaviorSubject(false);
  @Output() userID: BehaviorSubject<string> = new BehaviorSubject(null);

  constructor(private httpClient: HttpClient) {
  }

  checkLogin(email, password): Observable<any> {
    return this.httpClient.post<any>('https://localhost:8000/login',
      {
        email,
        password
      }, {observe: 'response'});
  }

  addUser(email, password, username, phone): Observable<any> {
    return this.httpClient.post<any>('https://localhost:8000/api/users',
      {
        email,
        password,
        username,
        phone,
        image: 'https://icon-library.com/images/default-user-icon/default-user-icon-4.jpg'
      });
  }

  editUser(id, email, password, username, phone, image, socials, location): Observable<any> {
    return this.httpClient.put<any>('https://localhost:8000/api/users/' + id,
      {
        email,
        password,
        username,
        phone,
        image,
        socials,
        location
      });
  }

  /*getUser(iri): Observable<any> {
    return this.httpClient.get<any>('https://localhost:8000' + iri);
  }*/

  getUserByID(id): Observable<any> {
    return this.httpClient.get<any>('https://localhost:8000/api/users/' + id);
  }

  logOut(): Observable<any> {
    return this.httpClient.get<any>('https://localhost:8000/logout');
  }

  isConnected(): Observable<any> {
    return this.httpClient.get('https://localhost:8000/connected');
  }

  isValidPassword(password): Observable<any> {
    return this.httpClient.post<any>('https://localhost:8000/isvalidpassword', password);
  }

  verifyEmail(username, token): Observable<any> {
    return this.httpClient.get<any>('https://localhost:8000/confirm_user?username=' + username + '&token=' + token);
  }

}
