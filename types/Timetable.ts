import {Section} from "./Section";

export type Timetable = {
    [courseCode: string]: {
        lecture: Section,
        tutorial?: Section,
        practical?: Section
    }
}

export type TimetableWithFitness = {
    timetable: Timetable,
    fitness: number
}