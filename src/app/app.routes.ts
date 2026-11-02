import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        loadComponent: () => import('./features/user-management/user-list/user-list').then((m) => m.UserList)
    },
    {
        path:'users',
        loadComponent: () => import('./features/user-management/user-list/user-list').then((m) => m.UserList)
    },
    {
        path:'users/details/:personId/:tenantId',
        loadComponent: () => import('./features/user-management/user-detail/user-detail').then((m) => m.UserDetail)
    }
];
