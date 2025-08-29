import { useRef } from 'react';
import { Calendar as RNCalendar } from 'react-native-calendars';

import type { DateData } from 'react-native-calendars';
import type { CalendarProps } from '@/types/props';

export default function Calendar(props: CalendarProps) {
    // Deconstruct props
    const {
        calendarStyle,
        selectedDay,
        onDaySelect,
        markedDates: initialMarkedDates,
        themeKey,
        monthFormat = 'MMMM yyyy',
        hideExtraDays = true,
        firstDay = 0,
        enableSwipeMonths = false,
        markingType = 'multi-dot',
    } = props;

    // State for the date that is shown in the calendar
    // (note: not the selected date, just the date that is shown, to keep track of which month is being shown)
    const shownDate = useRef<DateData | null>(null);

    // Mark the currently selected date using the selection style and mark all other dates based on props
    let markedDates = { ...initialMarkedDates };
    if (selectedDay && selectedDay.dateString) {
        markedDates[selectedDay.dateString] = { selected: true };
    }

    // Functions for selecting the month
    const onMonthSelect = (date: DateData) => {
        shownDate.current = date;
        shownDate.current.day = 1;
    };

    return (
        <RNCalendar
            theme={{
                calendarBackground: '#000000',              // background color
                textSectionTitleColor: '#aaaaaa',           // day name color (mon tue wed)
                dayTextColor: '#ffffff',                    // day number text color
                todayTextColor: '#0088ff',                  // today number text color
                monthTextColor: '#ffffff',                  // month text color
                textMonthFontWeight: 'bold',                // month text weight
                arrowColor: '#ffffff',                      // arrow color
                disabledArrowColor: '#777777',              // disabled arrow color
                selectedDayBackgroundColor: '#ffffff',      // selected day background color
                selectedDayTextColor: '#000000',            // selected day text color
                ...calendarStyle
            }}
            initialDate={shownDate.current ? shownDate.current.dateString : undefined}
            onDayPress={onDaySelect}
            onMonthChange={onMonthSelect}
            monthFormat={monthFormat}
            hideExtraDays={hideExtraDays}
            firstDay={firstDay}
            enableSwipeMonths={enableSwipeMonths}
            markingType={markingType}
            markedDates={markedDates}

            // Extra information from the theme to ensure the component rerenders correctly
            key={themeKey}
        />
    );
};