import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { UserService } from '../../../services/user';
import { User } from '../../../models/user.model';
import { map, catchError } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  imports: [],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList {
  private userService = inject(UserService);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);

  users: User[] = [];
  roleNames: Record<string, string> = {};

  currentPage = 1;
  pageSize = 10;
  Math = Math;
  isLoading: boolean = false;
  isError: string = '';

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log('heeloo');

    this.loadUser();
  }

  loadUser(): void {
    this.isLoading = true;

    this.userService.getUsers(2).subscribe({
      next: (res) => {
        this.users = res.UserList;
        console.log(this.users);
        this.loadRoles();
        console.log(this.roleNames);

        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Api error', err);
        this.isError = 'Enable to fetch';
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  get totalPages(): number {
    return Math.ceil(this.users.length / this.pageSize);
  }

  get paginatedUsers(): User[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;

    return this.users.slice(startIndex, startIndex + this.pageSize);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Role Details
  loadRoles(): void {
    const uniqueRoleIds = new Map<string, { roleId: number; tenantId: number }>();

    this.users.forEach((user) => {
      const key = `${user.FK_RoleID}-${user.TenantID}`;
      if (!uniqueRoleIds.has(key)) {
        uniqueRoleIds.set(key, { roleId: user.FK_RoleID, tenantId: user.TenantID });
      }
    });

    // Prepare API requests
    const requests = Array.from(uniqueRoleIds.entries()).map(([key, role]) => {
      return this.userService.getUserRole(role.roleId, role.tenantId).pipe(
        map((response) => ({
          key,
          roleName: response.UserRoleList?.[0]?.Role ?? 'Unknown',
        })),
        catchError(() =>
          of({
            key,
            roleName: 'Unavailable',
          }),
        ),
      );
    });

    // Execute all unique role requests
    if (requests.length === 0) {
      return;
    }

    forkJoin(requests).subscribe({
      next: (results) => {
        const updatedRoles: Record<string, string> = {};

        results.forEach((result) => {
          updatedRoles[result.key] = result.roleName;
        });

        this.roleNames = updatedRoles;

        console.log('Updated roleNames:', this.roleNames);

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Role loading error:', err);
      },
    });
  }

  viewDetails(user: User): void {
    this.router.navigate(['/users/details', user.PersonID, user.TenantID]);
  }
}
