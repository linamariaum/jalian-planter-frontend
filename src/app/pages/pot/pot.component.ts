import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { Pot } from 'src/app/models/pot';

@Component({
  selector: 'app-pot',
  templateUrl: './pot.component.html',
  styleUrls: ['./pot.component.scss']
})
export class PotComponent implements OnInit {
  params: Subscription;
  pot: Pot;
  image: string;
  randomImages: string[] = [
    "../../../assets/pot1.png",
    "../../../assets/pot2.png",
    "../../../assets/pot3.png",
    "../../../assets/pot4.png",
    "../../../assets/pot5.png",
    "../../../assets/pot6.png"];

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.params = this.route.params.subscribe(params => {
      const id = +params['id'];
      if (id) {
        // Servicio que traiga el Pot
        this.pot = {
          id: id,
          name: 'Rolfi',
          type: 'Tipo 3'
        }
        this.randomImage();
      } else {
        this.router.navigate(['/pots']);
      }
    });
    // this.id = this.route.snapshot.paramMap.get('id');
  }

  randomImage() {
    let i = Math.floor(Math.random() * 6);
    this.image = this.randomImages[i];
  }

  ngOnDestroy() {
    this.params.unsubscribe();
  }

}
