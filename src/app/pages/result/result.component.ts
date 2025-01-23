import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CARREE_PARFAIT, JOURS_REMARQUABLES, MINUTES_REMARQUABLES, SECONDES_REMARQUABLES } from '../../constant';
import dayjs, { Dayjs } from 'dayjs';
import { DatePipe, DecimalPipe } from '@angular/common';
import { IcsService } from '../../services/ics.service';

interface Versary {
  versary: string
  dayjs: Dayjs
}

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrl: './result.component.css',
  imports: [DatePipe, RouterLink],
  providers: [DecimalPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ResultComponent {
  router = inject(ActivatedRoute);
  date = signal(dayjs(this.router.snapshot.params['date']));
  icsService = inject(IcsService)

  decimalPipe = inject(DecimalPipe)
  datePipe = inject(DatePipe)
  versaries = signal<Versary[] | null>(null)

  constructor() {

    this.versaries.set([
      ...CARREE_PARFAIT.map((day) => {
        return {
          versary: `${this.formatNumber(day)} jours (carré parfait de ${Math.sqrt(day)})`,
          dayjs: dayjs(this.date()).add(day, 'day'),
        }
      }),
      ...JOURS_REMARQUABLES.map((day) => {
        return {
          versary: `${this.formatNumber(day)} jours`,
          dayjs: dayjs(this.date()).add(day, 'day'),
        }
      }),
      ...MINUTES_REMARQUABLES.map((minute) => {
        return {
          versary: `${this.formatNumber(minute)} minutes`,
          dayjs: dayjs(this.date()).add(minute, 'minute'),
        }
      }),
      ...SECONDES_REMARQUABLES.map((seconde) => {
        return {
          versary: `${this.formatNumber(seconde)} secondes`,
          dayjs: dayjs(this.date()).add(seconde, 'second'),
        }
      })].sort((a, b) => a.dayjs.diff(b.dayjs))
    .filter((versary) => versary.dayjs.isAfter(dayjs()))
    )
  }

  download(versary: Versary) {
    const desc =  `
    'Youpi ! Un versaire !'
    Le ${this.datePipe.transform(versary.dayjs.format(), 'dd/MM/yyyy')},
    cela fera ${ versary.versary }
    que le ${this.datePipe.transform(this.date().format(), 'dd/MM/yyyy')} est passé !`
    this.icsService.downloadIcs(versary.dayjs.toDate(), versary.dayjs.toDate(), versary.versary, desc)

  }

  formatNumber(value: number): string {
    return this.decimalPipe.transform(value, '1.0-2') || '';
  }
}


