import {CoursesSections, MeetingTime, Section} from "./types/Section";
import {Timetable, TimetableWithFitness} from "./types/Timetable";
import {
    crossoverRate,
    elitismRate,
    generations,
    mutationRate,
    populationSize
} from "./config";
import assert from "node:assert";

const randomChoice = <T>(arr: T[], distribution?: number[]): T => {
    if (!distribution) return arr[Math.floor(Math.random() * arr.length)];
    assert(arr.length == distribution.length, "Array and distribution must be the same length");
    const random = Math.random();
    const total = distribution.reduce((a, b) => a + b, 0);
    if (total == 0) return arr[Math.floor(Math.random() * arr.length)];
    if (total != 1) console.warn("Distribution does not sum to 1");
    distribution = distribution.map(x => x / total);
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += distribution[i];
        if (random < sum) return arr[i];
    }
    return arr[arr.length - 1];
}


const generateRandomTimetable = (courseSections: CoursesSections): Timetable => {
    const timetable = {} as Timetable;
    for (const courseCode in courseSections) {
        const sections = courseSections[courseCode];
        timetable[courseCode] = {
            lecture: randomChoice(sections.lectures),
            tutorial: randomChoice(sections.tutorials),
            practical: randomChoice(sections.practicals)
        }
    }
    return timetable;
}
const msToHours = (ms: number) => Math.ceil(ms / 3.6e+6);

const calculateFitness = (timetable: Timetable, log: boolean = false): TimetableWithFitness => {
    const optimalTime = 14;
    const optimalTimeSD = 3;
    const maxGap = 1;
    const maxBackToBack = 3;


    const meetingTimes = Object.values(timetable)
        .map(x => [x.lecture.meetingTimes, x.tutorial?.meetingTimes, x.practical?.meetingTimes].filter(x => x !== undefined).flat() as MeetingTime[])
        .flat();
    let conflictHours = 0;
    let totalBackToBack = 0;
    let currentBackToBack = 0;
    let optimalTimeScore = 0;
    let gapScore = 0;


    meetingTimes.sort((a, b) => {
        if (a.start.day != b.start.day) return a.start.day - b.start.day;
        return a.start.millisofday - b.start.millisofday;
    });
    // console.log(meetingTimes)


    for (let i = 0; i < meetingTimes.length; i++) {
        const current = meetingTimes[i];
        currentBackToBack += msToHours(current.end.millisofday - current.start.millisofday);
        if (msToHours(current.start.millisofday) < optimalTime) {
            const delta = optimalTime - msToHours(current.start.millisofday);
            if (delta > optimalTimeSD)
                optimalTimeScore += delta;
        } else {
            const delta = msToHours(current.end.millisofday) - optimalTime;
            if (delta > optimalTimeSD)
                optimalTimeScore += delta;
        }

        if (i == meetingTimes.length - 1) continue;
        const next = meetingTimes[i + 1];
        if (current.start.day != next.start.day) {
            if (currentBackToBack > maxBackToBack) totalBackToBack += currentBackToBack - maxBackToBack;
            currentBackToBack = 0;
            continue;
        }


        if (current.end.millisofday > next.start.millisofday) {
            conflictHours += msToHours(current.end.millisofday - next.start.millisofday);
        } else if (current.end.millisofday != next.start.millisofday) {
            if (currentBackToBack > maxBackToBack) totalBackToBack += currentBackToBack - maxBackToBack;
            currentBackToBack = 0;

            const delta = msToHours(next.start.millisofday - current.end.millisofday);
            if (delta > maxGap) gapScore += delta - maxGap;
        }
    }
    if (currentBackToBack > maxBackToBack) totalBackToBack += currentBackToBack - maxBackToBack;
    let fitness = 1 - (conflictHours * 20
        + totalBackToBack * 3 + gapScore + optimalTimeScore * 2
    )
    if (log) {
        console.log(`Conflict hours: ${conflictHours}`)
        console.log(`Total back to back: ${totalBackToBack}`)
        console.log(`Gap score: ${gapScore}`)
        console.log(`Optimal time score: ${optimalTimeScore}`)
        console.log(`Fitness: ${fitness}`)
    }
    return {
        timetable,
        fitness
    }
}

const mutate = (p1: Section, p2: Section, sections: Section[]): Section => {
    const rand = Math.random();
    if (rand < mutationRate) {
        return randomChoice(sections);
    }
    return randomChoice([p1, p2]);
}

const mate = (timetable1: Timetable, timetable2: Timetable, sections: CoursesSections): Timetable => {
    const timetable = {} as Timetable;
    for (const courseCode in timetable1) {
        const allSections = sections[courseCode];
        const course = timetable1[courseCode];
        timetable[courseCode] = {
            lecture: mutate(course.lecture, timetable2[courseCode].lecture, allSections.lectures),
            tutorial: course.tutorial ? mutate(course.tutorial, timetable2[courseCode].tutorial!, allSections.tutorials) : undefined,
            practical: course.practical ? mutate(course.practical, timetable2[courseCode].practical!, allSections.practicals) : undefined,
        }
    }
    return timetable;
}

export default (courseSections: CoursesSections): TimetableWithFitness => {
    let population = []
    for (let i = 0; i < populationSize; i++) {
        const timetable = generateRandomTimetable(courseSections);
        const fitness = calculateFitness(timetable);
        population.push(fitness);
    }
    for (let generation = 0; generation < generations; generation++) {
        population.sort((a, b) => b.fitness - a.fitness);
        const newPopulation = [];
        for (let i = 0; i < Math.floor(populationSize / elitismRate); i++) {
            newPopulation.push(population[i]);
        }
        for (let i = 0; i < Math.floor(populationSize * crossoverRate); i++) {
            const p1: TimetableWithFitness = randomChoice(population.slice(0, Math.floor(populationSize * crossoverRate)));
            const p2: TimetableWithFitness = randomChoice(population.slice(0, Math.floor(populationSize * crossoverRate)));
            newPopulation.push(calculateFitness(mate(p1.timetable, p2.timetable, courseSections)));
        }
        for (let i = 0; i < Math.floor(populationSize * (1 - elitismRate - crossoverRate)); i++) {
            newPopulation.push(calculateFitness(generateRandomTimetable(courseSections)));
        }
        population = newPopulation;
        console.log(`Generation ${generation} complete. Best fitness: ${population[0].fitness}`);
    }
    population.sort((a, b) => b.fitness - a.fitness);
    return population[0];
}
