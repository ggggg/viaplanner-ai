import {Course} from "./types/APIResponse";
import {readFile} from "fs/promises";
import {CoursesSections, Section, TeachMethod} from "./types/Section";
import generateTimetable from "./generateTimetable";

const readJsonFile = async (path: string) => {
    const file = await readFile(path, "utf8");
    return JSON.parse(file);
}
const getCourseSections = (course: Course) => {
    const sections = course.sections.filter(section => section.meetingTimes.length > 0);
    const lectures = sections.filter(section => section.teachMethod === TeachMethod.Lec);
    const tutorials = sections.filter(section => section.teachMethod === TeachMethod.Tut);
    const practicals = sections.filter(section => section.teachMethod === TeachMethod.Pra);
    return {
        lectures,
        tutorials,
        practicals
    }
}
const main = async (courses: string[]) => {
    let timeStart = Date.now();
    const numberOfCourses = courses.length;
    const fetchedCourses = await getCourses(courses);
    let timeEnd = Date.now();
    if (fetchedCourses.length != numberOfCourses) {
        console.warn(`Failed to fetch all courses. Only fetched ${fetchedCourses.length} out of ${numberOfCourses}`);
        const unfetchedCourses = courses.filter(course => !fetchedCourses.find(x => x.code == course.slice(0, -1) && x.sectionCode == course.slice(-1)));
        console.warn(`Unfetched courses: ${unfetchedCourses}`);
    }
    const coursesSections = fetchedCourses.reduce((a, course) => {
        a[course.code] = getCourseSections(course);
        return a;
    }, {} as CoursesSections);

    console.log(`Fetched courses in: ${timeEnd - timeStart}ms`);
    timeStart = Date.now();
    const timetable = generateTimetable(coursesSections);
    timeEnd = Date.now();
    console.log(`Generated timetable in: ${timeEnd - timeStart}ms`);
    for (const courseCode in timetable.timetable) {
        const sections = timetable.timetable[courseCode];
        console.log(`${courseCode}: ${sections.lecture.name} ${sections.tutorial?.name} ${sections.practical?.name}`);
    }
}


const getCourses = async (courses: string[]): Promise<Course[]> => {
    const apiInfo = await readJsonFile("./pageableCourses.json");
    const fetchedCourses = apiInfo.payload.pageableCourse.courses as Course[];

    return fetchedCourses.filter(course => courses.find(x => x.slice(0, -1) == course.code && x.slice(-1) == course.sectionCode));

}
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
readline.question('Enter your courses, separated by "," (eg. "MAT102H5F,MAT135H5F,ISP100H5F,CCT109H5F,CSC108H5F"), please only enter courses from the same semester.', (courses : string )=> {
    main(courses.split(",").map((x: string) => x.trim()));
    readline.close();
});