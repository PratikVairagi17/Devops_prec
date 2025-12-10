"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Topic = {
  title: string;
  subtitle: string;
  file: string;
  icon: string;
  level: string;
  tag: string;
};

const topics: Topic[] = [
  {
    title: "DevOps Tools",
    subtitle: "DevOps tools, functions, and where we use them",
    file: "/html/devOps_tools.html",
    icon: "🧰",
    level: "Core",
    tag: "Tools • Use-cases",
  },
  {
    title: "AWS Tools",
    subtitle: "AWS services for DevOps and automation",
    file: "/html/aws_tools.html",
    icon: "☁️",
    level: "Core",
    tag: "AWS DevOps Services",
  },
  {
    title: "DevOps Overview",
    subtitle: "What is DevOps, why, lifecycle & interview Q&A",
    file: "/html/devops.html",
    icon: "⚙️",
    level: "Core",
    tag: "Culture • CI/CD • Lifecycle",
  },
  {
    title: "Git & GitHub",
    subtitle: "Workflow, branching, merge, rebase, interview Q&A",
    file: "/html/gitgithub.html",
    icon: "🌿",
    level: "Core",
    tag: "Branches • Merge • Rebase",
  },
  {
    title: "Git vs GitHub vs GitLab",
    subtitle: "Visual comparison & concepts",
    file: "/html/git_github_gitlab_ui.html",
    icon: "📊",
    level: "Quick",
    tag: "Differences • Use-cases",
  },
  {
    title: "GitLab CI/CD",
    subtitle: "Pipelines, runners, interview Q&A",
    file: "/html/git_lab.html",
    icon: "🦊",
    level: "CI/CD",
    tag: "Pipelines • Runners • MR",
  },
  {
    title: "CI/CD",
    subtitle: "Concepts, pipelines, DevOps use, interview Q&A",
    file: "/html/CICD.html",
    icon: "🚀",
    level: "Core",
    tag: "Pipelines • Automation",
  },
  {
    title: "Docker",
    subtitle: "Containers, images, commands, interview Q&A",
    file: "/html/docker_tutorial_ui.html",
    icon: "🐳",
    level: "Core",
    tag: "Containers • Images • Dockerfile",
  },
  {
    title: "Jenkins",
    subtitle: "Pipelines, agents, Jenkinsfile, interview Q&A",
    file: "/html/jenkin.html",
    icon: "🤖",
    level: "CI/CD",
    tag: "CI Server • Pipelines",
  },
  {
    title: "Terraform",
    subtitle: "IaC, HCL, providers, interview Q&A",
    file: "/html/terraform_learning_hub.html",
    icon: "🌍",
    level: "IaC",
    tag: "IaC • Cloud automation",
  },
  {
    title: "YAML",
    subtitle: "Basics, syntax, DevOps use, interview Q&A",
    file: "/html/yaml_guide.html",
    icon: "📄",
    level: "Config",
    tag: "Configs • K8s • CI/CD",
  },
];

const quotes = [
  { text: "Small consistent steps become big results over time.", author: "Unknown" },
  { text: "You don’t need to be great to start, but you must start to be great.", author: "Zig Ziglar" },
  { text: "Focus on progress, not perfection.", author: "Unknown" },
  { text: "Every script you write today makes tomorrow easier.", author: "DevOps Mindset" },
  { text: "Dream in code, deploy in reality.", author: "Unknown" },
  { text: "Discipline beats motivation. But today, you have both.", author: "Unknown" },
  { text: "Learning one tool deeply is better than knowing ten tools superficially.", author: "Unknown" },
  { text: "Break your learning into small deployable units.", author: "DevOps Philosophy" },
];

function getRandomQuote() {
  const idx = Math.floor(Math.random() * quotes.length);
  return quotes[idx];
}

