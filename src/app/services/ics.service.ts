import { Injectable } from '@angular/core';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

@Injectable({
  providedIn: 'root',
})
export class IcsService {

  public downloadIcs(
    start: Dayjs,
    end: Dayjs,
    title: string,
    description: string
  ) {
    const startDate = start.utc().format('YYYYMMDDTHHmmss[Z]');
    const endDate = end.utc().format('YYYYMMDDTHHmmss[Z]');
    const ics = this.generateIcs(
      startDate,
      endDate,
      title,
      description
    );
    const element = document.createElement('a');
    element.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(ics)
    );
    element.setAttribute('download', `${title}.ics`);
    element.setAttribute('target', '_blank');
    element.style.display = 'none';
    element.click();
  }

  private generateIcs(
    start: string,
    end: string,
    title: string,
    description: string
  ) {
    const timeStamp = dayjs().utc().format('YYYYMMDDTHHmmss[Z]');
    const uuid = `${timeStamp}-uid@$Versary`;

    // Don't ever format this string template
    const event = `BEGIN:VCALENDAR
PRODID:-//Events Calendar//Versary 1.0//$fr
VERSION:2.0
BEGIN:VEVENT
DTSTAMP:${timeStamp}
DTSTART:${start}
DTEND:${end}
SUMMARY:${title}
DESCRIPTION:${description}
URL:https://versary.netlify.app
LOCATION:FR
UID:${uuid}
BEGIN:VALARM
TRIGGER:-PT1440M
REPEAT:1
DURATION:PT15M
ACTION:DISPLAY
DESCRIPTION:Reminder
END:VALARM
END:VEVENT
END:VCALENDAR`;
    return event;
  }
}
