import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { SideMenuService } from '../core/services/side-menu/side-menu-service.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
  animations: [
    trigger('slide', [
      state('up', style({ height: 0 })),
      state('down', style({ height: '*' })),
      transition('up <=> down', animate(200))
    ])
  ]
})
export class SidemenuComponent implements OnInit {

  menus: any;
  constructor(public sideMenuService: SideMenuService) {
    this.menus = sideMenuService.getMenuList();
   }

  ngOnInit() {
  }

  getSideBarState() {
    return this.sideMenuService.getSidebarState();
  }

  toggle(currentMenu: any) {
    if (currentMenu.type === 'dropdown') {
      this.menus.forEach((element: any) => {
        if (element === currentMenu) {
          currentMenu.active = !currentMenu.active;
        } else {
          element.active = false;
        }
      });
    }
  }

  getState(currentMenu: any) {

    if (currentMenu.active) {
      return 'down';
    } else {
      return 'up';
    }
  }

  hasBackgroundImage() {
    return this.sideMenuService.hasBackgroundImage;
  }
}
