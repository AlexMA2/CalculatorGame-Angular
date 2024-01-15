import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
    constructor() {}

    nickControl = new FormControl('', [
        Validators.required,
        Validators.minLength(3),
    ]);

    ngOnInit(): void {
        console.log('HomeComponent initialized');
    }
}
