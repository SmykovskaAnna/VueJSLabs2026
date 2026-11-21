function getDateParts() {
  return Object.fromEntries(
    new Intl.DateTimeFormat('uk-UA', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
      .formatToParts(new Date())
      .map(({ type, value }) => [type, value]),
  )
}

export function formatHeaderDate() {
  const { day, month, weekday } = getDateParts()
  return `${day} ${month} · ${weekday}`.toLocaleUpperCase('uk-UA')
}

export function formatIssueDate() {
  const { day, month, weekday, year } = getDateParts()
  return `ВИПУСК · ${weekday}, ${day} ${month} ${year}`.toLocaleUpperCase('uk-UA')
}
