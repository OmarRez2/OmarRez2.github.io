export type Project = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  overview: string;
  image: string;
  gallery: string[];
  github: string;
  year: string;
  featured: boolean;
  tech: string[];
  stats: { value: string; label: string }[];
  challenge: string;
  approach: string[];
  outcomes: string[];
};

export const projects: Project[] = [
  {
    slug: "sales-intelligence-hub",
    title: "Sales Intelligence Hub",
    eyebrow: "End-to-end analytics",
    description:
      "A complete sales analytics workflow spanning Python, SQL, Excel, and a four-page Power BI experience.",
    overview:
      "The project turns transactional sales data into a validated reporting model and an executive-ready decision system. It answers where growth comes from, what drives margin, which customers matter most, and where operational performance needs attention.",
    image: "/images/projects/sales-overview.webp",
    gallery: [
      "/images/projects/sales-overview.webp",
      "/images/projects/sales-product-customer.webp",
      "/images/projects/sales-regional.webp",
    ],
    github: "https://github.com/OmarRez2/Sales-Intelligence-Hub",
    year: "2026",
    featured: true,
    tech: ["Power BI", "DAX", "Python", "SQL Server", "Excel", "Power Query"],
    stats: [
      { value: "$1.12M", label: "Total sales" },
      { value: "$392.7K", label: "Net profit" },
      { value: "35.17%", label: "Profit margin" },
      { value: "488", label: "Orders" },
    ],
    challenge:
      "Management needed one trustworthy view of sales, profitability, customer behavior, regional performance, and fulfilment efficiency.",
    approach: [
      "Cleaned, validated, and explored raw transactions with Python and Excel.",
      "Built reusable SQL views and KPI queries for the reporting layer.",
      "Designed a Power BI model with DAX measures, navigation, drill-through, and focused executive storytelling.",
    ],
    outcomes: [
      "Identified the West as the leading region with $341.2K in sales.",
      "Found Technology to be the top category with $462.9K in sales.",
      "Surfaced California as the highest-performing state with $200.6K in sales.",
    ],
  },
  {
    slug: "uber-trips-analytics",
    title: "Uber Trips Analytics",
    eyebrow: "Transportation intelligence",
    description:
      "A five-page Power BI and SQL solution analyzing demand, revenue, routes, time behavior, and trip quality.",
    overview:
      "This project transforms more than one hundred thousand trip records into an interactive operational view. The model supports demand planning, vehicle analysis, location decisions, and efficiency monitoring across the full trip lifecycle.",
    image: "/images/projects/uber-overview.webp",
    gallery: ["/images/projects/uber-overview.webp"],
    github: "https://github.com/OmarRez2/Uber",
    year: "2026",
    featured: true,
    tech: ["Power BI", "DAX", "SQL Server", "Python", "PBIP", "TMDL"],
    stats: [
      { value: "103,728", label: "Bookings" },
      { value: "$1.55M", label: "Booking value" },
      { value: "349K mi", label: "Trip distance" },
      { value: "15.86 min", label: "Avg. duration" },
    ],
    challenge:
      "Trip data was detailed but difficult to translate into clear decisions about demand, locations, vehicles, revenue, and data quality.",
    approach: [
      "Profiled and audited trip-level data with Python and reproducible query outputs.",
      "Created a reusable SQL Server layer with analytical queries and performance-focused structures.",
      "Built Overview, Time Analysis, Details, Trip Snapshot, and Guide pages in Power BI.",
    ],
    outcomes: [
      "Identified UberX as the leading vehicle type with 38,744 bookings.",
      "Found June 26 to be the highest-demand day with 4,947 bookings.",
      "Measured clean trip efficiency at $4.43 per mile and $1.04 per minute.",
    ],
  },
  {
    slug: "bank-loan-analysis",
    title: "Bank Loan Portfolio Analysis",
    eyebrow: "Risk & portfolio reporting",
    description:
      "A three-page lending portfolio report covering applications, funding, repayment, loan quality, and borrower risk.",
    overview:
      "The report gives decision-makers a focused view of portfolio health, month-to-date movement, borrower segmentation, and loan status. It combines executive KPIs with detailed drill-down analysis across 38,576 records.",
    image: "/images/projects/bank-loan-overview.webp",
    gallery: ["/images/projects/bank-loan-overview.webp"],
    github: "https://github.com/OmarRez2/Bank-Loan",
    year: "2026",
    featured: true,
    tech: ["Power BI", "DAX", "SQL Server", "T-SQL", "Excel", "Power Query"],
    stats: [
      { value: "38,576", label: "Applications" },
      { value: "$435.76M", label: "Funded amount" },
      { value: "86.18%", label: "Good-loan share" },
      { value: "12.05%", label: "Avg. interest" },
    ],
    challenge:
      "Portfolio performance needed to be summarized without hiding the risk split between healthy, current, and charged-off loans.",
    approach: [
      "Prepared and validated loan-level records for consistent analysis.",
      "Developed T-SQL calculations for total, MTD, and month-over-month KPIs.",
      "Designed a custom Power BI theme and three-page navigation for summary, trends, and details.",
    ],
    outcomes: [
      "Classified 33,243 applications as good loans and 5,333 as charged off.",
      "Tracked approximately $370.2M in good-loan funding.",
      "Enabled analysis by state, grade, purpose, term, employment, and home ownership.",
    ],
  },
  {
    slug: "pizza-sales-performance",
    title: "Pizza Sales Performance",
    eyebrow: "Retail performance",
    description:
      "A Power BI and SQL analysis of revenue, orders, product mix, demand patterns, and best- and worst-selling products.",
    overview:
      "The dashboard converts granular order-line data into a clear view of demand, basket behavior, product performance, and time patterns. It helps operators understand what sells, when demand peaks, and where the menu is underperforming.",
    image: "/images/projects/pizza-sales-overview.webp",
    gallery: ["/images/projects/pizza-sales-overview.webp"],
    github: "https://github.com/OmarRez2/Pizza-Sales-Project",
    year: "2026",
    featured: false,
    tech: ["Power BI", "DAX", "SQL Server", "T-SQL", "Excel"],
    stats: [
      { value: "$817.86K", label: "Revenue" },
      { value: "21,350", label: "Orders" },
      { value: "49,574", label: "Pizzas sold" },
      { value: "$38.31", label: "Avg. order" },
    ],
    challenge:
      "Transaction-level sales data needed to become a practical view of category, size, product, and demand performance.",
    approach: [
      "Cleaned and validated 48,620 transaction lines.",
      "Built SQL calculations for KPIs, time trends, categories, sizes, and rankings.",
      "Designed interactive Power BI filters for category, size, and time-period exploration.",
    ],
    outcomes: [
      "Found Friday to be the busiest day with 3,538 orders.",
      "Identified Large pizzas as the highest-revenue size at roughly $375.3K.",
      "Ranked Thai Chicken Pizza first by revenue at $43,434.25.",
    ],
  },
];

