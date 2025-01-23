import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CARREE_PARFAIT, JOURS_REMARQUABLES, MINUTES_REMARQUABLES, SECONDES_REMARQUABLES } from '../../constant';
import dayjs from 'dayjs';
import { DatePipe, DecimalPipe } from '@angular/common';


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

  decimalPipe = inject(DecimalPipe)
  versaries = signal<{ versary: string; dayjs: object, date: string; }[] | null>(null)

  constructor() {

    this.versaries.set([
      ...CARREE_PARFAIT.map((day) => {
        return {
          versary: `${this.formatNumber(day)} jours (carré parfait de ${Math.sqrt(day)})`,
          dayjs: dayjs(this.date()).add(day, 'day'),
          date: dayjs(this.date()).add(day, 'day').format('DD-MM-YYYY')
        }
      }),
      ...JOURS_REMARQUABLES.map((day) => {
        return {
          versary: `${this.formatNumber(day)} jours`,
          dayjs: dayjs(this.date()).add(day, 'day'),
          date: dayjs(this.date()).add(day, 'day').format('DD-MM-YYYY')
        }
      }),
      ...MINUTES_REMARQUABLES.map((minute) => {
        return {
          versary: `${this.formatNumber(minute)} minutes`,
          dayjs: dayjs(this.date()).add(minute, 'minute'),
          date: dayjs(this.date()).add(minute, 'minute').format('DD-MM-YYYY')
        }
      }),
      ...SECONDES_REMARQUABLES.map((seconde) => {
        return {
          versary: `${this.formatNumber(seconde)} secondes`,
          dayjs: dayjs(this.date()).add(seconde, 'second'),
          date: dayjs(this.date()).add(seconde, 'second').format('DD-MM-YYYY')
        }
      })].sort((a, b) => a.dayjs.diff(b.dayjs))
    .filter((versary) => versary.dayjs.isAfter(dayjs()))
    )
  }

  formatNumber(value: number): string {
    return this.decimalPipe.transform(value, '1.0-2') || '';
  }
}


