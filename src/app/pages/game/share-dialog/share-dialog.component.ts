import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-share-dialog',
    templateUrl: './share-dialog.component.html',
})
export class ShareDialogComponent {
    socialMediaLinks = [
        {
            name: 'social_media.facebook',
            link: 'https://www.facebook.com/sharer/sharer.php?u=',
        },
        {
            name: 'social_media.twitter',
            link: 'https://twitter.com/intent/tweet?url=',
        },
        {
            name: 'social_media.whatsapp',
            link: 'https://api.whatsapp.com/send?text=',
        },
    ];

    constructor(
        public dialogRef: MatDialogRef<ShareDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}
}
