// optimalTime is the mean time of the day that the user wants to have their classes. It is a number between 0 and 24. The timetable will be penalized for having classes too early or too late in the day.
// The penalty is the difference between the time of the class and the optimal time. The penalty is squared if the difference is greater than optimalTimeSD.
export const optimalTime = 12;

// optimalTimeSD is the standard deviation of the optimal time. It is a number between 0 and 24.
// This is used as a threshold for a less severe penalty for classes that are close to the optimal time.
export const optimalTimeSD = 3;

// maxGap is the maximum number of hours between two classes on the same day. It is a number between 0 and 24.
// The timetable will be penalized for having gaps between classes that are longer than maxGap.
export const maxGap = 1;

// maxBackToBack is the maximum number of hours that a student can have back-to-back classes. It is a number between 0 and 24.
// The timetable will be penalized for having back-to-back classes that are longer than maxBackToBack.
export const maxBackToBack = 3;