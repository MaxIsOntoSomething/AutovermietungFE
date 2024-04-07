import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { StorageService } from '../../services/storage/storage.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
// import { UserStorageService } from '../services/storage/user-storage.service';
// 


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  validateForm!: FormGroup;
  isSpinning = false;

  submitForm(): void {
    this.isSpinning = true;
    this.authService.login(this.validateForm.value).subscribe(
      (res) => {
        if (res.userId != null) {
          console.log(res);
          const user = {
            id: res.userId,
            role: res.userRole
          }
          console.log(user);
          StorageService.saveUser(user);
          StorageService.saveToken(res.jwt);
          if (StorageService.isAdminLoggedIn()) {
            this.router.navigateByUrl('admin/dashboard');
          } else if (StorageService.isCustomerLoggedIn()) {
            this.router.navigateByUrl('customer/dashboard');
          }
        } else {
          this.message
            .error(
              `Bad credentials`,
              { nzDuration: 5000 }
            )
        }
        this.isSpinning = false;
      })
  }

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private message: NzMessageService,
    private router: Router,) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }


  
}