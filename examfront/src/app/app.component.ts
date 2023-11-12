import { Component,  Renderer2, HostListener } from '@angular/core';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'examfront';

  constructor(private renderer: Renderer2, private login:LoginService){
    this.setFullHeight();

  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.setFullHeight();
  }

  private setFullHeight() {
    const elements = document.querySelectorAll('.js-fullheight');
    elements.forEach(element => {
      this.renderer.setStyle(element, 'height', window.innerHeight + 'px');
    });
  }
}
