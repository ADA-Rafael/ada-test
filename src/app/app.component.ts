import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, RendererFactory2, ViewChild } from '@angular/core';
import { CytoscapeStyleSheet } from './core/map/cytoscape-style';
import { SideMenuService } from './core/services/side-menu/side-menu-service.service';
import { EdgeHandlesConfig } from './core/map/config/edgehandles-config';
import { PanzomConfig } from './core/map/config/panzom-config';
import Swal from 'sweetalert2';

var trilateration = require('node-trilateration');

declare var cytoscape: any;
declare var require: any;

require('cytoscape-edgehandles');
const pz = require('cytoscape-panzoom');
cytoscape.use(pz);

const enum NodeType {
  standard = '#041E42',
  unknow = '#F17907'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  // @ViewChild('myCanvas', { static: true }) myCanvas: ElementRef<HTMLCanvasElement>

  public title = 'angular-pro-sidebar';
  public eh: any;
  private renderer: Renderer2;
  public network: any;
  public background: any;
  // public context: CanvasRenderingContext2D | null;

  public canvas: any;
  public context: any;

  private trashIcon = '<span class="fa fa-trash fa-2x"></span>';
  private infoIcon = '<span class="fa fa-info fa-2x"></span>';
  private checkIcon = '<span class="fa fa-check fa-2x"></span>';

  options: any = {
    removeOnSpill: true
  }

  constructor(public sideMenuService: SideMenuService, rendererFactory: RendererFactory2) { this.renderer = rendererFactory.createRenderer(null, null); }

  ngOnInit(): void {
    this.renderCyto();
    setInterval(() => {
      this.sideMenuService.getAll().subscribe((x) => {
        console.log(x[0].payload);
        this.newPosition(x[0].payload);
      });
    }, 1500);

    this.canvas = document.getElementById("imgCanvas");
    this.context = this.canvas.getContext("2d");

    // window.addEventListener('mousemove', this.draw.bind(this), false);
  }

  // public draw(e: any) {
  //   const pos = this.getMousePos(this.canvas, e);
  //   const posx = pos.x;
  //   const posy = pos.y;
  //   this.context.fillStyle = "#000000";
  //   this.context.fillRect(posx, posy, 4, 4);

  //   console.log(pos);
  // }

  ngAfterViewInit(): void {

  }


  public newPosition(data: any[]) {

    const dist = this.distance(data[0].ibeaconTxPower, data[0].rssi);

    console.log(data[0].mac.toString().substr(10, 2), 'Metros: ' + dist.toFixed(2).toString(), data[0].ibeaconTxPower, data[0].rssi)

    // beacons[i - 1].distance = dist * 300;
    const nodes = this.network.nodes();

  }

  // public getMousePos(canvas: any, evt: any) {

  //   var rect = canvas.getBoundingClientRect();
  //   return {
  //     x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
  //     y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
  //   };
  // }



  // public newPosition(data: any[]) {
  //   console.clear();

  //   // const beacons = [

  //   //   { x: 900, y: 100, distance: 5.7 },
  //   //   { x: 500, y: 800, distance: 6.8 },
  //   //   { x: 1300, y: 800, distance: 6.4 }

  //   // ];


  //   for (let i = 1; i < 2; i++) {

  //     const dist = this.distance(data[i].ibeaconTxPower, data[i].rssi);

  //     console.log(data[i].mac.toString().substr(10, 2), 'Metros: ' + dist.toFixed(2).toString(), data[i].ibeaconTxPower, data[i].rssi)

  //     // beacons[i - 1].distance = dist * 300;
  //     const nodes = this.network.nodes();
  //     const node = nodes[1];
  //     nodes[1].data('name', 'teste')

  //   }

  //   const nodes = this.network.nodes();
  //   const node = nodes[1];

  //   // console.log(beacons);


  //   // const pos = this.getTrilateration(beacons[0], beacons[1], beacons[2]);
  //   node.position('x', 100);
  //   // node.position('y', pos.y);

  //   // console.log("X: " + pos.x + "; Y: " + pos.y);
  // }

  // private getTrilateration(position1: any, position2: any, position3: any) {
  //   var xa = position1.x;
  //   var ya = position1.y;
  //   var xb = position2.x;
  //   var yb = position2.y;
  //   var xc = position3.x;
  //   var yc = position3.y;
  //   var ra = position1.distance;
  //   var rb = position2.distance;
  //   var rc = position3.distance;

  //   var S = (Math.pow(xc, 2.) - Math.pow(xb, 2.) + Math.pow(yc, 2.) - Math.pow(yb, 2.) + Math.pow(rb, 2.) - Math.pow(rc, 2.)) / 2.0;
  //   var T = (Math.pow(xa, 2.) - Math.pow(xb, 2.) + Math.pow(ya, 2.) - Math.pow(yb, 2.) + Math.pow(rb, 2.) - Math.pow(ra, 2.)) / 2.0;
  //   var y = ((T * (xb - xc)) - (S * (xb - xa))) / (((ya - yb) * (xb - xc)) - ((yc - yb) * (xb - xa)));
  //   var x = ((y * (ya - yb)) - T) / (xb - xa);

  //   return {
  //     x: x,
  //     y: y
  //   };
  // }



  public distance(txPower: number, rssi: number) {
    const n = 2;
    const mp = -35;
    return 10 ** (((txPower - rssi)) / (10 * n));
  }

  // public calcDistbyRSSI(rssi: number, measurePower: number = -20): any {
  //   const iRssi = Math.abs(rssi)
  //   const iMeasurePower = Math.abs(measurePower)
  //   const power = (iRssi - iMeasurePower) / (10 * 2.0)

  //   if (Math.pow(10.0, power) * 3.2808 < 1.0) {
  //     return Math.pow(10.0, power) * 3.2808;
  //   } else if (Math.pow(10.0, power) * 3.2808 > 1.0 && Math.pow(10.0, power) * 3.2808 < 10.0) {
  //     return Math.pow(10.0, power) * 3.2808;
  //   } else {
  //     return Math.pow(10.0, power) * 3.2808;
  //   }
  // }

  public toggleSidebar() {
    this.sideMenuService.setSidebarState(!this.sideMenuService.getSidebarState());
  }

  public toggleBackgroundImage() {
    this.sideMenuService.hasBackgroundImage = !this.sideMenuService.hasBackgroundImage;
  }
  public getSideBarState() {
    return this.sideMenuService.getSidebarState();
  }

  public dintance(txPower: number, rssi: number): number {
    return Math.pow(10, ((txPower - rssi) / 10 * 2));
  }


  public renderCyto(): void {
    const background = new Image();
    // tslint:disable-next-line:variable-name
    const cy_contianer = this.renderer.selectRootElement('#cy');

    background.onload = (context: any) => {

      const img = context.path[0];
      const cy = cytoscape({
        wheelSensitivity: 0.5,
        container: cy_contianer,
        style: CytoscapeStyleSheet.style,
        autolock: false,
        layout: {
          name: 'preset',
          rankDir: 'LR',
          directed: false,
          padding: 0
        }
      });

      const bottomLayer = cy.cyCanvas({
        zIndex: -1
      });

      this.network = cy;

      const canvas = bottomLayer.getCanvas();

      const ctx = canvas.getContext('2d');

      cy.on('render cyCanvas.resize', (evt: any) => {
        bottomLayer.resetTransform(ctx);
        bottomLayer.clear(ctx);
        bottomLayer.setTransform(ctx);
        ctx.save();

        var scale = Math.min(canvas.width / img.width, canvas.height / img.height);
        // get the top left position of the image
        var x = (canvas.width / 2) - (img.width / 2) * scale;
        var y = (canvas.height / 2) - (img.height / 2) * scale;

        ctx.drawImage(img, x, y, img.width * scale * 1.3, img.height * scale * 1.3);

        // ctx.drawImage(background, 0, 0);

        cy.nodes().forEach((node: any) => {
          const pos = node.position();
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, 10, 0, 2 * Math.PI, false);
          ctx.fill();
        });
        ctx.restore();
      });

      cy.cxtmenu({
        selector: 'node',
        commands: [
          {
            content: 'Nó',
            select: (ele: any) => {
              console.log(ele.position());
            },
            enabled: false
          },
          {
            content: this.trashIcon,
            select: (ele: any) => {
              cy.remove(ele);
            },
          },
          {
            content: this.infoIcon,
            select: (ele: any) => {
              Swal.fire({
                title: 'Info',
                html: `<table class="table">
                <thead>
                  <tr>
                    <th scope="col">ID Posição</th>
                    <th scope="col">Nome </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>${ele.data('id')}</td>
                    <td>${ele.data('positionId')}</td>
                    <td>${ele.data('name')}</td>
                  </tr>
                </tbody>
              </table>`,
                icon: 'info',
                buttonsStyling: false,
                confirmButtonText: 'OK',
                customClass: {
                  confirmButton: 'btn btn-primary'
                }
              });
            },
          },
          {
            content: this.checkIcon,
            select: (ele: any) => {
              ele.data('colorCode', '#041E42');
              ele.data('active', 'true');
            }
          }
        ]
      });

      cy.cxtmenu({
        selector: 'edge',
        commands: [
          {
            content: 'Aresta',
            select: (ele: any) => {
              console.log(ele.position());
            },
            enabled: false
          },
          {
            content: '<span class="fa fa-info fa-2x"></span>',
            select: (ele: any) => {
              cy.remove(ele);
            }
          },
          {
            content: '<span class="fa fa-trash fa-2x"></span>',
            select: (ele: any) => {
              cy.remove(ele);
            },
          }
        ]
      });



      cy.cxtmenu({
        selector: 'core',
        commands: [
          {
            content: 'Nós',
            select: () => {
            },
            enabled: false
          },
          {
            content: '<span class="fa fas fa-plus-square fa-2x"></span>',
            select: () => {
              // this.add();
            }
          }
        ]
      });

      this.eh = cy.edgehandles(EdgeHandlesConfig.config);
      this.eh.disable();
      cy.panzoom(PanzomConfig.config);

      cy.pan({
        x: 0,
        y: 0
      });

      cy.zoom({
        level: 0.8, // the zoom level
        position: { x: 0, y: 0 }
      });



      this.createNetwork(2, cy);

      console.log(cy.container());

      const nodes = this.network.nodes();
      const node = nodes[0];


      // nodes[0].position().center();
      // nodes[0].position('x', (900));
      // nodes[0].position('y', (100));
    };

    background.src = 'assets/Factory.png';
    // background.width = 1000;
    // background.height = 1000;    

    this.background = background;
  }

  public createNetwork(amount: number, cy: any): any {
    let positionX = 800;
    let positionY = 400;

    for (let i = 1; i <= amount; i++) {
      this.addNode(i, 'free' + 1, positionX * i, positionY, NodeType.standard, 'free');
      const nextPosition = this.caltNextPosition(positionX, positionY);
      positionX = nextPosition.x;
      positionY = nextPosition.y;
    }

    const nodes = this.network.nodes();
    const node = nodes[0];
  }

  public caltNextPosition(positionX: number, positionY: number): any {
    // if (positionX === 210) {
    //   positionX = 0;
    //   positionY += 50;
    // } else {
    //   positionX += 70;
    // }
    return {
      x: positionX,
      y: positionY
    };
  }

  public addNode(nodeId: any, nodeName: any, positionX: any, positionY: any, nodeType: any, position: string): void {
    this.network.add({
      group: 'nodes',
      data: { id: nodeId, name: '', weight: 40, colorCode: '#ffff00', shapeType: 'rectangle', positionId: position, UI: true, active: true },
      position: { x: positionX, y: positionY },
      style: {
        "background-image": [
          "assets/beacon.png",
        ],
        "background-fit": "cover cover",
        "background-image-opacity": 1,
        "background-color": "#3FD9A8"
      }
    });
  }
}
