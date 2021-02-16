import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PermsGuard implements CanActivate {
  constructor(private auth: AuthService,
    private route: Router){

}
  canActivate(): boolean{
    if(this.auth.isAdmin()){
      return true;
    }else{
      this.route.navigate(['/login']);
      return false;
    }
  }
  
}
