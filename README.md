# Expense Tracker

Premium glassmorphism expense tracking dashboard built with React and Vite.

## Project Description

Expense Tracker is a modern, responsive web application that helps you track personal spending, manage a monthly budget, and visualize expenses with polished charts. It is designed to feel like a premium SaaS dashboard, with a dark glassmorphism theme, smooth animations, and a focus on clarity.

## Features

- **Dashboard overview**: Total expenses, budget, remaining amount, and transactions at a glance.
- **Editable monthly budget**: Set or update a monthly budget with a visual progress bar and color-coded usage states.
- **Full expense CRUD**: Add, edit, and delete expenses with validation and instant feedback.
- **LocalStorage persistence**: All data is saved in the browser so it survives refreshes.
- **Search, filter, and sort**: Live search across title/category/amount, filter by category, and sort by date or amount.
- **Rich expense cards**: Category icons, dates, amounts, and quick edit/delete actions with animations.
- **Analytics charts**: Pie chart for category breakdown and bar chart for monthly totals using Recharts.
- **Monthly summary**: Total spend, highest spending category, number of transactions, and average expense.
- **Polished UI/UX**: Dark navy background, gradient blobs, floating glass cards, and smooth Framer Motion transitions.
- **Toast notifications**: Success toasts for expense add/update/delete via `react-hot-toast`.
- **Responsive layout**: Optimized for desktop, tablet, and mobile screens.

## Tech Stack

- **React 18 + Vite**
- **JavaScript (ESNext)**
- **CSS (modular structure)** – no utility frameworks
- **Recharts** – charts and visualizations
- **Framer Motion** – UI animations
- **React Icons** – iconography
- **React Hot Toast** – notifications

## Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd expense-tracker
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Build for production**

   ```bash
   npm run build
   npm run preview
   ```

## Folder Structure

```text
src/
  assets/                # Static assets (images, logos) – optional
  layout/
    Navbar.jsx
    Footer.jsx
  dashboard/
    Dashboard.jsx
    SummaryCard.jsx
    BudgetProgress.jsx
  expense/
    ExpenseForm.jsx
    ExpenseList.jsx
    ExpenseCard.jsx
    SearchBar.jsx
    Filter.jsx
    Sort.jsx
  charts/
    PieChartComponent.jsx
    BarChartComponent.jsx
  common/
    Button.jsx
    Modal.jsx
    EmptyState.jsx
  data/
    categories.js
  hooks/
    useLocalStorage.js
    useBudget.js
  utils/
    calculations.js
    chartData.js
    helpers.js
    constants.js
  styles/
    App.css
    Navbar.css
    Dashboard.css
    Expense.css
    Charts.css
  App.jsx
  main.jsx
  index.css
```

## Screenshots

- **Dashboard Overview** – _Add screenshot here_
- **Expense Management** – _Add screenshot here_
- **Charts & Analytics** – _Add screenshot here_

You can capture screenshots from the running app and place them in the `assets/` folder, then reference them here.

## Future Improvements

- **Multiple wallets / accounts**: Track separate budgets per account or card.
- **Recurring expenses**: Mark expenses as recurring and project future cash flow.
- **Import/export**: CSV export and import for transactions.
- **Authentication**: Optional sign-in for cloud sync across devices.
- **Advanced analytics**: Trendlines, savings goals, and anomaly detection.

## License

This project is released under the MIT License. You are free to use, modify, and distribute it with attribution.

