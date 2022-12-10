import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  icon,
  LatLng,
  LatLngExpression,
  LatLngTuple,
  LeafletMouseEvent,
  map,
  Map,
  marker,
  Marker,
  tileLayer,
} from 'leaflet';
import { LocationService } from 'src/app/services/location.service';
import { UserService } from 'src/app/services/user.service';
import { Order } from 'src/app/shared/models/Order';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnChanges {
  private readonly DEFAULT_LATLONG: LatLngTuple = [13.75, 21.62];
  private readonly ZOOM_LEVEL = 16;
  private readonly MARKER_ICON = icon({
    iconUrl: '/assets/marker-icon-n.png',
    iconSize: [42, 42],
    iconAnchor: [21, 42],
  });
  user!: User;

  @Input()
  order!: Order;

  @Input()
  readonly = false;

  @ViewChild('map', { static: true })
  mapRef!: ElementRef;
  map!: Map;
  currentMarker!: Marker;

  constructor(
    private locationService: LocationService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.user = this.userService.currentUser;

    if (this.user.latlng) {
      this.map.setView(this.user.latlng, this.ZOOM_LEVEL);
      this.setMarker(this.user.latlng);
    }
  }

  ngOnChanges(): void {
    if (!this.order) return;

    this.mapInit();

    if (this.readonly && this.addressLatLng) {
      this.showReadOnlyLocation();
    }
  }

  showReadOnlyLocation() {
    this.setMarker(this.addressLatLng);
    this.map.setView(this.addressLatLng, this.ZOOM_LEVEL);
    this.map.dragging.disable();
    this.map.touchZoom.disable();
    this.map.doubleClickZoom.disable();
    this.map.scrollWheelZoom.disable();
    this.map.boxZoom.disable();
    this.map.keyboard.disable();
    this.map.off('click');
    this.map.tap?.disable();
    this.currentMarker.dragging?.disable();
  }

  mapInit() {
    if (this.map) {
      return;
    }

    this.map = map(this.mapRef.nativeElement, {
      attributionControl: false,
    }).setView(this.DEFAULT_LATLONG, 1);

    tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map);
    this.map.on('click', (ev: LeafletMouseEvent) => {
      this.setMarker(ev.latlng);
    });
  }

  setMarker(latlng: LatLngExpression) {
    this.addressLatLng = latlng as LatLng;

    if (this.currentMarker) {
      this.currentMarker.setLatLng(latlng);
      return;
    }

    this.currentMarker = marker(latlng, {
      draggable: true,
      icon: this.MARKER_ICON,
    }).addTo(this.map);

    this.currentMarker.on('dragend', () => {
      this.addressLatLng = this.currentMarker.getLatLng();
    });
  }

  set addressLatLng(latlng: LatLng) {
    if (!latlng.lat.toFixed) return;

    latlng.lat = parseFloat(latlng.lat.toFixed(8));
    latlng.lng = parseFloat(latlng.lng.toFixed(8));

    this.order.latlong = latlng;
    this.user.latlng = latlng;
    this.userService.saveLocation(latlng).subscribe({
      next: () => {},
    });
  }

  findLocation() {
    this.locationService.getCurrentLocation().subscribe({
      next: (latlng) => {
        this.map.setView(latlng, this.ZOOM_LEVEL);
        this.setMarker(latlng);
      },
    });
  }

  get addressLatLng() {
    return this.order.latlong!;
  }
}
