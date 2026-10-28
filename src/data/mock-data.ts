import type { Localized } from "@/i18n/messages";

// Sample data so the screens have something to show. Replace with real API calls.

export type Department = "engineering" | "hr" | "finance" | "sales" | "operations" | "marketing";

export const departments: Department[] = ["engineering", "hr", "finance", "sales", "operations", "marketing"];

export type EmployeeStatus = "active" | "leave" | "probation";

export interface Employee {
    id: string;
    name: Localized;
    email: string;
    position: Localized;
    department: Department;
    status: EmployeeStatus;
    joinedAt: string;
}

export const employees: Employee[] = [
    {
        id: "e1",
        name: { th: "สมชาย ใจดี", en: "Somchai Jaidee" },
        email: "somchai@systeminfinit.co",
        position: { th: "หัวหน้าวิศวกร", en: "Engineering lead" },
        department: "engineering",
        status: "active",
        joinedAt: "2021-03-15",
    },
    {
        id: "e2",
        name: { th: "สุดา วงศ์ทอง", en: "Suda Wongthong" },
        email: "suda@systeminfinit.co",
        position: { th: "ผู้จัดการฝ่ายบุคคล", en: "HR manager" },
        department: "hr",
        status: "active",
        joinedAt: "2020-07-01",
    },
    {
        id: "e3",
        name: { th: "ธนพล ศรีสุข", en: "Thanaphon Srisuk" },
        email: "thanaphon@systeminfinit.co",
        position: { th: "นักพัฒนาซอฟต์แวร์", en: "Software engineer" },
        department: "engineering",
        status: "leave",
        joinedAt: "2022-01-10",
    },
    {
        id: "e4",
        name: { th: "พิมพ์ชนก แก้วมณี", en: "Pimchanok Kaewmanee" },
        email: "pimchanok@systeminfinit.co",
        position: { th: "นักบัญชี", en: "Accountant" },
        department: "finance",
        status: "active",
        joinedAt: "2023-05-22",
    },
    {
        id: "e5",
        name: { th: "วีระ ประเสริฐ", en: "Weera Prasert" },
        email: "weera@systeminfinit.co",
        position: { th: "ผู้จัดการฝ่ายขาย", en: "Sales manager" },
        department: "sales",
        status: "active",
        joinedAt: "2019-11-04",
    },
    {
        id: "e6",
        name: { th: "อรุณี มีสุข", en: "Arunee Meesuk" },
        email: "arunee@systeminfinit.co",
        position: { th: "นักการตลาดดิจิทัล", en: "Digital marketer" },
        department: "marketing",
        status: "probation",
        joinedAt: "2026-08-18",
    },
    {
        id: "e7",
        name: { th: "กิตติพงษ์ บุญมา", en: "Kittipong Boonma" },
        email: "kittipong@systeminfinit.co",
        position: { th: "เจ้าหน้าที่ปฏิบัติการ", en: "Operations officer" },
        department: "operations",
        status: "active",
        joinedAt: "2024-02-12",
    },
    {
        id: "e8",
        name: { th: "นภัสสร จันทร์เพ็ญ", en: "Napatsorn Chanphen" },
        email: "napatsorn@systeminfinit.co",
        position: { th: "นักออกแบบ UX", en: "UX designer" },
        department: "engineering",
        status: "active",
        joinedAt: "2023-09-01",
    },
    {
        id: "e9",
        name: { th: "ชัยวัฒน์ ทองดี", en: "Chaiwat Thongdee" },
        email: "chaiwat@systeminfinit.co",
        position: { th: "ผู้แทนฝ่ายขาย", en: "Sales representative" },
        department: "sales",
        status: "leave",
        joinedAt: "2025-04-07",
    },
    {
        id: "e10",
        name: { th: "รัตนา สายบุญ", en: "Rattana Saiboon" },
        email: "rattana@systeminfinit.co",
        position: { th: "ผู้จัดการฝ่ายการเงิน", en: "Finance manager" },
        department: "finance",
        status: "active",
        joinedAt: "2018-06-25",
    },
    {
        id: "e11",
        name: { th: "ภูมิ เจริญผล", en: "Phum Charoenphon" },
        email: "phum@systeminfinit.co",
        position: { th: "วิศวกร DevOps", en: "DevOps engineer" },
        department: "engineering",
        status: "probation",
        joinedAt: "2026-09-02",
    },
    {
        id: "e12",
        name: { th: "มาลี ศักดิ์สิทธิ์", en: "Malee Saksit" },
        email: "malee@systeminfinit.co",
        position: { th: "เจ้าหน้าที่สรรหาบุคลากร", en: "Recruiter" },
        department: "hr",
        status: "active",
        joinedAt: "2024-10-14",
    },
];

