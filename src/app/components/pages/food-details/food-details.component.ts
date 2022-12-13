import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { FoodService } from 'src/app/services/food.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';
import { Food } from 'src/app/shared/models/Food';
import { User } from 'src/app/shared/models/User';
import { IMAGES_HOST } from '../../../shared/constants/urls';

@Component({
  selector: 'app-food-details',
  templateUrl: './food-details.component.html',
  styleUrls: ['./food-details.component.scss'],
})
export class FoodDetailsComponent implements OnInit {
  food!: Food;
  imageHost = IMAGES_HOST;
  isFavorite: boolean = false;
  currentUser!: User;
  showForm: boolean = false;
  editForm!: FormGroup;
  submited = false;

  constructor(
    activatedRoute: ActivatedRoute,
    private foodService: FoodService,
    private cartService: CartService,
    private favoriteService: FavoritesService,
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private toastService: ToastService
  ) {
    activatedRoute.params.subscribe((params) => {
      if (params['foodId']) {
        foodService.getFoodById(params['foodId']).subscribe((response) => {
          this.food = response;
          this.isFavorite = this.favoriteService.isFavorite(this.food.id);
          this.activateForm();
        });
      }
    });
  }

  ngOnInit(): void {
    this.currentUser = this.userService.currentUser;
  }

  activateForm() {
    this.editForm = this.formBuilder.group({
      name: [this.food.name, [Validators.required, Validators.minLength(3)]],
      origins: [
        this.food.origins,
        [Validators.required, Validators.minLength(1)],
      ],
      tags: [
        this.food.tags?.join(', '),
        [Validators.required, Validators.minLength(1)],
      ],
      cookTime: [this.food.cookTime, [Validators.required, Validators.min(1)]],
      price: [this.food.price, [Validators.required, Validators.min(1)]],
      ingredients: [
        this.food.ingredients.join(', '),
        [Validators.required, Validators.min(1)],
      ],
      description: [
        this.food.description,
        [Validators.required, Validators.minLength(20)],
      ],
    });
  }

  get formControls() {
    return this.editForm.controls;
  }

  addToCart() {
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl('/cart');
  }

  addToFavorites() {
    this.isFavorite = true;
    this.favoriteService.addFavorite(this.food);
  }

  removeFromFavorites() {
    this.isFavorite = false;
    this.favoriteService.removeFavorite(this.food);
  }

  showEditForm() {
    if (!this.currentUser.isAdmin) return;
    this.showForm = true;
  }

  cancelEdit() {
    this.showForm = false;
  }

  saveForm() {
    this.submited = true;
    if (this.editForm.invalid) return;
    console.log('saving...');

    const foodObj = {
      id: this.food.id,
      name: this.formControls.name.value,
      origins: this.formControls.origins.value,
      tags: this.formControls.tags.value.split(', '),
      cookTime: Number(this.formControls.cookTime.value),
      price: Number(this.formControls.price.value),
      ingredients: this.formControls.ingredients.value.split(', '),
      description: this.formControls.description.value,
      imageUrl: this.food.imageUrl,
    };

    this.foodService.updateFood(foodObj).subscribe({
      next: (response) => {
        this.showForm = false;
        this.food = response;
        this.toastService.showSuccessToast(
          'Success',
          'Food updated successful'
        );
        // window.location.reload();
      },
      error: (error) => {
        this.toastService.showErrorToast('Error', error.message);
      },
    });
  }
}
