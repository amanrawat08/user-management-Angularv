
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  PersonResponse,
  UserListsResponse,
  UserRoleResponse
} from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  private apiUrl = 'https://nu.vedantaerpserver.com';

  getUsers(schoolId: number): Observable<UserListsResponse> {
    return this.http.post<UserListsResponse>(
      `${this.apiUrl}/UserSelectAllBySchoolID?schoolid=${schoolId}`,
      {}
    );
  }

  getUserRole(roleId: number, tenantId: number): Observable<UserRoleResponse> {
    return this.http.post<UserRoleResponse>(
      `${this.apiUrl}/UserRoleSelect?roleid=${roleId}&tenantid=${tenantId}`,
      {}
    );
  }

  getPerson(personId: number, tenantId: number): Observable<PersonResponse> {
    return this.http.post<PersonResponse>(
      `${this.apiUrl}/PersonSelect?personid=${personId}&tenantid=${tenantId}`,
      {}
    );
  }
}
