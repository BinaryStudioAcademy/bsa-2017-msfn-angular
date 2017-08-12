import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-admin-root-profile',
  templateUrl: './admin-root-profile.component.html',
  styleUrls: ['./admin-root-profile.component.scss']
})
export class AdminRootProfileComponent implements OnDestroy {
  private id: number;
  private subscription: Subscription;

  constructor(private activateRoute: ActivatedRoute) {
      this.subscription = activateRoute.params.subscribe(params => this.id = params['id']);
  }

  ngOnDestroy() {
      this.subscription.unsubscribe();
  }
}
