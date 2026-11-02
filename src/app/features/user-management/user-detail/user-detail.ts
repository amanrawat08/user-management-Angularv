import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { UserService } from '../../../services/user';
import { Person } from '../../../models/user.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  imports: [],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.css',
})
export class UserDetail {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private userService = inject(UserService);
  private cdr = inject(ChangeDetectorRef);
  
  person: Person | null = null;
  isLoading: boolean = false;
  isError: string = '';

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const personID = Number(this.route.snapshot.paramMap.get('personId'));
    const tenantID = Number(this.route.snapshot.paramMap.get('tenantId'));

    this.loadPerson(personID, tenantID);

  }

  loadPerson(personId: number, tenantId: number): void {
    this.isLoading = true;

    console.log(`Fetching person details for PersonID: ${personId}, TenantID: ${tenantId}`);

    this.userService.getPerson(personId, tenantId).subscribe({
      next: (res) => {
        this.person =  res.PersonList?.[0] ?? null;
        console.log('Fetched person details:', this.person);
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Api error', err);
        this.isError = 'Enable to fetch';
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    })
  }
  goBack(): void {
  this.router.navigate(['/users']);
}


}
