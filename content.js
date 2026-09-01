/* =============================================================================
   content.js — THE ONLY FILE YOU NEED TO EDIT
   -----------------------------------------------------------------------------
   Everything on the site (text, links, jobs, projects, colours-by-name, etc.)
   comes from the CONTENT object below. Edit values, save, refresh the browser.

   Rules of thumb:
     • Keep the quotes and the commas — it's plain JavaScript.
     • Arrays are written [ ... ]. Add or delete items freely.
     • Any field marked OPTIONAL can be deleted or set to "" to hide it.
   ========================================================================== */

window.CONTENT = {
  /* ---------------------------------------------------------------------------
     1. META — browser tab title, SEO description, theme accent.
     ------------------------------------------------------------------------ */
  meta: {
    // Shown in the browser tab and in search results.
    title: "Pranav Maheshwari — AI & Machine Learning Engineer",
    // 1–2 sentences. Used by search engines and link previews.
    description:
      "AI & Machine Learning Engineer pursuing M.Sc. in AI Engineering at Universität Passau & Working Student in Physics-Informed AI at Mercedes-Benz AG.",
    // Primary accent. Any CSS colour works (#hex, rgb(), hsl()).
    // Change this one value to re-theme most of the site.
    accent: "#5b6cff",
    // Second accent — the far end of every gradient (name, metrics, glows).
    // Pick something adjacent on the colour wheel for a tasteful blend.
    accent2: "#a06bff",
    // OPTIONAL — 1200×630 image used when someone shares your link on
    // LinkedIn / X / Slack. Use a full https:// URL once deployed.
    ogImage: "",
  },

  /* ---------------------------------------------------------------------------
     2. NAV — the sticky bar at the top.
        monogram : your initials (2–3 characters looks best).
        resume   : the button on the right. Put your PDF in this folder and
                   set `href` to its filename, e.g. "resume.pdf".
                   Delete the whole `resume` block to hide the button.
        links    : `target` MUST match a section id: home | about | career |
                   work | contact. Remove a link to hide it from the nav.
     ------------------------------------------------------------------------ */
  nav: {
    monogram: "PM",
    links: [
      { label: "About", target: "about" },
      { label: "Career", target: "career" },
      { label: "Work", target: "work" },
      { label: "Contact", target: "contact" },
    ],
    resume: {
      label: "Resume",
      href: "resume.pdf", // Link to local PDF or Google Drive
    },
  },

  /* ---------------------------------------------------------------------------
     3. HERO — the first screen.
        name      : rendered large, one animated letter at a time.
        role      : the line directly under your name.
        rotating  : the typewriter phrases. Add as many as you like; they cycle.
        punchline : one short, confident sentence.
        scrollCue : text next to the animated scroll arrow (OPTIONAL).
     ------------------------------------------------------------------------ */
  hero: {
    name: "Pranav Maheshwari",
    role: "AI & Machine Learning Engineer",
    rotating: [
      "I build Physics-Informed AI & PINNs.",
      "I research surrogate models @ Mercedes-Benz.",
      "I optimize CUDA deep learning pipelines.",
      "I engineer scalable ML & vision systems.",
    ],
    punchline: "Translating complex physics & simulations into fast, scalable AI models.",
    scrollCue: "Scroll",

    // Small status pill above your name. Set to "" (or delete) to hide it.
    // This is the single strongest hiring signal on the page — keep it honest.
    availability: "Passau / Sindelfingen, Germany · EU Work Eligibility",

    // PROOF STRIP — the numbers a hiring manager screenshots.
    // Each `value` counts up when it scrolls into view; the digits are
    // animated and any prefix/suffix text (M+, %, ms, ×) is preserved.
    // 3 items reads best. Delete the array to hide the strip entirely.
    metrics: [
      { value: "<200ms", label: "alert latency (CUDA GPU / YOLO)" },
      { value: "40%", label: "manual processing time eliminated" },
      { value: "100K+", label: "data records preprocessed for ML" },
    ],
  },

  /* ---------------------------------------------------------------------------
     4. ABOUT — short bio + tech tags.
        bio   : an array of paragraphs. One string = one paragraph.
        skills: grouped tag cloud. Add/remove groups or individual items.
     ------------------------------------------------------------------------ */
  about: {
    heading: "About",
    bio: [
      "I'm an AI & Machine Learning Engineer pursuing my M.Sc. in AI Engineering at Universität Passau, currently contributing to PhysicsNeMo surrogate modeling pipelines at Mercedes-Benz AG in Sindelfingen, Germany.",
      "My technical core spans Physics-Informed Neural Networks (PINNs), deep learning acceleration (CUDA, PyTorch), and robust MLOps data workflows (Zarr, SQL, Docker). I specialize in translating heavy engineering simulations into fast, trainable surrogate architectures and deploying end-to-end production AI workflows.",
    ],
    skills: [
      {
        group: "AI / ML Frameworks",
        items: [
          "PyTorch",
          "PhysicsNeMo",
          "PINNs",
          "OpenCV",
          "YOLOv3 / YOLOv8",
          "CUDA Acceleration",
          "LLMs & Transformers",
          "Scikit-Learn",
        ],
      },
      {
        group: "Languages",
        items: ["Python", "C++", "SQL", "JavaScript (React.js)", "Bash"],
      },
      {
        group: "Data & MLOps",
        items: [
          "Zarr Data Format",
          "Mesh Processing",
          "PostgreSQL",
          "Docker",
          "Git",
          "REST APIs",
          "Tableau",
        ],
      },
      {
        group: "Domains & Methods",
        items: [
          "Surrogate Modeling",
          "Linear Elasticity",
          "Geometry-Field Alignment",
          "Curator Workflows",
          "Real-Time Object Tracking",
          "Computer Vision",
        ],
      },
    ],

    // Slow-scrolling band of keywords between About and Career.
    // Delete the array (or leave it empty) to remove the band.
    marquee: [
      "PhysicsNeMo",
      "Physics-Informed Neural Networks",
      "Surrogate Modeling",
      "CUDA Acceleration",
      "Mesh Processing",
      "Zarr Storage",
      "PyTorch",
      "LLMs & Transformers",
      "Computer Vision",
      "Object Tracking",
      "MLOps Data Pipelines",
    ],
  },

  /* ---------------------------------------------------------------------------
     5. CAREER — vertical timeline, newest first.
        Copy one { ... } block to add a job. Delete a block to remove one.
          period  : e.g. "2023 — Present"
          role    : your job title
          company : employer name
          url     : OPTIONAL — makes the company name a link
          location: OPTIONAL — e.g. "Bengaluru, India · Remote"
          current : OPTIONAL true — adds a pulsing "Now" badge to the entry
          points  : 1–2 short lines describing impact (array of strings)
          tech    : pill tags under the entry
     ------------------------------------------------------------------------ */
  career: {
    heading: "Experience",
    subheading: "Where I've engineered AI models and scalable systems.",
    jobs: [
      {
        period: "08/2025 — Present",
        current: true,
        role: "Working Student — Physics-Informed AI",
        company: "Mercedes-Benz AG",
        url: "https://www.mercedes-benz.com",
        location: "Sindelfingen, Germany",
        points: [
          "Researched and benchmarked PhysicsNeMo surrogate AI models across complex engineering use cases, evaluating linear elasticity models for real-time stress/displacement field predictions.",
          "Engineered end-to-end data training pipelines, converting simulation data into PhysicsNeMo-trainable datasets using mesh processing, geometry-field alignment, and Zarr structured storage.",
          "Automated physics data preprocessing and Curator-style workflows, accelerating surrogate model iteration speed for engineering design optimization.",
        ],
        tech: ["Python", "PhysicsNeMo", "PINNs", "PyTorch", "Zarr", "Mesh Processing", "CUDA"],
      },
      {
        period: "12/2022 — 03/2023",
        role: "Market Research & Forecasting Intern",
        company: "EventCart",
        url: "",
        location: "Noida, India",
        points: [
          "Architected SQL-based data workflows to preprocess 100K+ market and customer records for forecasting models.",
          "Developed predictive machine learning models to identify key market trends and consumer behavior patterns, boosting forecast precision.",
          "Designed interactive Tableau reporting dashboards to visualize model metrics and business insights for executive teams.",
        ],
        tech: ["Python", "SQL", "Scikit-Learn", "Tableau", "Predictive Modeling", "Pandas"],
      },
      {
        period: "01/2022 — 04/2022",
        role: "Product Engineer",
        company: "Highradius",
        url: "https://www.highradius.com",
        location: "Delhi, India",
        points: [
          "Deployed an AI-enabled B2B invoicing platform with automated invoice processing pipelines, optimizing data extraction accuracy.",
          "Integrated RESTful APIs to automate invoice validation and decision-making workflows, reducing manual processing time by 40%.",
          "Built a responsive React.js web dashboard featuring real-time data editing, advanced search, and PDF generation tools.",
        ],
        tech: ["React.js", "JavaScript", "REST APIs", "Python", "SQL", "B2B SaaS"],
      },
    ],
  },

  /* ---------------------------------------------------------------------------
     6. WORK — project cards.
        Copy one { ... } block to add a project.
          title      : project name
          blurb      : 1–3 lines about what it does and why it matters
          tech       : pill tags
          links      : OPTIONAL array. `label` is the visible text,
                       `href` the URL. Delete the array to show no links.
          featured   : OPTIONAL true — makes the card span two columns on desktop
          year       : OPTIONAL — shown in the card corner
     ------------------------------------------------------------------------ */
  work: {
    heading: "Projects & Research",
    subheading: "Selected systems in deep learning, computer vision, and surrogate modeling.",
    projects: [
      {
        title: "Real-Time Vehicle Collision Detection System",
        year: "2024",
        featured: true,
        blurb:
          "Engineered a real-time object tracking and collision detection system using YOLOv3 and OpenCV with CUDA GPU acceleration. Implemented automated instant alert APIs with sub-200ms latency and authored a research paper detailing GPU memory optimization benchmarks.",
        tech: ["PyTorch", "YOLOv3", "OpenCV", "CUDA", "Python", "REST APIs"],
        links: [
          {
            label: "GitHub",
            href: "https://github.com/pranavmaheshwari/collision-detection",
          },
        ],
      },
      {
        title: "PhysicsNeMo Surrogate Modeling Pipeline",
        year: "2025",
        featured: false,
        blurb:
          "Deep surrogate AI pipeline converting complex FEA/simulation data into PhysicsNeMo-trainable formats using mesh processing, geometry-field alignment, and Zarr storage for real-time elasticity field predictions.",
        tech: ["PhysicsNeMo", "PINNs", "PyTorch", "Zarr", "Mesh Processing", "CUDA"],
        links: [
          {
            label: "LinkedIn",
            href: "https://www.linkedin.com/in/pranavmaheshwari0617/",
          },
        ],
      },
      {
        title: "AI-Enabled B2B Invoicing Platform",
        year: "2022",
        featured: false,
        blurb:
          "Automated financial document intelligence platform with validation pipelines that reduced manual processing effort by 40%, integrated with an interactive React.js management dashboard.",
        tech: ["React.js", "JavaScript", "Python", "REST APIs", "SQL"],
        links: [
          {
            label: "GitHub",
            href: "https://github.com/pranavmaheshwari",
          },
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------------------
     7. CONTACT — email + socials.
        icon: choose one of the built-in icons —
          "email" | "github" | "linkedin" | "x" | "mastodon" |
          "bluesky" | "website" | "link"
        Anything else falls back to a generic link icon.
     ------------------------------------------------------------------------ */
  contact: {
    heading: "Contact",
    // Big statement line. Wrap the words you want in accent colour with *stars*.
    cta: "Let's build *intelligent, high-performance AI systems*.",
    // A line or two under the CTA.
    blurb:
      "Currently pursuing M.Sc. in AI Engineering at Universität Passau with full work eligibility in Germany. Open to AI/ML engineering opportunities. The fastest way to reach me is email or LinkedIn.",
    email: "pranavmaheshwari0601@gmail.com",
    links: [
      {
        label: "LinkedIn",
        handle: "/in/pranavmaheshwari0617",
        href: "https://www.linkedin.com/in/pranavmaheshwari0617/",
        icon: "linkedin",
      },
      {
        label: "GitHub",
        handle: "@pranavmaheshwari",
        href: "https://github.com/pranavmaheshwari",
        icon: "github",
      },
      {
        label: "Phone",
        handle: "+49 15510237366",
        href: "tel:+4915510237366",
        icon: "link",
      },
    ],
  },

  /* ---------------------------------------------------------------------------
     8. EDUCATION — OPTIONAL. Delete this whole block to hide the section.
     ------------------------------------------------------------------------ */
  education: {
    heading: "Education & Certifications",
    items: [
      {
        period: "10/2023 — Present",
        title: "Master of Science in Artificial Intelligence Engineering",
        org: "Universität Passau — Passau, Germany",
        note: "Focus on Deep Learning Architectures, Physics-Informed Neural Networks (PINNs), LLMs, and Advanced Technical Pipelines.",
      },
      {
        period: "07/2019 — 05/2023",
        title: "Bachelor of Technology (B.Tech) in Computer Science & Engineering",
        org: "SRM Institute of Science and Technology — India",
        note: "Graduated with Computer Science specialization. Relevant coursework: Data Structures, Algorithms, AI, Database Systems.",
      },
      {
        period: "2023",
        title: "Google Data Analytics Professional Certificate",
        org: "Coursera / Google",
        note: "Data preparation, SQL workflows, statistical modeling, and interactive reporting dashboards.",
      },
      {
        period: "2023",
        title: "The Complete Python Pro Bootcamp",
        org: "Udemy",
        note: "Comprehensive Python software architecture, OOP design patterns, data pipelines, and REST APIs.",
      },
    ],
  },

  /* ---------------------------------------------------------------------------
     9. FOOTER — {year} is replaced automatically with the current year.
     ------------------------------------------------------------------------ */
  footer: {
    copyright: "© {year} Pranav Maheshwari. Built from scratch, no frameworks.",
    note: "Passau, Germany · English (C1) · German (A2-B1)",
    // Live clock in your timezone (IANA name)
    timezone: "Europe/Berlin",
  },
};