import {
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { Subscription, Observable } from 'rxjs';

import { AuthService } from '../../auth/auth.service';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent  {
  @Output() closeSidenav = new EventEmitter<void>();
  isAuth$ = new Observable<boolean>();
  authSubscription: Subscription;

  constructor(private authService: AuthService, private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }

  onClose() {
    this.closeSidenav.emit();
  }

  onLogout() {
    this.onClose();
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
