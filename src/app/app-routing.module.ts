import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
    {
        path: 'home',
        loadChildren: () =>
            import('./pages/home/home.module').then((m) => m.HomeModule),
    },
    {
        path: 'game',
        canActivate: [authGuard],
        loadChildren: () =>
            import('./pages/game/game.module').then((m) => m.GameModule),
    },
    {
        path: 'instructions',
        loadChildren: () =>
            import('./pages/instructions/instructions.module').then(
                (m) => m.InstructionsModule
            ),
    },
    {
        path: 'ranking',
        canActivate: [authGuard],
        loadChildren: () =>
            import('./pages/ranking/ranking.module').then(
                (m) => m.RankingModule
            ),
    },
    {
        path: 'tournament',
        canActivate: [authGuard],
        loadChildren: () =>
            import('./pages/tournament/tournament.module').then(
                (m) => m.TournamentModule
            ),
    },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
