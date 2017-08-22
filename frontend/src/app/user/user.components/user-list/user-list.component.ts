import { Component, OnInit} from '@angular/core';
import { UserListService } from './user-list.service';

@Component ({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss'],
    providers: [UserListService],
})
export class UserListComponent implements OnInit {
    users = [];
    name = '';

    constructor(private userListService: UserListService) { }

    ngOnInit() {
        this.userListService.getAllUsers((data) => {
            for (const user of data) {
                if (user.role !== 'admin') {
                    user.photoUrl = './resources/default.png';
                    this.users.push(user);
                }
            }
            console.log(this.users);
        });
    }

    matchSearch(user): boolean {
        return (user.firstName + user.lastName).toLowerCase().includes(this.name);
    }
}