export type RequestType = "leave" | "purchase" | "overtime" | "equipment";

export const requestTypes: RequestType[] = ["leave", "purchase", "overtime", "equipment"];

export type RequestStatus = "pending" | "approved" | "rejected";

export interface WorkRequest {
    id: string;
    code: string;
    type: RequestType;
    requesterId: string;
    detail: Localized;
    /** Days for leave, hours for overtime, baht for purchase and equipment. */
    amount: number;
    submittedAt: string;
    status: RequestStatus;
}

export const requests: WorkRequest[] = [
    {
        id: "r1",
        code: "REQ-1048",
        type: "leave",
        requesterId: "e3",
        detail: { th: "ลาพักร้อน", en: "Annual leave" },
        amount: 3,
        submittedAt: "2026-10-27",
        status: "pending",
    },
    {
        id: "r2",
        code: "REQ-1047",
        type: "purchase",
        requesterId: "e8",
        detail: { th: "ไลเซนส์ Figma สำหรับทีม", en: "Figma licenses for the team" },
        amount: 18500,
        submittedAt: "2026-10-26",
        status: "pending",
    },
    {
        id: "r3",
        code: "REQ-1046",
        type: "overtime",
        requesterId: "e11",
        detail: { th: "ย้ายระบบเซิร์ฟเวอร์ช่วงสุดสัปดาห์", en: "Weekend server migration" },
        amount: 8,
        submittedAt: "2026-10-25",
        status: "pending",
    },
    {
        id: "r4",
        code: "REQ-1045",
        type: "equipment",
        requesterId: "e6",
        detail: { th: "โน้ตบุ๊กสำหรับพนักงานใหม่", en: "Laptop for new hire" },
        amount: 42900,
        submittedAt: "2026-10-24",
        status: "approved",
    },
    {
        id: "r5",
        code: "REQ-1044",
        type: "leave",
        requesterId: "e9",
        detail: { th: "ลาป่วย", en: "Sick leave" },
        amount: 2,
        submittedAt: "2026-10-23",
        status: "approved",
    },
    {
        id: "r6",
        code: "REQ-1043",
        type: "purchase",
        requesterId: "e5",
        detail: { th: "ของที่ระลึกงานสัมมนาลูกค้า", en: "Gifts for client seminar" },
        amount: 12000,
        submittedAt: "2026-10-21",
        status: "rejected",
    },
    {
        id: "r7",
        code: "REQ-1042",
        type: "overtime",
        requesterId: "e4",
        detail: { th: "ปิดงบประจำไตรมาส", en: "Quarterly closing" },
        amount: 6,
        submittedAt: "2026-10-20",
        status: "approved",
    },
    {
        id: "r8",
        code: "REQ-1041",
        type: "equipment",
        requesterId: "e7",
        detail: { th: "จอภาพเสริม 27 นิ้ว", en: "27-inch external monitor" },
        amount: 8900,
        submittedAt: "2026-10-18",
        status: "pending",
    },
    {
        id: "r9",
        code: "REQ-1040",
        type: "leave",
        requesterId: "e12",
        detail: { th: "ลากิจ", en: "Personal leave" },
        amount: 1,
        submittedAt: "2026-10-16",
        status: "approved",
    },
];

export type TaskStatus = "todo" | "in_progress" | "review" | "done";

export const taskStatuses: TaskStatus[] = ["todo", "in_progress", "review", "done"];

export type TaskPriority = "high" | "medium" | "low";

export const taskPriorities: TaskPriority[] = ["high", "medium", "low"];

export interface Project {
    id: string;
    name: Localized;
    color: "brand" | "blue" | "success" | "orange";
}

