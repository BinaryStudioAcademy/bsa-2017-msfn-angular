import { GoalListComponent } from './admin.components/goal-list/goal-list.component';
import { ForAdminGuard } from '../guards/for-admin.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { UserListComponent } from './admin.components/user-list/user-list.component';
import { AdminRootProfileComponent } from './admin.components/admin-root-profile/admin-root-profile.component';
import { ExerciseCreateComponent } from './admin.components/exercise-create/exercise-create.component';
import { ExerciseListComponent } from './admin.components/exercise-list/exercise-list.component';
import { ExerciseTypeComponent } from './admin.components/exercise-type/exercise-type.component';
import { SportHandlingComponent } from './admin.components/sport-handling/sport-handling.component';
import { MeasureListComponent } from './admin.components/measure-list/measure-list.component';
import { MeasureTypeComponent } from './admin.components/measure-type/measure-type.component';
import { SportsListComponent } from './admin.components/sports-list/sports-list.component';
import { FoodTypeComponent } from './admin.components/food-type/food-type.component';
import { FoodListComponent } from './admin.components/food-list/food-list.component';

const adminRoutes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [ForAdminGuard],
        children: [
            {
                path: '',
                children: [
                    {
                        path: 'admin-root-profile/:id',
                        component: AdminRootProfileComponent
                    },
                    {
                        path: 'exercise-type',
                        component: ExerciseTypeComponent
                    },
                    {
                        path: 'exercise-list',
                        component: ExerciseListComponent
                    },
                    {
                        path: 'exercises',
                        component: ExerciseCreateComponent
                    },
                    {
                        path: 'exercises/:id',
                        component: ExerciseCreateComponent
                    },
                    {
                        path: 'user-list',
                        component: UserListComponent
                    },
                    {
                        path: 'sport-handling',
                        component: SportHandlingComponent
                    },
                    {
                        path: 'sport-handling/:id',
                        component: SportHandlingComponent
                    },
                    {
                        path: 'sports-list',
                        component: SportsListComponent
                    },
                    {
                        path: 'goal-list',
                        component: GoalListComponent
                    },
                    {
                        path: 'measure-list',
                        component: MeasureListComponent
                    },
                    {
                        path: 'measure/:id',
                        component: MeasureTypeComponent
                    },
                    {
                        path: 'measure',
                        component: MeasureTypeComponent
                    },
                    {
                        path: 'food-list',
                        component: FoodListComponent
                    },
                    {
                        path: 'food-types',
                        component: FoodTypeComponent
                    }
                ]
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(adminRoutes)
    ],
    providers: [ForAdminGuard],
    exports: [
        RouterModule
    ]
})
export class AdminRoutingModule { }
