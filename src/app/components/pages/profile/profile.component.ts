import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profile!: User;
  showForm: boolean = false;
  editProfileForm!: FormGroup;
  submited = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.profile = this.userService.currentUser;

    console.log(this.profile);

    this.editProfileForm = this.formBuilder.group({
      name: [this.profile.name, [Validators.required, Validators.minLength(5)]],
      email: [this.profile.email, [Validators.required, Validators.email]],
      password: [''],
      address: [
        this.profile.address,
        [Validators.required, Validators.minLength(7)],
      ],
    });
  }

  editProfile() {
    this.showForm = true;
  }

  cancelEdit() {
    this.showForm = false;
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
        latlng: {
          lat: '',
          lng: '',
        },
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
