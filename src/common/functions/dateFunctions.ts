import { formatInTimeZone } from 'date-fns-tz';

export function formatDate(infoDate: string) : string {
    const date = new Date(infoDate);
    return date.toLocaleDateString()

}

export function formatDateLong(isoString: string) : string{

    const date = new Date(isoString)
    const formatter = new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
    return formatter.format(date)

}

export function formatBasicDate(dateString: string)  {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return formatInTimeZone(
    dateString,
    userTimeZone,
    'yyyy-MM-dd'
  );
};

export function formatDateTime(dateString: string): string {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return formatInTimeZone(
    dateString,
    userTimeZone,
    "dd 'de' MMMM yyyy, hh:mm a"
  );
}
