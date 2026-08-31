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
  decision: string;
  challenge: string;
  approach: string[];
  outcomes: string[];
  recommendations: string[];
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
    decision:
      "Show leadership where profitable growth is coming from and which markets, categories, and customers deserve attention next.",
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
    recommendations: [
      "Protect growth quality by tracking sales and margin together, especially in the leading West region and Technology category.",
      "Use state-level performance exceptions to investigate underperforming markets before they become a wider regional issue.",
      "Monitor fulfilment time by region and product group so operational friction does not weaken customer performance.",
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
    decision:
      "Help operations align vehicles and locations with demand while keeping route, time, and revenue efficiency visible.",
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
    recommendations: [
      "Align vehicle availability with the highest-demand days and most active pickup and drop-off locations.",
      "Use UberX as a capacity-planning benchmark while comparing booking value and trip efficiency across vehicle types.",
      "Track distance and duration exceptions to surface route or data-quality issues before they distort operational KPIs.",
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
    decision:
      "Give portfolio leaders a fast, balanced view of lending growth, repayment health, and the segments driving credit risk.",
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
    recommendations: [
      "Keep the good- versus bad-loan split visible beside growth KPIs so portfolio expansion never hides risk deterioration.",
      "Investigate charged-off applications by grade, purpose, and term to identify segments that need tighter review rules.",
      "Compare month-over-month repayment and funding movement by risk tier to support earlier intervention.",
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
    decision:
      "Translate product and time patterns into practical staffing, inventory, promotion, and menu decisions.",
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
    recommendations: [
      "Plan staffing and ingredient availability around Friday demand peaks to protect service quality and prevent stock-outs.",
      "Feature high-value Large pizzas and top-selling products in bundles while monitoring the effect on average order value.",
      "Review consistently weak products for pricing, placement, or retirement after validating their contribution margin.",
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

export type Certificate = {
  title: string;
  issuer: string;
  date: string;
  detail: string;
  type: "Professional track" | "Certification" | "Training" | "Recognition";
  image?: string;
};

export const certificates: Certificate[] = [
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
    image: "/images/certificates/almentor-sql-masterclass.jpg",
  },
  {
    title: "Artificial Intelligence",
    issuer: "Samsung Innovation Campus",
    date: "July - October 2023",
    detail: "Hands-on data science and AI training using Python and machine learning fundamentals.",
    type: "Certification",
    image: "/images/certificates/samsung-ai.jpg",
  },
  {
    title: "Web Development Using Python",
    issuer: "Information Technology Institute",
    date: "September - October 2022",
    detail: "150 hours covering HTML, CSS, JavaScript, PostgreSQL, Python, and Django.",
    type: "Training",
    image: "/images/certificates/iti-python-web-development.jpg",
  },
  {
    title: "Data Analysis Track",
    issuer: "IEEE Egypt - VEP",
    date: "2023",
    detail: "Attendance and participation in the Volunteers Empowerment Program data analysis track.",
    type: "Training",
    image: "/images/certificates/ieee-data-analysis.jpg",
  },
  {
    title: "Codeavour 6.0 Judge Recognition",
    issuer: "Codeavour Egypt",
    date: "February 2025",
    detail: "Recognition for evaluating young innovators and providing structured technical feedback.",
    type: "Recognition",
    image: "/images/certificates/codeavour-judge.jpg",
  },
];

export const skills = {
  "Business intelligence": ["Power BI", "DAX", "Power Query", "Data Modeling", "Power BI Service", "PBIP", "TMDL"],
  "Analytics & code": ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Scikit-learn", "Jupyter"],
  "Data & databases": ["SQL Server", "T-SQL", "MySQL", "PostgreSQL", "Excel", "ETL", "Data Validation"],
  "AI & machine learning": ["Regression", "Classification", "Model Evaluation", "TensorFlow", "NLP", "LLM Evaluation"],
};
