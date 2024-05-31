# viaplanner-ai

Proof of concept repo for a viaplanner AI

## Simple usage

To install dependencies:

```bash
npm install
```

To run the app:

```
npm start
```

## Example output

```
Enter your courses, separated by "," (eg. "MAT102H5F,MAT135H5F,ISP100H5F,CCT109H5F,CSC108H5F"), please only enter courses from the same semester.
MAT102H5F,MAT135H5F,ISP100H5F,CCT109H5F,CSC108H5F
...
CCT109H5: LEC0102 undefined PRA0102
CSC108H5: LEC0108 undefined PRA0103
ISP100H5: LEC0128 undefined undefined
MAT102H5: LEC0101 TUT0102 undefined
MAT135H5: LEC0108 TUT0119 undefined
```

Your timetable will be displayed in the console. The timetable will be displayed
in the format `COURSE: LECTURE TUTORIAL PRACTICAL`. If there is no lecture,
tutorial, or practical for a course, it will be displayed as `undefined`.

## Configuring individual preferences

To configure individual preferences, you can edit the `prefrences.ts` and rerun
the app.

### Preferences

- optimalTime: The mean time of the day that the user wants to have their
  classes. It is a number between 0 and 24. The timetable will be penalized for
  having classes too early or too late in the day.
- optimalTimeSD: The standard deviation of the optimal time. It is a number
  between 0 and 24. This is used as a threshold for a less severe penalty for
  classes that are close to the optimal time.
- maxGap: The maximum number of hours between two classes on the same day. It is
  a number between 0 and 24. The timetable will be penalized for having gaps
  between classes that are longer than maxGap.
- maxBackToBack: The maximum number of hours that a student can have
  back-to-back classes. It is a number between 0 and 24. The timetable will be
  penalized for having back-to-back classes that are longer than maxBackToBack.

## Advanced usage

For advanced usage you can edit `config.ts` to change the mutation rate,
population size, and number of generations.
You can also edit the `calculateFitness` function in `generateTimetable.ts` to
change the timetable fitness function.