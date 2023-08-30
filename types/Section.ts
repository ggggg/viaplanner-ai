export type CoursesSections = {
    [courseCode: string]: {
        lectures: Section[],
        tutorials: Section[],
        practicals: Section[]
    }
}

export interface Section {
    name: string;
    type: SectionType;
    teachMethod: TeachMethod;
    sectionNumber: string;
    meetingTimes: MeetingTime[];
    firstMeeting: null;
    instructors: Instructor[];
    currentEnrolment: number;
    maxEnrolment: number;
    subTitle: string;
    cancelInd: Ind;
    waitlistInd: Ind;
    deliveryModes: DeliveryMode[];
    currentWaitlist: number;
    enrolmentInd: EnrolmentInd;
    tbaInd: Ind;
    openLimitInd: Ind;
    notes: Note[];
    enrolmentControls: EnrolmentControl[];
    linkedMeetingSections: LinkedMeetingSection[] | null;
}

export interface LinkedMeetingSection {
    teachMethod: TeachMethod;
    sectionNumber: string;
    type: null;
}

export interface Arcla {
    code: string;
    name: null | string;
}

export interface EnrolmentControl {
    yearOfStudy: string;
    post: Arcla;
    subject: Arcla;
    subjectPost: Arcla;
    typeOfProgram: Arcla;
    designation: Arcla;
    primaryOrg: Arcla;
    associatedOrg: Arcla;
    secondOrg: Arcla;
    adminOrg: Arcla;
    collaborativeOrgGroupCode: "*";
    quantity: number;
    sequence: number;
}

export interface Note {
    name: Name;
    type: NoteType;
    content: string;
}

export enum Name {
    CourseNote = "Course Note",
    SectionNote = "Section Note",
}

export enum NoteType {
    Course = "COURSE",
    Section = "SECTION",
}


export enum EnrolmentInd {
    A = "A",
    AE = "AE",
    Ap = "AP",
    Ar = "AR",
    Ar1 = "AR1",
    C = "C",
    E = "E",
    Empty = "",
    EnrolmentIndP = "P*",
    EnrolmentIndR1 = "R1*",
    EnrolmentIndR2 = "R2*",
    EnrolmentIndRP = "RP*",
    P = "P",
    R = "R",
    R1 = "R1",
    R2 = "R2",
    Re = "RE",
    Rp = "RP",
}

export interface DeliveryMode {
    session: string;
    mode: Mode;
}

export enum Mode {
    Async = "ASYNC",
    Hybr = "HYBR",
    Inper = "INPER",
    Sync = "SYNC",
}


export enum Ind {
    C = "C",
    N = "N",
    Y = "Y",
}

export interface Instructor {
    firstName: string;
    lastName: string;
}

export enum TeachMethod {
    Lec = "LEC",
    Pra = "PRA",
    Tut = "TUT",
}

export enum SectionType {
    Lecture = "Lecture",
    Practical = "Practical",
    Tutorial = "Tutorial",
}

export interface MeetingTime {
    start: Time;
    end: Time;
    building: Building;
    sessionCode: string;
    repetition: Repetition;
    repetitionTime: RepetitionTime;
}

export enum Repetition {
    BIWeekly = "BI_WEEKLY",
    Weekly = "WEEKLY",
}

export enum RepetitionTime {
    FirstAndThirdWeek = "FIRST_AND_THIRD_WEEK",
    OnceAWeek = "ONCE_A_WEEK",
    SecondAndFourthWeek = "SECOND_AND_FOURTH_WEEK",
}

export interface Time {
    day: number;
    millisofday: number;
}

export interface Building {
    buildingCode: BuildingCode;
    buildingRoomNumber: null;
    buildingRoomSuffix: null;
    buildingUrl: null | string;
    buildingName: null;
}

export enum BuildingCode {
    AC = "AC",
    Aa = "AA",
    Ab = "AB",
    Ag = "AG",
    Ah = "AH",
    Ap = "AP",
    Aq = "AQ",
    BT = "BT",
    Ba = "BA",
    Bc = "BC",
    Bf = "BF",
    Bl = "BL",
    Bn = "BN",
    Br = "BR",
    Bv = "BV",
    CG = "CG",
    CR = "CR",
    Cc = "CC",
    Ch = "CH",
    Da = "DA",
    Dh = "DH",
    Dv = "DV",
    Ej = "EJ",
    Em = "EM",
    Empty = "",
    Es = "ES",
    Ev = "EV",
    Fe = "FE",
    GB = "GB",
    Gm = "GM",
    Ha = "HA",
    Hi = "HI",
    Hl = "HL",
    Hs = "HS",
    Hw = "HW",
    IC = "IC",
    Ib = "IB",
    In = "IN",
    Jh = "JH",
    Jp = "JP",
    Kn = "KN",
    Kp = "KP",
    LM = "LM",
    La = "LA",
    Li = "LI",
    MB = "MB",
    MS = "MS",
    Mc = "MC",
    Mn = "MN",
    Mp = "MP",
    Mw = "MW",
    My = "MY",
    Nb = "NB",
    Nf = "NF",
    Nl = "NL",
    Oa = "OA",
    Oi = "OI",
    On = "ON",
    PR = "PR",
    Pb = "PB",
    Rg = "RG",
    Rl = "RL",
    Ro = "RO",
    Rs = "RS",
    Rt = "RT",
    Ru = "RU",
    Rw = "RW",
    SD = "SD",
    Sb = "SB",
    Sf = "SF",
    Sh = "SH",
    Sk = "SK",
    Sm = "SM",
    Ss = "SS",
    Su = "SU",
    Sw = "SW",
    Sy = "SY",
    Tc = "TC",
    Tf = "TF",
    Uc = "UC",
    Up = "UP",
    Uy = "UY",
    Vc = "VC",
    Wb = "WB",
    We = "WE",
    Wi = "WI",
    Wo = "WO",
    Ws = "WS",
    Ww = "WW",
    Zz = "ZZ",
}
