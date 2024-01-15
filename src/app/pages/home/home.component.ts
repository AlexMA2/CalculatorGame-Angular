import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
    constructor() {}

    nickControl = new FormControl('');

    ngOnInit(): void {
        console.log('HomeComponent initialized');
    }
}
