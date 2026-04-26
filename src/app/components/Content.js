"use client";

import { useState, useEffect, useRef, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import {
  Box,
  Container,
  Typography,
  Chip,
  Grid,
  Card,
  CardContent,
  IconButton,
  Divider,
  Avatar,
  Stack,
  Button,
  Link,
  Tooltip,
  Fade,
  useMediaQuery,
  Toolbar,
} from "@mui/material";
import { alpha } from "@mui/material/styles";

const BOTTOM_NAV_HEIGHT = 56;

// ─── Theme ────────────────────────────────────────────────────────────────────
const ACCENT = "#1F4E79";
const ACCENT2 = "#2E75B6";
const GOLD = "#C8A84B";
const LIGHT = "#F7F9FC";

// ─── i18n ─────────────────────────────────────────────────────────────────────
const content = {
  en: {
    nav: [
      "About",
      "Skills",
      "Experience",
      "Projects",
      "Education",
      "Articles",
      "Contact",
    ],
    hero: {
      role: "Full-Stack Developer",
      tagline:
        "15+ years building web applications, enterprise systems & AI-powered tools across Europe and Brazil.",
      cta: "View Projects",
      cta2: "Download CV",
    },
    about: {
      title: "About Me",
      body: "Full-stack developer with over 15 years of experience building web applications, enterprise systems and cloud infrastructure. I work across the modern web stack — React, Next.js, Node.js, Python and Django — and have a strong background in containerised deployments, REST API design, and team leadership. Currently based in Portimão, Portugal, and open to remote opportunities across Europe.",
      tags: [
        "Portugal + Remote",
        "B2/C1 English",
        "Master's Degree",
        "ITIL Certified",
      ],
    },
    skills: { title: "Key Skills" },
    experience: {
      title: "Experience",
      responsibilities: "Responsibilities",
      tech: "Technologies",
    },
    projects: { title: "Projects", visit: "Visit", code: "Code" },
    education: {
      title: "Education & Training",
      ects: "ECTS",
      grade: "Grade",
      hours: "Hours",
    },
    articles: { title: "Articles", readMore: "Read more" },
    contact: {
      title: "Get in Touch",
      subtitle: "Open to full-stack and research-oriented roles. Let's talk.",
      email: "Send an Email",
      website: "Visit Website",
    },
    lang: "PT",
  },
  pt: {
    nav: [
      "Sobre",
      "Competências",
      "Experiência",
      "Projetos",
      "Formação",
      "Artigos",
      "Contacto",
    ],
    hero: {
      role: "Programador Full-Stack",
      tagline:
        "Mais de 15 anos a desenvolver aplicações web, sistemas empresariais e ferramentas com IA na Europa e no Brasil.",
      cta: "Ver Projetos",
      cta2: "Download CV",
    },
    about: {
      title: "Sobre Mim",
      body: "Programador full-stack com mais de 15 anos de experiência no desenvolvimento de aplicações web, sistemas empresariais e infraestrutura cloud. Trabalho com o stack web moderno — React, Next.js, Node.js, Python e Django — e tenho experiência sólida em implementações com Docker, design de APIs REST e liderança de equipas. Atualmente em Portimão, Portugal, aberto a oportunidades remotas na Europa.",
      tags: [
        "Portugal + Remoto",
        "Inglês B2/C1",
        "Mestrado",
        "Certificado ITIL",
      ],
    },
    skills: { title: "Competências-Chave" },
    experience: {
      title: "Experiência",
      responsibilities: "Atividades",
      tech: "Tecnologias",
    },
    projects: { title: "Projetos", visit: "Visitar", code: "Código" },
    education: {
      title: "Formação Académica",
      ects: "ECTS",
      grade: "Nota",
      hours: "Horas",
    },
    articles: { title: "Artigos", readMore: "Ler mais" },
    contact: {
      title: "Contacto",
      subtitle:
        "Disponível para funções full-stack e projetos de investigação. Vamos falar.",
      email: "Enviar Email",
      website: "Visitar Website",
    },
    lang: "EN",
  },
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const skillsData = [
  {
    category: "Frontend",
    items: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Material UI",
      "PrimeReact",
      "Tailwind",
      "Bootstrap",
    ],
  },
  {
    category: "Backend",
    items: [
      "Node.js",
      "Python",
      "Django",
      "PHP",
      "Laravel",
      "Express",
      ".NET Core",
      "C#",
    ],
  },
  {
    category: "Databases",
    items: ["MySQL", "PostgreSQL", "SQLite", "MS SQL Server", "Redis"],
  },
  {
    category: "DevOps & Cloud",
    items: ["Docker", "Azure", "Linux", "Apache", "SSH", "PM2"],
  },
  {
    category: "AI & Automation",
    items: ["Azure Cognitive Services", "Generative AI", "RPA", "Puppeteer"],
  },
  {
    category: "APIs & Integration",
    items: ["REST APIs", "Socket.io", "Web3.js", "Swagger", "Postman"],
  },
];

const experienceData = [
  {
    period: { en: "Apr 2026 – Jul 2026", pt: "Abr 2026 – Jul 2026" },
    title: { en: "Computer Programmer", pt: "Programador Informático" },
    company: "INESC TEC",
    location: "Porto, Portugal",
    bullets: {
      en: [
        "Built interactive React dashboards for real-time visualisation of power transformer energy consumption data",
        "Conducted systematic literature review on building energy management systems, informing platform architecture decisions",
        "Integrated Django/Celery backend with PostgreSQL and Redis for asynchronous data processing pipelines",
        "Containerised and deployed the full application stack using Docker for reproducible research environments",
      ],
      pt: [
        "Desenvolveu dashboards interativos em React para visualização em tempo real do consumo de energia de transformadores de potência",
        "Conduziu revisão sistemática da literatura sobre sistemas de gestão de energia em edifícios",
        "Integrou backend Django/Celery com PostgreSQL e Redis para pipelines de processamento de dados assíncrono",
        "Containerizou e implementou o stack completo da aplicação em Docker para ambientes de investigação reproduzíveis",
      ],
    },
    tech: [
      "React.js",
      "Python",
      "Django",
      "Docker",
      "Redis",
      "PostgreSQL",
      "Celery",
      "Recharts",
    ],
  },
  {
    period: { en: "Mar 2024 – Jun 2025", pt: "Mar 2024 – Jun 2025" },
    title: { en: "Computer Programmer", pt: "Programador Informático" },
    company: "Desion GmbH",
    location: "Darmstadt, Germany",
    bullets: {
      en: [
        "Developed and maintained responsive full-stack web applications serving clients across Germany",
        "Architected and deployed a containerised global calendar server (SoGo + LDAP + Apache)",
        "Integrated an AI-powered image acquisition solution, reducing manual processing overhead",
        "Automated business processes using RPA techniques and custom Node.js/Puppeteer scripts",
      ],
      pt: [
        "Desenvolveu e manteve aplicações web full-stack responsivas ao serviço de clientes na Alemanha",
        "Arquitetou e implementou um servidor de agenda global containerizado (SoGo + LDAP + Apache)",
        "Integrou solução de aquisição de imagens com IA, reduzindo o processamento manual",
        "Automatizou processos com técnicas de RPA e scripts personalizados em Node.js/Puppeteer",
      ],
    },
    tech: [
      "React.js",
      "Node.js",
      "Puppeteer",
      "Material UI",
      "Socket.io",
      "Docker",
      "SQLite",
      "GitLab",
    ],
  },
  {
    period: { en: "Feb 2022 – Feb 2024", pt: "Fev 2022 – Fev 2024" },
    title: { en: "Computer Programmer", pt: "Programador Informático" },
    company: "Novaut Smart Engineering",
    location: "Vitoria-Gasteiz, Spain",
    bullets: {
      en: [
        "Built a custom Prestashop module for budget control, streamlining the client's procurement workflow",
        "Developed REST APIs to automate real-time stock synchronisation between suppliers and the online store",
        "Implemented SEO strategies via Google Search Console, improving organic search visibility",
      ],
      pt: [
        "Desenvolveu módulo personalizado em Prestashop para controlo de orçamentos",
        "Desenvolveu APIs REST para sincronização em tempo real de stocks entre fornecedores e loja online",
        "Implementou estratégias de SEO via Google Search Console, melhorando a visibilidade orgânica",
      ],
    },
    tech: [
      "PHP",
      "JavaScript",
      "MySQL",
      "Prestashop",
      "WordPress",
      "GitHub",
      "ERP",
      "Google Analytics",
    ],
  },
  {
    period: { en: "Feb 2020 – Jan 2022", pt: "Fev 2020 – Jan 2022" },
    title: { en: "IT Technician", pt: "Técnico de Informática" },
    company: "Swissinvestor Investimentos",
    location: "Coimbra, Portugal",
    bullets: {
      en: [
        "Built custom CRM platforms with dynamic dashboards and reporting tools",
        "Developed Ethereum blockchain solutions integrating Web3.js and Metamask",
        "Led a team of developers, defining project scope, task allocation and delivery timelines",
        "Designed REST APIs documented with Swagger for internal and external consumers",
      ],
      pt: [
        "Desenvolveu plataformas CRM com dashboards dinâmicos e ferramentas de reporting",
        "Desenvolveu soluções blockchain em Ethereum integrando Web3.js e Metamask",
        "Liderou equipa de programadores, definindo âmbito, tarefas e prazos de entrega",
        "Concebeu APIs REST documentadas com Swagger para consumidores internos e externos",
      ],
    },
    tech: [
      "PHP",
      "Laravel",
      ".NET Core",
      "C#",
      "Node.js",
      "MySQL",
      "Ethereum",
      "Web3.js",
      "Swagger",
    ],
  },
  {
    period: { en: "May 2009 – Jun 2019", pt: "Mai 2009 – Jun 2019" },
    title: { en: "IT Technician", pt: "Técnico de Informática" },
    company: "T&E Analítica",
    location: "Campinas, Brazil",
    bullets: {
      en: [
        "Designed and developed a full LIMS in ASP.NET/C#, integrating multiple departments",
        "Implemented a UTM firewall with LDAP authentication and transparent proxy",
        "Built an IT asset management system for all network-connected equipment",
        "Led a team of IT technicians across a 10-year tenure",
      ],
      pt: [
        "Concebeu e desenvolveu sistema LIMS completo em ASP.NET/C# integrando múltiplos departamentos",
        "Implementou firewall UTM com autenticação LDAP e proxy transparente",
        "Desenvolveu sistema de gestão de ativos de TI para equipamentos em rede",
        "Liderou equipa de técnicos de informática durante 10 anos",
      ],
    },
    tech: [
      "ASP.NET",
      "C#",
      "JavaScript",
      "MS SQL Server",
      "Bootstrap",
      "Azure",
      "CentOS",
      "Apache",
      "MySQL",
    ],
  },
];

const projectsData = [
  {
    name: "Fluentor",
    year: "2024",
    desc: {
      en: "AI-powered English pronunciation practice app integrating Azure Speech Services and Generative AI.",
      pt: "Aplicação de prática de pronúncia em inglês com IA, integrando Azure Speech Services e IA Generativa.",
    },
    tech: [
      "Next.js",
      "React.js",
      "Material UI",
      "SQLite",
      "Azure Speech",
      "Generative AI",
    ],
    url: "https://www.fluentor.app",
    github: null,
    highlight: true,
  },
  {
    name: "Robotic Process Automation",
    year: "2023",
    desc: {
      en: "Web-based RPA platform for automating browser tasks with real-time process monitoring via Socket.io.",
      pt: "Plataforma RPA web para automatização de tarefas de browser com monitorização em tempo real via Socket.io.",
    },
    tech: ["Node.js", "Express", "React.js", "Puppeteer", "Socket.io"],
    url: null,
    github: "https://github.com/devrazec/rpa",
  },
  {
    name: "Zeladoria Urbana",
    year: "2023",
    desc: {
      en: "Civic reporting platform with Google Geolocation, allowing residents to flag urban maintenance issues.",
      pt: "Plataforma de reporte cívico com Google Geolocalização para registo de ocorrências urbanas.",
    },
    tech: ["Next.js", "React.js", "Material UI", "PrimeReact", "Leaflet"],
    url: null,
    github: "https://github.com/devrazec/zeur",
  },
  {
    name: "Book Store",
    year: "2022",
    desc: {
      en: "Full-stack Laravel + React app with Docker deployment, authentication and SQLite persistence.",
      pt: "Aplicação full-stack Laravel + React com Docker, autenticação e persistência SQLite.",
    },
    tech: ["Laravel", "React.js", "Docker", "SQLite", "Tailwind", "PrimeReact"],
    url: null,
    github: "https://github.com/devrazec/laravel-docker",
  },
  {
    name: "Amazon Clone",
    year: "2022",
    desc: {
      en: "Full-stack e-commerce prototype built with Next.js and Material UI, demonstrating modern React patterns.",
      pt: "Protótipo de e-commerce full-stack com Next.js e Material UI, demonstrando padrões modernos de React.",
    },
    tech: ["Next.js", "React.js", "Material UI", "PrimeReact", "Leaflet"],
    url: null,
    github: "https://github.com/devrazec/mongodb",
  },
  {
    name: "Interactive Maps",
    year: "2021",
    desc: {
      en: "React/Leaflet application for rendering and interacting with dynamic geographic data.",
      pt: "Aplicação React/Leaflet para visualização e interação com dados geográficos dinâmicos.",
    },
    tech: ["React.js", "Vite", "Bootstrap", "Leaflet"],
    url: null,
    github: "https://github.com/devrazec/map",
  },
];

const educationData = [
  {
    period: { en: "Nov 2022 – Nov 2025", pt: "Nov 2022 – Nov 2025" },
    degree: {
      en: "Master's Degree in Information and Enterprise Systems",
      pt: "Mestrado em Informação e Sistemas Empresariais",
    },
    institution: "Universidade Aberta",
    location: { en: "Lisbon, Portugal", pt: "Lisboa, Portugal" },
    detail: {
      en: "Dissertation: Robotic Process Automation (RPA) applied to Enterprise Systems",
      pt: "Dissertação: Automação Robótica de Processos (RPA) aplicada a Sistemas Empresariais",
    },
    meta: "ECTS: 120  ·  Grade: 14",
  },
  {
    period: { en: "Oct 2014 – Nov 2015", pt: "Out 2014 – Nov 2015" },
    degree: {
      en: "Postgraduate in Software Engineering and Architecture",
      pt: "Pós-graduação em Engenharia e Arquitetura de Software",
    },
    institution: "Universidade Estácio de Sá",
    location: { en: "Campinas, Brazil", pt: "Campinas, Brasil" },
    detail: {
      en: "Final Project: DevExpress Framework for Microsoft .NET web applications",
      pt: "TCC: Framework DevExpress para desenvolvimento de aplicações web Microsoft .NET",
    },
    meta: "ECTS: 60  ·  Grade: 16",
  },
  {
    period: { en: "Jan 2010 – Dec 2011", pt: "Jan 2010 – Dez 2011" },
    degree: {
      en: "Technical Degree in Systems Analysis and Development",
      pt: "Técnico Superior em Análise e Desenvolvimento de Sistemas",
    },
    institution: "Universidade Claretiano",
    location: { en: "Campinas, Brazil", pt: "Campinas, Brasil" },
    detail: { en: "", pt: "" },
    meta: "ECTS: 120  ·  Grade: 16",
  },
  {
    period: { en: "Apr 2026 – Jul 2026", pt: "Abr 2026 – Jul 2026" },
    degree: {
      en: "Advanced Studies in Engineering Projects",
      pt: "Estudos Avançados em Projetos em Engenharia",
    },
    institution: "Universidade do Porto",
    location: { en: "Porto, Portugal", pt: "Porto, Portugal" },
    detail: {
      en: "Computer Engineering, Software Engineering, Intelligent Systems",
      pt: "Engenharia Informática, Engenharia de Software, Sistemas Inteligentes",
    },
    meta: "ECTS: 15  ·  Hours: 405",
  },
  {
    period: { en: "2019", pt: "2019" },
    degree: {
      en: "ITIL Certification in IT Service Management",
      pt: "Certificação ITIL em Gestão de Serviços de TI",
    },
    institution: "PeopleCert",
    location: { en: "Campinas, Brazil", pt: "Campinas, Brasil" },
    detail: { en: "", pt: "" },
    meta: "Hours: 24",
  },
];

const articlesData = [
  {
    title: {
      en: "Building an AI Pronunciation App with Azure Speech SDK and Next.js",
      pt: "Construindo uma App de Pronúncia com Azure Speech SDK e Next.js",
    },
    excerpt: {
      en: "How I integrated Azure Cognitive Services into a full-stack Next.js app to provide real-time pronunciation feedback.",
      pt: "Como integrei os Azure Cognitive Services numa app Next.js full-stack para feedback de pronúncia em tempo real.",
    },
    date: "2026",
    tag: "AI · Next.js",
    url: "#",
  },
  {
    title: {
      en: "RPA in Enterprise Systems: My Master's Dissertation Findings",
      pt: "RPA em Sistemas Empresariais: Conclusões da Minha Dissertação de Mestrado",
    },
    excerpt: {
      en: "An overview of practical RPA applications in enterprise workflows and lessons learned from academic research.",
      pt: "Uma visão geral das aplicações práticas de RPA em fluxos de trabalho empresariais e lições da investigação académica.",
    },
    date: "2025",
    tag: "RPA · Research",
    url: "#",
  },
  {
    title: {
      en: "Containerising a Full-Stack Django App with Docker and Celery",
      pt: "Containerizar uma App Django Full-Stack com Docker e Celery",
    },
    excerpt: {
      en: "Step-by-step guide to setting up a production-ready Django + Celery + Redis stack with Docker Compose.",
      pt: "Guia passo a passo para configurar um stack Django + Celery + Redis com Docker Compose para produção.",
    },
    date: "2026",
    tag: "Docker · Django",
    url: "#",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionTitle({ children }) {
  return (
    <Box sx={{ mb: 5 }}>
      <Typography
        variant="h2"
        sx={{ fontSize: { xs: "1.9rem", md: "2.5rem" }, color: ACCENT, mb: 1 }}
      >
        {children}
      </Typography>
      <Box
        sx={{
          width: 56,
          height: 4,
          borderRadius: 2,
          background: `linear-gradient(90deg,${ACCENT},${GOLD})`,
        }}
      />
    </Box>
  );
}

function TechChip({ label }) {
  return (
    <Chip
      label={label}
      size="small"
      sx={{
        bgcolor: alpha(ACCENT, 0.07),
        color: ACCENT,
        fontWeight: 600,
        border: `1px solid ${alpha(ACCENT, 0.15)}`,
        "&:hover": { bgcolor: alpha(ACCENT, 0.14) },
      }}
    />
  );
}

export default function Content({ children }) {
  const { lang, setLang, activeExp, setActiveExp, sectionSx, setActiveSection } = useContext(GlobalContext);
  const t = content[lang];
  const scrollContainerRef = useRef(null);
  
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const sections = scrollContainer.querySelectorAll('[id^="#"]');
    const sectionElements = Array.from(scrollContainer.querySelectorAll('#about, #skills, #experience, #projects, #education, #articles, #contact'));
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { 
        root: scrollContainer,
        threshold: [0.3], 
        rootMargin: '-80px 0px -40% 0px' 
      }
    );

    sectionElements.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [setActiveSection]);

  const altBg = {
    background: `linear-gradient(160deg, ${alpha(ACCENT, 0.03)} 0%, ${alpha(ACCENT2, 0.06)} 100%)`,
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Toolbar sx={{ flexShrink: 0 }} />
      {children ? (
        <Box sx={{ flexGrow: 1, minHeight: 0 }}>{children}</Box>
      ) : (
        <Box
          ref={scrollContainerRef}
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            p: { xs: 2, md: 3 },
            pb: { xs: `${BOTTOM_NAV_HEIGHT + 24}px`, md: 3 },
          }}
        >
          <Box
            sx={{
              bgcolor: "background.default",
              minHeight: "100vh",
              overflowX: "hidden",
            }}
          >
            {/* ── HERO ────────────────────────────────────────────────────────── */}
            <Box
              id="about"
              sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                background: `linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT2} 55%, #1a3a5c 100%)`,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Decorative circles */}
              {[300, 500, 700].map((s, i) => (
                <Box
                  key={i}
                  sx={{
                    position: "absolute",
                    width: s,
                    height: s,
                    borderRadius: "50%",
                    border: `1px solid ${alpha("#fff", 0.06)}`,
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                    pointerEvents: "none",
                  }}
                />
              ))}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "40%",
                  height: "100%",
                  background: `radial-gradient(ellipse at top right, ${alpha(GOLD, 0.15)}, transparent 70%)`,
                  pointerEvents: "none",
                }}
              />

              <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
                <Grid container alignItems="center" spacing={6}>
                  <Grid item xs={12} md={7}>
                    <Typography
                      sx={{
                        color: alpha("#fff", 0.7),
                        fontFamily: "'DM Mono',monospace",
                        fontSize: "0.85rem",
                        letterSpacing: 3,
                        mb: 2,
                        textTransform: "uppercase",
                      }}
                    >
                      {t.hero.role}
                    </Typography>
                    <Typography
                      variant="h1"
                      sx={{
                        color: "#fff",
                        fontSize: { xs: "2.8rem", md: "4.2rem" },
                        lineHeight: 1.1,
                        mb: 3,
                      }}
                    >
                      Cezar
                      <br />
                      <Box component="span" sx={{ color: GOLD }}>
                        Souza
                      </Box>
                    </Typography>
                    <Typography
                      sx={{
                        color: alpha("#fff", 0.75),
                        fontSize: "1.1rem",
                        lineHeight: 1.8,
                        mb: 4,
                        maxWidth: 520,
                      }}
                    >
                      {t.hero.tagline}
                    </Typography>
                    <Stack direction="row" spacing={2} flexWrap="wrap" gap={1}>
                      <Button
                        variant="contained"
                        href="#projects"
                        sx={{
                          bgcolor: GOLD,
                          color: "#1A1A2E",
                          fontWeight: 700,
                          borderRadius: 8,
                          px: 3.5,
                          py: 1.2,
                          "&:hover": { bgcolor: "#d4b05a" },
                        }}
                      >
                        {t.hero.cta}
                      </Button>
                      <Button
                        variant="outlined"
                        href="https://www.razec.pt"
                        target="_blank"
                        sx={{
                          color: "#fff",
                          borderColor: alpha("#fff", 0.4),
                          borderRadius: 8,
                          px: 3.5,
                          py: 1.2,
                          "&:hover": {
                            borderColor: "#fff",
                            bgcolor: alpha("#fff", 0.08),
                          },
                        }}
                      >
                        razec.pt
                      </Button>
                    </Stack>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={5}
                    sx={{
                      display: { xs: "none", md: "flex" },
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      sx={{
                        width: 300,
                        height: 300,
                        borderRadius: "50%",
                        background: `linear-gradient(135deg,${alpha(GOLD, 0.25)},${alpha("#fff", 0.05)})`,
                        border: `2px solid ${alpha(GOLD, 0.3)}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "'Playfair Display',serif",
                          fontSize: "6rem",
                          color: alpha("#fff", 0.15),
                          userSelect: "none",
                        }}
                      >
                        CS
                      </Typography>
                      {/* Orbit dots */}
                      {[
                        "React",
                        "Next.js",
                        "Python",
                        "Docker",
                        "Azure",
                        "Node.js",
                      ].map((s, i) => {
                        const angle = (i / 6) * 2 * Math.PI;
                        const r = 155;
                        return (
                          <Box
                            key={s}
                            sx={{
                              position: "absolute",
                              top: `calc(50% + ${Math.sin(angle) * r}px - 18px)`,
                              left: `calc(50% + ${Math.cos(angle) * r}px - 18px)`,
                              bgcolor: alpha(GOLD, 0.15),
                              border: `1px solid ${alpha(GOLD, 0.4)}`,
                              borderRadius: 4,
                              px: 1,
                              py: 0.3,
                              fontSize: "0.6rem",
                              color: "#fff",
                              fontFamily: "'DM Mono',monospace",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {s}
                          </Box>
                        );
                      })}
                    </Box>
                  </Grid>
                </Grid>
              </Container>
            </Box>

            {/* ── ABOUT TAGS ─────────────────────────────────────────────────── */}
            <Box
              sx={{
                bgcolor: "#fff",
                py: 3,
                borderBottom: `1px solid ${alpha(ACCENT, 0.08)}`,
              }}
            >
              <Container maxWidth="lg">
                <Stack
                  direction="row"
                  flexWrap="wrap"
                  gap={2}
                  justifyContent="center"
                >
                  {t.about.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      sx={{
                        bgcolor: alpha(ACCENT, 0.07),
                        color: ACCENT,
                        fontWeight: 600,
                        border: `1px solid ${alpha(ACCENT, 0.15)}`,
                      }}
                    />
                  ))}
                </Stack>
              </Container>
            </Box>

            {/* ── ABOUT ──────────────────────────────────────────────────────── */}
            <Box sx={{ ...sectionSx, bgcolor: "#fff" }}>
              <Container maxWidth="lg">
                <SectionTitle>{t.about.title}</SectionTitle>
                <Typography
                  sx={{
                    color: "text.secondary",
                    lineHeight: 1.9,
                    fontSize: "1.05rem",
                    mb: 4,
                    maxWidth: "800px",
                  }}
                >
                  {t.about.body}
                </Typography>
                <Grid container spacing={2}>
                  {[
                    {
                      label: "Years",
                      value: "15+",
                      sub: { en: "Experience", pt: "Experiência" }[lang],
                    },
                    {
                      label: "Countries",
                      value: "4",
                      sub: { en: "Worked in", pt: "Países" }[lang],
                    },
                    {
                      label: "Stack",
                      value: "20+",
                      sub: { en: "Technologies", pt: "Tecnologias" }[lang],
                    },
                    {
                      label: "ECTS",
                      value: "270+",
                      sub: {
                        en: "Academic Credits",
                        pt: "Créditos Académicos",
                      }[lang],
                    },
                  ].map((s) => (
                    <Grid item xs={12} sm={6} md={3} key={s.label}>
                      <Card
                        sx={{
                          p: 3,
                          height: "100%",
                          textAlign: "center",
                          background: `linear-gradient(135deg,${alpha(ACCENT, 0.03)},${alpha(ACCENT2, 0.07)})`,
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: "'Playfair Display',serif",
                            fontSize: "3rem",
                            fontWeight: 800,
                            color: ACCENT,
                            lineHeight: 1,
                          }}
                        >
                          {s.value}
                        </Typography>
                        <Typography
                          sx={{
                            color: "text.secondary",
                            fontSize: "0.85rem",
                            mt: 0.5,
                          }}
                        >
                          {s.sub}
                        </Typography>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Container>
            </Box>

            {/* ── SKILLS ─────────────────────────────────────────────────────── */}
            <Box id="skills" sx={{ ...sectionSx, ...altBg }}>
              <Container maxWidth="lg">
                <SectionTitle>{t.skills.title}</SectionTitle>
                <Stack spacing={3}>
                  {skillsData.map((cat) => (
                    <Card key={cat.category} sx={{ p: 3, height: "100%" }}>
                      <Typography
                        sx={{
                          fontFamily: "'DM Mono',monospace",
                          fontSize: "0.7rem",
                          letterSpacing: 2,
                          color: GOLD,
                          textTransform: "uppercase",
                          mb: 1.5,
                        }}
                      >
                        {cat.category}
                      </Typography>
                      <Stack direction="row" flexWrap="wrap" gap={1}>
                        {cat.items.map((item) => (
                          <TechChip key={item} label={item} />
                        ))}
                      </Stack>
                    </Card>
                  ))}
                </Stack>
              </Container>
            </Box>

            {/* ── EXPERIENCE ─────────────────────────────────────────────────── */}
            <Box id="experience" sx={{ ...sectionSx, bgcolor: "#fff" }}>
              <Container maxWidth="lg">
                <SectionTitle>{t.experience.title}</SectionTitle>
                <Stack spacing={3}>
                  {experienceData.map((exp, i) => (
                    <Card key={i} sx={{ p: 3, height: "100%" }}>
                      <Grid container spacing={2} alignItems="flex-start">
                        <Grid item xs={12} sm={3}>
                          <Typography
                            sx={{
                              fontFamily: "'DM Mono',monospace",
                              fontSize: "0.8rem",
                              color: GOLD,
                              fontWeight: 600,
                            }}
                          >
                            {exp.period[lang]}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "0.82rem",
                              color: "text.secondary",
                              mt: 0.5,
                            }}
                          >
                            {exp.location}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                          <Typography
                            variant="h6"
                            sx={{ color: ACCENT, fontSize: "1rem", mb: 0.5 }}
                          >
                            {exp.title[lang]}
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: 600,
                              color: "text.secondary",
                              fontSize: "0.9rem",
                              mb: 2,
                            }}
                          >
                            {exp.company}
                          </Typography>
                          <Stack spacing={1} sx={{ mb: 2 }}>
                            {exp.bullets[lang].map((b, idx) => (
                              <Box
                                key={idx}
                                sx={{
                                  display: "flex",
                                  gap: 1.5,
                                  alignItems: "flex-start",
                                }}
                              >
                                <Box
                                  sx={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: "50%",
                                    bgcolor: GOLD,
                                    mt: "7px",
                                    flexShrink: 0,
                                  }}
                                />
                                <Typography
                                  sx={{
                                    color: "text.secondary",
                                    lineHeight: 1.7,
                                    fontSize: "0.85rem",
                                  }}
                                >
                                  {b}
                                </Typography>
                              </Box>
                            ))}
                          </Stack>
                          <Stack direction="row" flexWrap="wrap" gap={0.8}>
                            {exp.tech.map((tech) => (
                              <TechChip key={tech} label={tech} />
                            ))}
                          </Stack>
                        </Grid>
                      </Grid>
                    </Card>
                  ))}
                </Stack>
              </Container>
            </Box>

            {/* ── PROJECTS ───────────────────────────────────────────────────── */}
            <Box id="projects" sx={{ ...sectionSx, ...altBg }}>
              <Container maxWidth="lg">
                <SectionTitle>{t.projects.title}</SectionTitle>
                <Stack spacing={3}>
                  {projectsData.map((proj, i) => (
                    <Card
                      key={i}
                      sx={{
                        p: 3,
                        height: "100%",
                        ...(proj.highlight && {
                          border: `1px solid ${alpha(GOLD, 0.4)}`,
                          background: `linear-gradient(135deg,#fff,${alpha(GOLD, 0.04)})`,
                        }),
                      }}
                    >
                      <Grid container spacing={2} alignItems="flex-start">
                        <Grid item xs={12} sm={3}>
                          <Typography
                            sx={{
                              fontFamily: "'DM Mono',monospace",
                              fontSize: "0.8rem",
                              color: GOLD,
                              fontWeight: 600,
                            }}
                          >
                            {proj.year || "2024"}
                          </Typography>
                          {proj.highlight && (
                            <Chip
                              label="Featured"
                              size="small"
                              sx={{
                                mt: 0.5,
                                bgcolor: alpha(GOLD, 0.15),
                                color: "#8B6914",
                                fontWeight: 700,
                              }}
                            />
                          )}
                        </Grid>
                        <Grid item xs={12} sm={9}>
                          <Typography
                            variant="h6"
                            sx={{ color: ACCENT, fontSize: "1rem", mb: 0.5 }}
                          >
                            {proj.name}
                          </Typography>
                          <Typography
                            sx={{
                              color: "text.secondary",
                              fontSize: "0.85rem",
                              lineHeight: 1.7,
                              mb: 1,
                            }}
                          >
                            {proj.desc[lang]}
                          </Typography>
                          <Stack
                            direction="row"
                            flexWrap="wrap"
                            gap={0.8}
                            sx={{ mb: 1.5 }}
                          >
                            {proj.tech.map((t) => (
                              <TechChip key={t} label={t} />
                            ))}
                          </Stack>
                          <Stack direction="row" spacing={1}>
                            {proj.url && (
                              <Button
                                size="small"
                                variant="contained"
                                href={proj.url}
                                target="_blank"
                                sx={{
                                  bgcolor: ACCENT,
                                  color: "#fff",
                                  borderRadius: 6,
                                  "&:hover": { bgcolor: ACCENT2 },
                                }}
                              >
                                {t.projects?.visit ?? "Visit"}
                              </Button>
                            )}
                            {proj.github && (
                              <Button
                                size="small"
                                variant="outlined"
                                href={proj.github}
                                target="_blank"
                                sx={{
                                  color: ACCENT,
                                  borderColor: alpha(ACCENT, 0.3),
                                  borderRadius: 6,
                                  "&:hover": { borderColor: ACCENT },
                                }}
                              >
                                GitHub
                              </Button>
                            )}
                          </Stack>
                        </Grid>
                      </Grid>
                    </Card>
                  ))}
                </Stack>
              </Container>
            </Box>

            {/* ── EDUCATION ──────────────────────────────────────────────────── */}
            <Box id="education" sx={{ ...sectionSx, bgcolor: "#fff" }}>
              <Container maxWidth="lg">
                <SectionTitle>{t.education.title}</SectionTitle>
                <Stack spacing={3}>
                  {educationData.map((edu, i) => (
                    <Card key={i} sx={{ p: 3, height: "100%" }}>
                      <Grid container spacing={2} alignItems="flex-start">
                        <Grid item xs={12} sm={3}>
                          <Typography
                            sx={{
                              fontFamily: "'DM Mono',monospace",
                              fontSize: "0.8rem",
                              color: GOLD,
                              fontWeight: 600,
                            }}
                          >
                            {edu.period[lang]}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "0.82rem",
                              color: "text.secondary",
                              mt: 0.5,
                            }}
                          >
                            {edu.location[lang]}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                          <Typography
                            variant="h6"
                            sx={{ color: ACCENT, fontSize: "1rem", mb: 0.5 }}
                          >
                            {edu.degree[lang]}
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: 600,
                              color: "text.secondary",
                              fontSize: "0.9rem",
                              mb: edu.detail[lang] ? 0.5 : 0,
                            }}
                          >
                            {edu.institution}
                          </Typography>
                          {edu.detail[lang] && (
                            <Typography
                              sx={{
                                color: "text.secondary",
                                fontSize: "0.85rem",
                                fontStyle: "italic",
                                mb: 0.5,
                              }}
                            >
                              {edu.detail[lang]}
                            </Typography>
                          )}
                          <Typography
                            sx={{
                              fontFamily: "'DM Mono',monospace",
                              fontSize: "0.75rem",
                              color: alpha(ACCENT, 0.6),
                            }}
                          >
                            {edu.meta}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Card>
                  ))}
                </Stack>
              </Container>
            </Box>

            {/* ── ARTICLES ───────────────────────────────────────────────────── */}
            <Box id="articles" sx={{ ...sectionSx, ...altBg }}>
              <Container maxWidth="lg">
                <SectionTitle>{t.articles.title}</SectionTitle>
                <Stack spacing={3}>
                  {articlesData.map((article, i) => (
                    <Card key={i} sx={{ p: 3, height: "100%" }}>
                      <Grid container spacing={2} alignItems="flex-start">
                        <Grid item xs={12} sm={3}>
                          <Typography
                            sx={{
                              fontFamily: "'DM Mono',monospace",
                              fontSize: "0.8rem",
                              color: GOLD,
                              fontWeight: 600,
                            }}
                          >
                            {article.date}
                          </Typography>
                          <Chip
                            label={article.tag}
                            size="small"
                            sx={{
                              mt: 0.5,
                              bgcolor: alpha(ACCENT, 0.07),
                              color: ACCENT,
                              fontFamily: "'DM Mono',monospace",
                              fontWeight: 600,
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={9}>
                          <Typography
                            variant="h6"
                            sx={{ color: ACCENT, fontSize: "1rem", mb: 0.5 }}
                          >
                            {article.title[lang]}
                          </Typography>
                          <Typography
                            sx={{
                              color: "text.secondary",
                              fontSize: "0.85rem",
                              lineHeight: 1.7,
                              mb: 1,
                            }}
                          >
                            {article.excerpt[lang]}
                          </Typography>
                          <Button
                            size="small"
                            variant="text"
                            href={article.url}
                            sx={{
                              color: GOLD,
                              fontWeight: 700,
                              p: 0,
                              "&:hover": {
                                bgcolor: "transparent",
                                color: ACCENT,
                              },
                            }}
                          >
                            {t.articles.readMore} →
                          </Button>
                        </Grid>
                      </Grid>
                    </Card>
                  ))}
                </Stack>
              </Container>
            </Box>

            {/* ── CONTACT ────────────────────────────────────────────────────── */}
            <Box
              id="contact"
              sx={{
                py: { xs: 8, md: 12 },
                background: `linear-gradient(135deg,${ACCENT} 0%,${ACCENT2} 60%,#1a3a5c 100%)`,
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `radial-gradient(ellipse at bottom,${alpha(GOLD, 0.12)},transparent 70%)`,
                  pointerEvents: "none",
                }}
              />
              <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
                <Typography
                  variant="h2"
                  sx={{
                    color: "#fff",
                    fontSize: { xs: "2rem", md: "3rem" },
                    mb: 2,
                  }}
                >
                  {t.contact.title}
                </Typography>
                <Typography
                  sx={{ color: alpha("#fff", 0.7), fontSize: "1.05rem", mb: 5 }}
                >
                  {t.contact.subtitle}
                </Typography>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  justifyContent="center"
                >
                  <Button
                    variant="contained"
                    href="mailto:maxchip@outlook.com"
                    sx={{
                      bgcolor: GOLD,
                      color: "#1A1A2E",
                      fontWeight: 700,
                      borderRadius: 8,
                      px: 4,
                      py: 1.4,
                      "&:hover": { bgcolor: "#d4b05a" },
                    }}
                  >
                    {t.contact.email}
                  </Button>
                  <Button
                    variant="outlined"
                    href="https://www.razec.pt"
                    target="_blank"
                    sx={{
                      color: "#fff",
                      borderColor: alpha("#fff", 0.4),
                      borderRadius: 8,
                      px: 4,
                      py: 1.4,
                      "&:hover": {
                        borderColor: "#fff",
                        bgcolor: alpha("#fff", 0.08),
                      },
                    }}
                  >
                    {t.contact.website}
                  </Button>
                </Stack>
                <Typography
                  sx={{
                    color: alpha("#fff", 0.4),
                    fontSize: "0.8rem",
                    mt: 6,
                    fontFamily: "'DM Mono',monospace",
                  }}
                >
                  Portimão, Portugal · maxchip@outlook.com · +351 916 095 144
                </Typography>
              </Container>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