export const projects: Project[] = [
    { id: "p1", name: { th: "ระบบ HR ใหม่", en: "New HR system" }, color: "brand" },
    { id: "p2", name: { th: "เว็บไซต์องค์กร", en: "Company website" }, color: "blue" },
    { id: "p3", name: { th: "ย้ายระบบขึ้นคลาวด์", en: "Cloud migration" }, color: "success" },
    { id: "p4", name: { th: "แคมเปญปลายปี", en: "Year-end campaign" }, color: "orange" },
];

export interface Task {
    id: string;
    title: Localized;
    projectId: string;
    assigneeId: string;
    dueAt: string;
    priority: TaskPriority;
    status: TaskStatus;
}

export const tasks: Task[] = [
    {
        id: "t1",
        title: { th: "ออกแบบหน้าขอลางาน", en: "Design leave request screen" },
        projectId: "p1",
        assigneeId: "e8",
        dueAt: "2026-10-30",
        priority: "high",
        status: "in_progress",
    },
    {
        id: "t2",
        title: { th: "เชื่อมต่อ API เงินเดือน", en: "Connect payroll API" },
        projectId: "p1",
        assigneeId: "e1",
        dueAt: "2026-11-05",
        priority: "high",
        status: "todo",
    },
    {
        id: "t3",
        title: { th: "ทดสอบสิทธิ์การเข้าถึง", en: "Test access permissions" },
        projectId: "p1",
        assigneeId: "e3",
        dueAt: "2026-11-08",
        priority: "medium",
        status: "todo",
    },
    {
        id: "t4",
        title: { th: "เขียนเนื้อหาหน้าเกี่ยวกับเรา", en: "Write About us page copy" },
        projectId: "p2",
        assigneeId: "e6",
        dueAt: "2026-10-29",
        priority: "medium",
        status: "review",
    },
    {
        id: "t5",
        title: { th: "ปรับหน้าเว็บให้รองรับมือถือ", en: "Make site mobile-friendly" },
        projectId: "p2",
        assigneeId: "e8",
        dueAt: "2026-11-12",
        priority: "low",
        status: "todo",
    },
    {
        id: "t6",
        title: { th: "ย้ายฐานข้อมูลหลัก", en: "Migrate primary database" },
        projectId: "p3",
        assigneeId: "e11",
        dueAt: "2026-11-02",
        priority: "high",
        status: "in_progress",
    },
    {
        id: "t7",
        title: { th: "ตั้งค่าระบบสำรองข้อมูล", en: "Set up backups" },
        projectId: "p3",
        assigneeId: "e11",
        dueAt: "2026-10-22",
        priority: "medium",
        status: "done",
    },
    {
        id: "t8",
        title: { th: "ประเมินค่าใช้จ่ายคลาวด์", en: "Estimate cloud costs" },
        projectId: "p3",
        assigneeId: "e10",
        dueAt: "2026-10-20",
        priority: "low",
        status: "done",
    },
    {
        id: "t9",
        title: { th: "ทำสื่อโฆษณาโซเชียล", en: "Create social ads" },
        projectId: "p4",
        assigneeId: "e6",
        dueAt: "2026-11-15",
        priority: "medium",
        status: "in_progress",
    },
    {
        id: "t10",
        title: { th: "อนุมัติงบแคมเปญ", en: "Approve campaign budget" },
        projectId: "p4",
        assigneeId: "e10",
        dueAt: "2026-10-31",
        priority: "high",
        status: "review",
    },
    {
        id: "t11",
        title: { th: "รายชื่อลูกค้าเป้าหมาย", en: "Target customer list" },
        projectId: "p4",
        assigneeId: "e5",
        dueAt: "2026-10-25",
        priority: "low",
        status: "done",
    },
];

/** Requests submitted and approved per month, oldest first. */
export const requestTrend = [
    { month: "2026-05-01", submitted: 32, approved: 27 },
    { month: "2026-06-01", submitted: 41, approved: 35 },
    { month: "2026-07-01", submitted: 38, approved: 33 },
    { month: "2026-08-01", submitted: 46, approved: 39 },
    { month: "2026-09-01", submitted: 52, approved: 44 },
    { month: "2026-10-01", submitted: 58, approved: 47 },
];

export const getEmployee = (id: string) => employees.find((employee) => employee.id === id);

export const getProject = (id: string) => projects.find((project) => project.id === id);

/** Two-letter initials from an English name, used for avatars. */
export const getInitials = (name: string) =>
    name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
