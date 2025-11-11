import { Routes } from '@angular/router';
import { Documentation } from './archived/documentation/documentation';
import { Crud } from './archived/crud/crud';
import { Empty } from './archived/empty/empty';

export default [
    { path: 'documentation', component: Documentation },
    { path: 'crud', component: Crud },
    { path: 'empty', component: Empty },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
