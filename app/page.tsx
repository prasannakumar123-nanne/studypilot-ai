
import Link from "next/link";

const stats = [
  {
    icon: "▤",
    label: "Learning plan",
    value: "3",
    description: "Topics in your roadmap",
    color: "purple",
  },
  {
    icon: "✓",
    label: "Practice activity",
    value: "0",
    description: "Questions answered",
    color: "blue",
  },
  {
    icon: "↗",
    label: "Your accuracy",
    value: "0%",
    description: "0 correct out of 0",
    color: "green",
  },
];

export default function Home() {
  return (
    <main className="home-page">
      <header className="navbar">
        <Link href="/" className="brand">
          <span className="brand-logo">✦</span>
          <span>
            StudyPilot <span className="brand-accent">AI</span>
          </span>
        </Link>

        <nav className="nav-links">
          <Link href="/">Dashboard</Link>
          <Link href="/study-planner">My learning</Link>
          <Link href="/quiz">Practice</Link>
        </nav>

        <div className="student-profile">
          <span className="avatar">S</span>
          <span>Student</span>
        </div>
      </header>

      <section className="hero-section">
        <div className="hero-copy">
          <div className="hero-badge">
            <span>✦</span> YOUR PERSONAL AI STUDY COACH
          </div>

          <h1>
            Learn smarter.
            <br />
            <span>Master faster.</span>
          </h1>

          <p className="hero-description">
            Turn your mistakes into strengths. Practice at your own pace,
            understand difficult concepts, and build skills one step at a time.
          </p>

          <div className="hero-buttons">
            <Link href="/study-planner" className="button button-primary">
              Start learning <span>→</span>
            </Link>

            <Link href="/quiz" className="button button-secondary">
              Take a Quiz <span>✦</span>
            </Link>

            <Link href="/study-coach" className="roadmap-link">
              Explore roadmap
            </Link>
          </div>

          <p className="beginner-note">
            <span className="green-dot" />
            Every expert starts as a beginner.
          </p>
        </div>

        <div className="hero-art" aria-label="StudyPilot learning illustration">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="orbit orbit-three" />

          <span className="sparkle sparkle-one">✦</span>
          <span className="sparkle sparkle-two">✧</span>

          <div className="main-symbol">✦</div>

          <div className="floating-card improvement-card">
            <span className="mini-icon green-icon">✓</span>
            <div>
              <strong>Keep improving</strong>
              <small>One question at a time</small>
            </div>
          </div>

          <div className="floating-card learning-card">
            <span className="mini-icon purple-icon">✧</span>
            <div>
              <strong>Learn by doing</strong>
              <small>Practice makes progress</small>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="stats-grid">
          {stats.map((stat) => (
            <article className="stat-card" key={stat.label}>
              <div className="stat-heading">
                <span className={`stat-icon ${stat.color}`}>
                  {stat.icon}
                </span>
                <span>{stat.label}</span>
              </div>

              <div className="stat-value">{stat.value}</div>
              <p>{stat.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="tools-section">
        <div className="section-title">
          <span className="section-eyebrow">YOUR LEARNING SPACE</span>
          <h2>Ready to make progress?</h2>
          <p>Choose a tool and continue learning at your own pace.</p>
        </div>

        <div className="tools-grid">
          <article className="tool-card">
            <span className="tool-icon purple">▤</span>
            <h3>Study Planner</h3>
            <p>Organize your subjects and plan your learning sessions.</p>
            <Link href="/study-planner" className="tool-link">
              Open planner →
            </Link>
          </article>

          <article className="tool-card">
            <span className="tool-icon blue">✧</span>
            <h3>AI Study Coach</h3>
            <p>Get guidance to understand difficult topics step by step.</p>
            <Link href="/study-coach" className="tool-link">
              Meet your coach →
            </Link>
          </article>

          <article className="tool-card">
            <span className="tool-icon green">✓</span>
            <h3>Practice Quiz</h3>
            <p>Answer questions, check your score, and learn from mistakes.</p>
            <Link href="/quiz" className="tool-link">
              Take a Quiz →
            </Link>
          </article>
        </div>
      </section>

      <footer className="home-footer">
        <Link href="/" className="footer-brand">
          ✦ StudyPilot AI
        </Link>
        <span>Small steps today. Better results tomorrow.</span>
      </footer>
    </main>
  );
}
