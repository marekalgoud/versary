import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IcsService {

  public downloadIcs(
    start: Date,
    end: Date,
    title: string,
    description: string
  ) {
    const startDate = start
      .toISOString()
      .replace('-', '')
      .replace(':', '')
      .split('.')[0];
    const endDate = end
      .toISOString()
      .replace('-', '')
      .replace(':', '')
      .split('.')[0];
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
    const timeStamp = new Date().toISOString();
    const uuid = `${timeStamp}-uid@$Versary`;

    // Don't ever format this string template
    const event = `BEGIN:VCALENDAR
PRODID:-//Events Calendar//Versary 1.0//$fr
VERSION:2.0
BEGIN:VEVENT
DTSTAMP:${timeStamp}Z
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
