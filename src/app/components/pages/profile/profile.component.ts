import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';
import { Order } from 'src/app/shared/models/Order';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profile!: User;
  editProfileForm!: FormGroup;
  submited = false;
  order!: Order;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastService: ToastService
  ) {
    this.order = new Order();
  }

  ngOnInit(): void {
    this.profile = this.userService.currentUser;

    this.editProfileForm = this.formBuilder.group({
      name: [this.profile.name, [Validators.required, Validators.minLength(5)]],
      email: [this.profile.email, [Validators.required, Validators.email]],
      password: [''],
      address: [
        this.profile.address,
        [Validators.required, Validators.minLength(7)],
      ],
      latlng: [this.profile.latlng],
    });
  }

  get formControls() {
    return this.editProfileForm.controls;
  }

  submit() {
    this.submited = true;
    if (this.editProfileForm.invalid) return;

    this.userService
      .saveProfile({
        name: this.formControls.name.value,
        email: this.formControls.email.value,
        password: this.formControls.password.value,
        address: this.formControls.address.value,
        latlng: this.profile.latlng,
      })
      .subscribe({
        next: () => {
          this.toastService.showSuccessToast(
            'Success',
            'Profile saved successful'
          );
        },
        error: (err) => {
          this.toastService.showErrorToast('Error', err.message);
        },
      });
  }
}
