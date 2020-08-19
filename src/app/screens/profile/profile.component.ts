import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/services/profile.service';
import { UserConfirmationModalComponent } from 'src/app/components/user-confirmation-modal/user-confirmation-modal.component';

export const PROFILE_ERRORS = {
  name: {
    pattern: 'El nombre debe ser solo letras',
    required: 'El nombre es requerido',
  },
  birthday: {
    required: 'La fecha de nacimiento es requerida',
    pattern: 'La fecha debe tener el formato dd/mm/yyyy',
  },
  country: {
    required: 'El país es requerido'
  },
  gender: {
    required: 'El género es requerido'
  },
  image: {
    required: 'La imagen es requerida'
  }
};

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  form: FormGroup;
  @ViewChild('userConfirmationModal', { static: false }) private confirmationModal: UserConfirmationModalComponent;
  countries = [
    {
      id: 1,
      name: 'Argentina'
    },
    {
      id: 2,
      name: 'Colombia'
    },
    {
      id: 3,
      name: 'Estados Unidos'
    }
  ];
  genders = [
    {
      id: 'M',
      name: 'Masculino'
    },
    {
      id: 'F',
      name: 'Femenino'
    }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    const userData = this.profileService.getUserData();
    this.form = this.formBuilder.group({
      name: [userData.name, Validators.compose([Validators.required, Validators.pattern('[A-Za-z ]*')])],
      lastname: [userData.lastname],
      birthday: [userData.birthday,
        Validators.compose([
          Validators.required,
          Validators.pattern('[0-3][0-9]/[0-1][0-9]/[1-9][0-9][0-9][0-9]')
        ])
      ],
      country: [userData.country, Validators.compose([Validators.required])],
      image: [userData.image, Validators.compose([Validators.required])],
      gender: [userData.gender, Validators.compose([Validators.required])]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.profileService.updateUserData(this.form.value);
      this.form.reset(this.form.value);
      this.confirmationModal.open();
    }
  }

  onCancel() {
    this.form.reset();
  }

  getErrorMessage(control: string): string {
    const controlErrors = this.form.get(control).errors;
    let errorMessage = '';
    if (controlErrors) {
      const errorKey = Object.keys(controlErrors)[0];
      errorMessage = PROFILE_ERRORS[control][errorKey];
    }
    return errorMessage;
  }
}
