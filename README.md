- **Brief README.md:** Include the following in your `README.md`:
  - Clear setup and running instructions.
  - Brief explanation of your architecture and design decisions (e.g., why you chose a particular state management solution or component structure).
  - Any known issues, limitations, or assumptions made.
  - A list of any bonus features you attempted or completed.

🧠 Architecture & Design Decisions
🗂 Component Structure
calendar/: Contains the core MonthView, WeekView, and DayView calendar components.
events-modal/: Contains the modal and events form.
calendar-header/: Contains the controls and headings shown on the top of the application

store/: Contains global state using Zustand, split into useCalendarStore and useEventStore.

🧰 State Management
Chose Zustand for its lightweight, intuitive API and non-opinionated structure, ideal for a small but scalable global state need (date and event management).

Used useCalendarStore for tracking currentDate and selected view.

Used useEventStore to handle CRUD operations for events (with crypto.randomUUID() as temporary ID generation).

💅 Styling
TailwindCSS was used for rapid UI styling with mobile-first responsiveness.

All views are designed to:

Maintain consistent grid sizing.

Remain scrollable while keeping grid items large enough for usability on mobile.

🧩 Modal Management
A central EventModal component is reused for both create and edit workflows.

Modal visibility and selected event state are managed locally within each view.

⚠️ Known Issues & Assumptions
No Backend: All event data is stored in-memory using Zustand. A refresh will reset the state.

No Authentication: The app is purely client-side for demonstration purposes.

No Drag & Drop or Resize: These features are planned but not implemented.

No Time Selection UI: Events are created with the full-day assumption unless edited.

🎁 Bonus Features
✅ Dynamic Modal for event creation and editing.

✅ Responsive Grid that scrolls on smaller viewports.

✅ Expandable Events with a "+X more" reveal inside date cells.

✅ "Today" Highlighting for visual orientation.

✅ Current Month Differentiation (faded cells for overflow days).

✅ Programmatic Modal Triggering from an external CreateEventButton.

📦 Tech Stack
React + TypeScript

Zustand – Global state for date and events

TailwindCSS – Utility-first styling

date-fns – Lightweight date manipulation
