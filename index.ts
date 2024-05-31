import {Course} from "./types/APIResponse";
import {readFile} from "fs/promises";
import {CoursesSections, Section, TeachMethod} from "./types/Section";
import generateTimetable from "./generateTimetable";
import axios from 'axios';
import * as fs from "fs";

const readJsonFile = async (path: string) => {
    const file = await readFile(path, "utf8");
    return JSON.parse(file);
}
const getCourseSections = (course: Course) => {
    const sections = course.sections.filter(section => section.meetingTimes && section.meetingTimes.length > 0);
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
    let total: undefined | any = undefined;
    let apiInfo: any;
    try {
        apiInfo = await readJsonFile("./pageableCourses.json");
    } catch (e) {
        console.error("Failed to read pageableCourses.json. Fetching courses from API");
        const url = 'https://api.easi.utoronto.ca/ttb/getPageableCourses';
        const body = {
            courseCodeAndTitleProps: {
                courseCode: '',
                courseTitle: '',
                courseSectionCode: '',
                searchCourseDescription: true,
            },
            departmentProps: [],
            campuses: [],
            sessions: ['20249', '20251', '20249-20251'],
            requirementProps: [],
            instructor: '',
            courseLevels: [],
            deliveryModes: [],
            dayPreferences: [],
            timePreferences: [],
            divisions: ['APSC', 'ARCLA', 'ARTSC', 'ERIN', 'MUSIC', 'SCAR'],
            creditWeights: [],
            page: 1,
            pageSize: 9999, // hack to get all courses
            direction: 'asc',
        };
        do {
            const response = await axios.post(url, body);
            const data = response.data;
            if (!total) {
                total = response.data;
            } else {
                total.payload.pageableCourse.courses.push(...response.data.payload.pageableCourse.courses);
                total.payload.pageableCourse.total = response.data.payload.pageableCourse.total;
            }
            console.log(`Fetched ${total.payload.pageableCourse.courses.length} courses out of ${total.payload.pageableCourse.total}`);
            body.page++;
        } while (total.payload.pageableCourse.courses.length < total.payload.pageableCourse.total);
        fs.writeFileSync("./pageableCourses.json", JSON.stringify(total));
        console.log("Fetched courses from API");
        apiInfo = total;
    }
    const fetchedCourses = apiInfo.payload.pageableCourse.courses as Course[];

    return fetchedCourses.filter(course => courses.find(x => x.slice(0, -1) == course.code && x.slice(-1) == course.sectionCode));

}
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

// CSC384H5F,CSC373H5F,CSC347H5F,CSC369H5F
// CSC311H5S,CSC363H5S,CSC343H5S,CSC309H5S
readline.question('Enter your courses, separated by "," (eg. "MAT102H5F,MAT135H5F,ISP100H5F,CCT109H5F,CSC108H5F"), please only enter courses from the same semester.\n', (courses: string) => {
    main(courses.split(",").map((x: string) => x.trim()));
    readline.close();
});