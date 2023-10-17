import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AreaEditorRoutingModule } from './area-editor-routing.module';
import { EditorComponent } from './pages/editor/editor.component';
import { TextAreaComponent } from './components/text-area/text-area.component';
import { ConsoleComponent } from './components/console/console.component';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { FormsModule } from '@angular/forms';
import { DirectorioComponent } from './components/directorio/directorio.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { FolderComponent } from './components/folder/folder.component';


@NgModule({
  declarations: [
    EditorComponent,
    TextAreaComponent,
    ConsoleComponent,
    DirectorioComponent,
    NavbarComponent,
    SideBarComponent,
    FolderComponent

  ],
  imports: [
    CommonModule,
    AreaEditorRoutingModule,
    CodemirrorModule,
    FormsModule,
  ]
})
export class AreaEditorModule { }
