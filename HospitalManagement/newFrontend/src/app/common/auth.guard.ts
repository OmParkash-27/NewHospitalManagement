import { CanActivateFn } from '@angular/router';


export const authGuard: CanActivateFn = (route, state) => {
  
  const loggedUser = sessionStorage.getItem("isLoggedIn");
  const userType = sessionStorage.getItem("userType");
  if(loggedUser == 'true' && userType != '') {
    return true;
  }
  alert("please Logged In First");
  
  return false;
};
