/* ====================================================================
   SCHEDULE DATA — edit this file each semester, no need to touch
   index.html.

   TT       recurring weekly classes (day 1=Mon .. 5=Fri)
   EVENTS   one-off dated assessments (tests / exams)
   SEGMENTS semester-phase ranges used to colour the calendar
   SEM_START / SEM_END  bounds of the whole calendar
   CAL_MIN / CAL_MAX    first/last month shown in the month-view picker
   PROG_END             date the progress bar treats as "semester done"
                        (usually the last day of exams you personally care about)
   ==================================================================== */

const DAY_NAMES = {1:'Monday', 2:'Tuesday', 3:'Wednesday', 4:'Thursday', 5:'Friday'};

const TT = [
  {day:1, mod:'330', group:'',   kind:'Lecture 1', venue:'IT 2-27', start:'08:30', end:'09:20'},
  {day:1, mod:'284', group:'P01', kind:'Practical · Groups A–D', venue:'Info Brown / Grey / Maroon / Purple', start:'14:30', end:'17:20'},
  {day:1, mod:'224', group:'',   kind:'Lecture 1', venue:'Mathematics 2-1', start:'11:30', end:'12:20'},

  {day:2, mod:'284', group:'',   kind:'Theory Lecture 1', venue:'Centenary 1', start:'10:30', end:'11:20'},
  {day:2, mod:'284', group:'P02', kind:'Practical · Groups A–B', venue:'Info Blue Lab 2 / 3', start:'14:30', end:'17:20'},
  {day:2, mod:'224', group:'',   kind:'Tutorial 1', venue:'Mathematics 2-1', start:'13:00', end:'14:20'},

  {day:5, mod:'284', group:'', kind:'Theory Lecture (L4)', venue:'IT 2-23', start:'09:30', end:'10:20'},

  {day:3, mod:'330', group:'P01', kind:'Practical', venue:'Info SIT 1 Lab', start:'07:30', end:'10:20'},
  {day:3, mod:'284', group:'',   kind:'Theory Lecture 2', venue:'IT 2-23', start:'09:30', end:'10:20'},
  {day:3, mod:'330', group:'P02', kind:'Practical', venue:'Info Blue Lab 1 & 2', start:'13:30', end:'16:20'},
  {day:3, mod:'224', group:'',   kind:'Lecture 2', venue:'Mathematics 2-1', start:'16:30', end:'17:20'},

  {day:4, mod:'284', group:'',   kind:'Assembly Lecture', venue:'IT 2-23', start:'07:30', end:'08:20'},
  {day:4, mod:'330', group:'',   kind:'Lecture 2', venue:'IT 4-4', start:'11:30', end:'12:20'},

  {day:5, mod:'test', group:'', kind:'Class Test Window (when scheduled)', venue:'ClickUP / Online', start:'09:30', end:'12:30'},
];

const EVENTS = [
  {date:'2026-08-07', mod:'284', label:'Class Test 1 (theory)', time:'09:30–12:30 window', venue:'Online / ClickUP'},
  {date:'2026-08-22', mod:'284', label:'Semester Test 1', time:'10:00–11:30', venue:'Informatorium Labs'},
  {date:'2026-08-24', mod:'224', label:'Test 1', time:'10:00–11:30', venue:'IT 4-2'},
  {date:'2026-08-28', mod:'330', label:'Semester Test (Ch. 1–5)', time:'10:00–11:30', venue:'Informatorium Blue1/2/3, Red'},
  {date:'2026-09-11', mod:'284', label:'Class Test 2 (theory)', time:'09:30–12:30 window', venue:'Online / ClickUP'},
  {date:'2026-10-10', mod:'224', label:'Test 2', time:'10:00–11:30', venue:'IT 4-2'},
  {date:'2026-10-12', mod:'284', label:'Semester Test 2', time:'10:00–11:30', venue:'Informatorium Labs'},
  {date:'2026-10-30', mod:'284', label:'Class Test 3 (theory)', time:'09:30–12:30 window', venue:'Online / ClickUP'},
  {date:'2026-11-09', mod:'224', label:'Final Exam (Prelim)', time:'07:30', venue:'Hatfield'},
  {date:'2026-11-11', mod:'284', label:'Final Exam', time:'08:00', venue:'Informatorium'},
  {date:'2026-11-21', mod:'330', label:'Final Exam', time:'15:00–18:00', venue:'Blackboard/ClickUP, Informatorium'},
];

const SEGMENTS = [
  {start:'2026-07-20', end:'2026-08-21', type:'lectures'},
  {start:'2026-08-22', end:'2026-09-05', type:'test'},
  {start:'2026-09-06', end:'2026-09-16', type:'lectures'},
  {start:'2026-09-17', end:'2026-09-27', type:'recess'},
  {start:'2026-09-28', end:'2026-10-09', type:'lectures'},
  {start:'2026-10-10', end:'2026-10-24', type:'test'},
  {start:'2026-10-25', end:'2026-11-05', type:'lectures'},
  {start:'2026-11-06', end:'2026-11-06', type:'study'},
  {start:'2026-11-07', end:'2026-11-25', type:'exam'},
  {start:'2026-11-26', end:'2026-11-29', type:'gap'},   // official calendar: lectures ended 5/6 Nov, supp only starts 30 Nov — no lectures or exams here
  {start:'2026-11-30', end:'2026-12-05', type:'supp'},
];

const SEM_START = new Date('2026-07-20T00:00:00');
const SEM_END   = new Date('2026-12-05T23:59:59');
const CAL_MIN = {y:2026, m:6};   // July  (0-indexed month)
const CAL_MAX = {y:2026, m:11};  // December

const PROG_START = new Date('2026-07-20T00:00:00');
const PROG_END   = new Date('2026-11-22T23:59:59');
