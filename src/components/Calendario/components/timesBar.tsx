import { eachMinuteOfInterval, endOfDay, isSameMinute, set, startOfDay, } from 'date-fns'

import { cn } from '../lib/utils'
import { memo } from 'react'

const TimesBar = memo(({times}:{times:Date[]}) => {

  const StartOfWeek = startOfDay(times[0])
  const EndtOfWeek = endOfDay(times[0])
  const startHour = set(StartOfWeek, { hours: 7 })
  const endHour = set(EndtOfWeek, { hours: 21, minutes: 45 })

 const hoursInDay = eachMinuteOfInterval(
    {
      start: startHour,
      end: endHour,
    },
    { step: 10 }
  )

  return (
    <div className={cn(`w-[42px] `, 'flex justify-center rounded-lg overflow-hidden')}>
      <div className='flex rounded-lg'>
        {hoursInDay.map((hour, i) => {
          return (
            <div
              key={i}
              className={cn(
                times.some((time) => isSameMinute(hour, time)) &&
                  "h-[4px] w-[.5px] bg-green-300",
                !times.some((time) => isSameMinute(hour, time)) &&
                  "h-[4px] w-[1px] bg-gray-100"
              )}
            />
          )
        })}
      </div>
    </div>
  )
})

export default TimesBar