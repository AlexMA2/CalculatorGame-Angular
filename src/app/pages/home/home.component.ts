import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {
    constructor() {}

    nickControl = new FormControl('', [
        Validators.required,
        Validators.minLength(3),
    ]);


}
