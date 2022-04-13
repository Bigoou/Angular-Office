import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FaceSnapListComponent} from './face-snaps/components/face-snap-list/face-snap-list.component';
import {LandingPageComponent} from './landing-page/landing-page.component';
import { SingleFaceSnapComponent } from './face-snaps/components/single-face-snap/single-face-snap.component';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { SliderComponent } from './slider/slider.component';
import { NewFaceSnapComponent } from './face-snaps/components/new-face-snap/new-face-snap.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
    {path: 'facesnaps', component: FaceSnapListComponent, canActivate: [AuthGuard]},
    {path: '', component: LandingPageComponent, canActivate: [AuthGuard]},
    {path: 'facesnaps/:id', component: SingleFaceSnapComponent, canActivate: [AuthGuard]},
    {path: 'texteditor', component: TextEditorComponent},
    {path: 'slider', component: SliderComponent},
    {path: 'newfacesnap', component: NewFaceSnapComponent, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {}