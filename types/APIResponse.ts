import {Arcla, Note, Section, TeachMethod} from "./Section";

export interface Course {
    id: string;
    name: string;
    ucName: null;
    code: string;
    sectionCode: SectionCode;
    campus: Campus;
    sessions: string[];
    sections: Section[];
    duration: null;
    cmCourseInfo: CMCourseInfo | null;
    created: string;
    modified: null;
    lastSaved: number;
    primaryTeachMethod: TeachMethod;
    faculty: Arcla;
    coSec: Arcla;
    department: Arcla;
    title: null;
    maxCredit: number;
    minCredit: number;
    breadths: Breadth[];
    notes: Note[];
    cancelInd: CancelInd;
    subscriptionTtb: boolean;
    subscriptionOpenData: boolean;
    tb1Active: boolean;
    tb2Active: boolean;
    fullyOnline: boolean;
}

export enum CancelInd {
    Empty = "",
    N = "N",
}

export interface Breadth {
    org: Arcla;
    breadthTypes: BreadthType[];
}

export interface BreadthType {
    kind: Kind;
    type: BreadthTypeType;
    description: string;
    code: Code;
}

export enum Code {
    Arts = "Arts",
    Br1 = "BR=1",
    Br2 = "BR=2",
    Br3 = "BR=3",
    Br4 = "BR=4",
    Br5 = "BR=5",
    CS = "CS",
    HisPhil = "HisPhil",
    Hss = "HSS",
    Hum = "Hum",
    NatSci = "NatSci",
    Nsc = "NSC",
    Quant = "Quant",
    SSc = "SSc",
    Sci = "Sci",
    SocBeh = "SocBeh",
}

export enum BreadthTypeType {
    APScNatScience = "APSc-Nat Science",
    ArtsLitLang = "Arts Lit & Lang",
    ComplStudies = "Compl Studies",
    CreativeCultural = "Creative Cultural",
    HistPhilCultural = "Hist Phil. Cultural",
    HumSocSci = "Hum&SocSci",
    Humanities = "Humanities",
    LivingThings = "Living Things",
    NaturalSciences = "Natural Sciences",
    PhysicalUniverse = "Physical Universe",
    QuantReasoning = "Quant. Reasoning",
    Science = "Science",
    SocialBehavioural = "Social & Behavioural",
    SocialScience = "Social Science",
    SocietyInstitutions = "Society Institutions",
    Thought = "Thought",
}

export enum Kind {
    Breadth = "BREADTH",
    Distribution = "DISTRIBUTION",
    Elective = "ELECTIVE",
}

export enum SectionCode {
    F = "F",
    F1 = "F1",
    F2 = "F2",
    S = "S",
    S1 = "S1",
    S2 = "S2",
    Y = "Y",
}

export enum Campus {
    CentennialCollege = "Centennial College",
    OffCampus = "Off Campus",
    Scarborough = "Scarborough",
    SheridanCollege = "Sheridan College",
    StGeorge = "St. George",
    UniversityOfTorontoAtMississauga = "University of Toronto at Mississauga",
}

export enum Division {
    AppliedScienceEngineeringFacultyOf = "Applied Science & Engineering, Faculty of",
    ArchitectureLandscapeAndDesignJohnHDanielsFacultyOf = "Architecture, Landscape, and Design, John H. Daniels Faculty of",
    ArtsAndScienceFacultyOf = "Arts and Science, Faculty of",
    KinesiologyAndPhysicalEducationFacultyOf = "Kinesiology and Physical Education, Faculty of",
    MusicFacultyOf = "Music, Faculty of",
    UniversityOfTorontoMississauga = "University of Toronto Mississauga",
    UniversityOfTorontoScarborough = "University of Toronto Scarborough",
}

export interface CMCourseInfo {
    description: string;
    title: string;
    levelOfInstruction: "undergraduate";
    prerequisitesText: null | string;
    corequisitesText: null | string;
    exclusionsText: null | string;
    recommendedPreparation: null | string;
    note: null | string;
    division: Division;
    breadthRequirements: string[] | null;
    distributionRequirements: DistributionRequirement[] | null;
    publicationSections: string[] | null;
    cmPublicationSections: CMPublicationSection[] | null;
}

export interface CMPublicationSection {
    section: string;
    subSections: string[] | null;
}

export enum DistributionRequirement {
    Humanities = "Humanities",
    None = "None",
    Science = "Science",
    SocialScience = "Social Science",
    Tba = "TBA",
}