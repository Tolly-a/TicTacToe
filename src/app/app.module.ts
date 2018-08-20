import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { PlayGroundComponent } from './play-ground/play-ground.component';
import { BoardComponent } from './play-ground/board/board.component';
import { SquareComponent } from './play-ground/board/square/square.component';
import { AccountComponent } from './play-ground/account/account.component';
//service
import { PlaygroundService } from './play-ground/playground.service';


@NgModule({
  declarations: [
    AppComponent,
    PlayGroundComponent,
    BoardComponent,
    SquareComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [PlaygroundService],
  bootstrap: [AppComponent]
})
export class AppModule { }