export default function Home() {
  const [activeTopic, setActiveTopic] = useState<Topic | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [quote, setQuote] = useState(quotes[0]); // deterministic for SSR
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const filteredTopics = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return topics;
    return topics.filter((t) =>
      `${t.title} ${t.subtitle} ${t.tag}`.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  useEffect(() => {
    const body = typeof document !== "undefined" ? document.body : null;
    if (!body) return;
    if (sidebarCollapsed) {
      body.classList.add("sidebar-collapsed");
    } else {
      body.classList.remove("sidebar-collapsed");
    }
    return () => body.classList.remove("sidebar-collapsed");
  }, [sidebarCollapsed]);

  useEffect(() => {
    const handleResize = () => {
      if (!iframeRef.current || !wrapperRef.current) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      const available = window.innerHeight - rect.top - 16;
      const height = available > 300 ? available : 300;
      iframeRef.current.style.height = `${height}px`;
    };

    handleResize();
    const iframeEl = iframeRef.current;
    window.addEventListener("resize", handleResize);
    iframeEl?.addEventListener("load", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      iframeEl?.removeEventListener("load", handleResize);
    };
  }, []);

  useEffect(() => {
    const id = setTimeout(() => {
      if (!iframeRef.current) return;
      iframeRef.current.contentWindow?.dispatchEvent(new Event("resize"));
    }, 60);
    return () => clearTimeout(id);
  }, [activeTopic, sidebarCollapsed]);

  useEffect(() => {
    setQuote(getRandomQuote());
  }, []);

  const onSelectTopic = (topic: Topic) => {
    setActiveTopic(topic);
  };

  const onShowWelcome = () => {
    setActiveTopic(null);
    setQuote(getRandomQuote());
  };

  return (
    <div className="container">
      <div className="layout">
        <aside className="sidebar">
          <h2>Topics</h2>
          <p>Select any topic to load its mini-guide on the right.</p>

          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder="Search (docker, git, jenkins, yaml...)"
              aria-label="Search topics"
            />
          </div>

          <div className="topic-grid">
            {filteredTopics.map((topic) => {
              const isActive = activeTopic?.title === topic.title;
              return (
                <button
                  key={topic.title}
                  className={`topic-card${isActive ? " active" : ""}`}
                  onClick={() => onSelectTopic(topic)}
                >
                  <div className="topic-icon" aria-hidden>{topic.icon}</div>
                  <div className="topic-text">
                    <div className="topic-title">{topic.title}</div>
                    <div className="topic-tag">{topic.tag}</div>
                  </div>
                  <span className="topic-level">{topic.level}</span>
                </button>
              );
            })}
            {filteredTopics.length === 0 && (
              <div className="hint-box">No topics match “{searchTerm}”.</div>
            )}
          </div>

          <div className="hint-box">
            <strong>Tip:</strong>
            <br />• Keep all topic HTML files in the same folder as this hub.
            <br />• Click a card to open that guide on the right.
            <br />• Use the “Hide Topics” button to get a bigger reading window.
          </div>
        </aside>

        <main className="main-area">
          <div className="top-bar">
            <div className="current-topic">
              Current topic: <span>{activeTopic ? activeTopic.title : "None selected"}</span>
            </div>
            <button
              className="toggle-btn"
              onClick={() => setSidebarCollapsed((v) => !v)}
              type="button"
            >
              <span className="icon">{sidebarCollapsed ? "📖" : "📚"}</span>
              <span className="text">{sidebarCollapsed ? "Show topics" : "Hide topics"}</span>
            </button>
          </div>

          <div className="iframe-wrapper" ref={wrapperRef}>
            {!activeTopic && (
              <div className="placeholder">
                <div className="placeholder-icon">📚</div>
                <div className="placeholder-title">Welcome to your DevOps Study Hub</div>
                <div className="quote-text">"{quote.text}"</div>
                <div className="quote-author">{quote.author ? `— ${quote.author}` : ""}</div>
                <button className="toggle-btn" type="button" onClick={onShowWelcome}>
                  New quote
                </button>
              </div>
            )}
            <iframe
              ref={iframeRef}
              src={activeTopic ? activeTopic.file : ""}
              title="DevOps Study Hub Viewer"
            />
          </div>
        </main>
      </div>
    </div>
  );
}