export const experiences = [
  {
    role: "Data Analysis Instructor",
    company: "eYouth",
    period: "Apr 2026 - Present",
    location: "Cairo, Egypt",
    summary:
      "Delivering practical training in data cleaning, exploratory analysis, SQL, Power BI, KPI reporting, and dashboard development.",
  },
  {
    role: "Programming Instructor",
    company: "Almentor",
    period: "Oct 2023 - Aug 2025",
    location: "Cairo, Egypt",
    summary:
      "Taught Python, data science, AI fundamentals, and analytical problem-solving to more than 100 learners through the DECI Initiative.",
  },
  {
    role: "AI Model Trainer",
    company: "Alignerr",
    period: "2023 - 2026",
    location: "Remote",
    summary:
      "Evaluated model outputs for accuracy, reasoning quality, instruction following, and consistency across coding and NLP tasks.",
  },
  {
    role: "AI Model Trainer",
    company: "Outlier",
    period: "2023 - 2026",
    location: "Remote",
    summary:
      "Reviewed AI-generated responses and contributed to quality assurance through prompt testing, comparison, and structured feedback.",
  },
];

export const certificates = [
  {
    title: "Professional Data Analyst Track",
    issuer: "DEPI - MCIT",
    date: "2026 - In progress",
    detail: "214-hour professional program in analytics, BI, freelancing, and communication.",
    type: "Professional track",
  },
  {
    title: "SQL Masterclass - Advanced Level",
    issuer: "Almentor",
    date: "April 2025",
    detail: "Advanced SQL certification. Credential ID: vdkebl3jgw.",
    type: "Certification",
  },
  {
    title: "Artificial Intelligence",
    issuer: "Samsung Innovation Campus",
    date: "July - October 2023",
    detail: "Hands-on data science and AI training using Python and machine learning fundamentals.",
    type: "Certification",
  },
  {
    title: "Web Development Using Python",
    issuer: "Information Technology Institute",
    date: "September - October 2022",
    detail: "150 hours covering HTML, CSS, JavaScript, PostgreSQL, Python, and Django.",
    type: "Training",
  },
  {
    title: "Data Analysis Track",
    issuer: "IEEE Egypt - VEP",
    date: "2023",
    detail: "Attendance and participation in the Volunteers Empowerment Program data analysis track.",
    type: "Training",
  },
  {
    title: "Codeavour 6.0 Judge Recognition",
    issuer: "Codeavour Egypt",
    date: "February 2025",
    detail: "Recognition for evaluating young innovators and providing structured technical feedback.",
    type: "Recognition",
  },
];

export const skills = {
  "Business intelligence": ["Power BI", "DAX", "Power Query", "Data Modeling", "Power BI Service", "PBIP", "TMDL"],
  "Analytics & code": ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Scikit-learn", "Jupyter"],
  "Data & databases": ["SQL Server", "T-SQL", "MySQL", "PostgreSQL", "Excel", "ETL", "Data Validation"],
  "AI & machine learning": ["Regression", "Classification", "Model Evaluation", "TensorFlow", "NLP", "LLM Evaluation"],
};
