# Schedule — S2 2026

A single-file, static timetable + semester calendar for **COS 284**, **COS 330**, and **WTW 224**
(University of Pretoria, Hatfield, Semester 2 2026). Bauhaus-inspired design, no build step,
no dependencies — open `index.html` and it works.

**Live data reference:** every date/time in this repo is sourced from official ClickUP/portal
study guides and the UP Fluid Class Timetable, cross-checked against each other. Where a study
guide and the portal disagree, the study guide is treated as authoritative; portal-only data
(e.g. modules with no published study guide) is used as-is and flagged for confirmation.

## What's in it

- **Timetable tab** — weekly grid (desktop) / agenda cards (mobile) of lectures, practicals,
  and tutorials, Monday-Friday, with a live "now" line and auto-scroll to today.
- **Calendar tab** — month view of the whole semester with colour-coded phases (lectures, test
  weeks, recess, study period, exam period, supplementary exams), a progress bar, a clickable
  day-detail panel, and a full summary table of every dated assessment with live countdowns.
- **Filters** — toggle each module on/off, and isolate a specific practical group (COS 284
  P01/P02, COS 330 P01/P02).
- **Dark/light theme toggle**, persisted locally.
- **"Next up" banner** — always shows your next class or assessment and a live countdown.

## Files

| File | Purpose |
|---|---|
| `index.html` | All markup, CSS, and JS. This is the entire app. |
| `data.js` | All schedule data. This is the only file you should need to touch each semester or when dates change. |
| `README.md` | This file. |

## Editing data.js

Everything lives in these exported values:

- `DAY_NAMES` — display names for weekday numbers (1=Mon .. 5=Fri)
- `TT` — recurring weekly classes (lectures, practicals, tutorials)
- `EVENTS` — one-off dated items (class tests, semester tests, exams)
- `SEGMENTS` — date ranges used to colour/phase the calendar
- `SEM_START` / `SEM_END` — bounds of the whole calendar
- `CAL_MIN` / `CAL_MAX` — first/last month shown in the month picker
- `PROG_START` / `PROG_END` — range the progress bar measures against

### Adding/editing a weekly class (TT)

Example entry:

    {day:1, mod:'284', group:'P01', kind:'Practical . Groups A-D', venue:'Info Brown / Grey / Maroon / Purple', start:'14:30', end:'17:20'},

- `day` — 1 (Mon) through 5 (Fri).
- `mod` — module code as a string. Must match a key in `MOD_LABELS` inside `index.html`
  (currently `'284'`, `'330'`, `'224'`) or it renders as a generic yellow "Assessment" block.
- `group` — practical group code (`'P01'`, `'P02'`, etc.) if applicable, else `''`. Only
  modules with a group filter wired up in `index.html` (`data-segfor`) will show a group
  toggle in the filter bar.
- `kind` — free-text label shown on the block (e.g. `'Theory Lecture 1'`, `'Tutorial 1'`).
- `venue`, `start`, `end` — self-explanatory; times are `'HH:MM'` 24-hour.

### Adding/editing a dated assessment (EVENTS)

Example entry:

    {date:'2026-08-24', mod:'224', label:'Test 1', time:'10:00-11:30', venue:'IT 4-2'},

- `date` — `'YYYY-MM-DD'`.
- `mod` — same module-code rule as above.
- `label` — shown in the calendar dot tooltip, day-detail panel, and summary table.
- `time`, `venue` — free text.

### Adding a new module

`data.js` alone isn't enough — `index.html` needs to know the module exists so it can colour
and label it correctly. In `index.html`:

1. Add the module to `MOD_LABELS` near the top of the `<script>` block:

       const MOD_LABELS = {284:'COS 284', 330:'COS 330', 224:'WTW 224'};

2. Add a colour for it — pick an unused `:root` CSS variable (e.g. `--green`) and add matching
   rules following the existing `c284`/`b284` pattern:
   - `.chip.on.c<code>` (filter chip)
   - `.b<code>` (timetable block background)
   - `.cal-cell .dot.c<code>` (calendar day dot)
   - `.tag2.c<code>` (summary table tag)
3. Add a `<span class="chip on c<code>" data-mod="<code>">Label</span>` to the filter bar.
4. Add a legend entry in both the timetable legend row and the calendar legend.
5. If the module has practical/lab groups, add a `<div class="seg" data-segfor="<code>">`
   block mirroring the existing ones.
6. Add `<code>:true` to the `modActive` default and to the `applyFilters()` module check
   (`if(m==='284' || m==='330' || m==='224')`).

Everything else (block rendering, agenda cards, next-up banner, calendar dots, summary table)
already reads from `MOD_LABELS` via the `modLabel()` / `modColorClass()` / `modBlockClass()`
helpers, so it updates automatically once the above is done.

### Adjusting the semester phases (SEGMENTS)

Each entry is a date range coloured on the calendar:

    {start:'2026-08-22', end:'2026-09-05', type:'test'},

Valid `type` values (each maps to a colour in the calendar legend): `lectures`, `test`,
`recess`, `study`, `exam`, `supp`, `gap`. Ranges should be contiguous and non-overlapping,
covering `SEM_START` through `SEM_END`.

## Data provenance & known caveats

- COS 284 and COS 330 dates are drawn primarily from their official ClickUP study guides,
  cross-checked against the UP Fluid Class Timetable (portal). Where they disagreed, the study
  guide won.
- WTW 224 has no study guide coverage of test/exam dates, so those came from the portal only.
  **The WTW 224 exam date (9 Nov) is sourced from the portal's PRELIM table and should be
  treated as provisional until confirmed on ClickUP.**
- Always double-check dates against ClickUP before relying on this for something high-stakes —
  this repo is a personal planning tool, not an official University record.

## Running it

No build step. Either:

- Open `index.html` directly in a browser, or
- Serve the folder with any static file server, e.g. `python3 -m http.server` from this
  directory, then visit `http://localhost:8000`.

## Semester housekeeping

At the start of each new semester:

1. Replace the contents of `data.js` with the new module codes, timetable, and event dates.
2. Update `SEM_START`, `SEM_END`, `CAL_MIN`, `CAL_MAX`, `PROG_START`, `PROG_END`.
3. Follow the "Adding a new module" steps above in `index.html` for any modules not already
   wired in.
4. Update the `<meta name="description">` and `.subhead` text in `index.html` to reflect the
   current module list.
