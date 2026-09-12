import { motion, MotionConfig, useReducedMotion } from 'motion/react'
import { ArrowDownRight, ArrowUpRight, Mail, Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

const profileLinks = {
  email: 'mailto:owen@lil-bitty.com',
  linkedin: 'https://www.linkedin.com/in/owen-zou/',
  github: 'https://github.com/Lilb1tty',
}

type Language = 'en' | 'zh'

const projects = {
  en: [
    {
      id: 'chi', number: '01', client: 'CHI Cargo · Germany', title: 'Billing Generation & Management',
      summary: 'An air-cargo billing platform built around faster processing, reliable audit workflows, and production delivery.', metric: '1 hour → 5 min', metricLabel: 'batch billing processing',
      outcomes: ['~80% of features delivered', 'Key API: 7 sec → 20 ms'], stack: 'Java · Spring Boot · MySQL · Redis · RabbitMQ · Docker',
      detail: { context: 'Air-cargo billing depends on accurate, traceable workflows across financial and document systems.', challenge: 'Batch processing was slow and audit steps crossed DIAMANT and DOCUWARE integrations.', solution: 'Owned the core delivery, shaped the billing flow, and integrated automated audit handoffs around the production system.', result: 'Reduced billing processing from one hour to five minutes and improved a key API from seven seconds to twenty milliseconds.' },
    },
    {
      id: 'balance', number: '02', client: 'Aviation enterprise', title: 'Load Forecasting & Weight Balance',
      summary: 'A 10+ module aircraft planning platform covering calculation-heavy operational workflows.', metric: '300 sec → async', metricLabel: 'blocking calculation flow',
      outcomes: ['10+ modules delivered', 'Backend + Vue 3 delivery'], stack: 'Java · Spring Boot · PostgreSQL · Redis · SSE · Vue 3',
      detail: { context: 'Aircraft weight and balance work requires operational accuracy across a broad workflow, not a single screen.', challenge: 'A calculation path blocked users for about 300 seconds and made the operational flow hard to use.', solution: 'Delivered backend services and Vue 3 adjustments, replacing the blocking path with asynchronous processing and SSE result delivery.', result: 'The calculation became an observable asynchronous workflow rather than a long blocking request.' },
    },
    {
      id: 'tanzania', number: '03', client: 'Air Tanzania', title: 'Booking & Settlement System',
      summary: 'An international airline system spanning booking, settlement, manifest processing, and data-isolated operations.', metric: '12 sprints', metricLabel: 'delivered end to end',
      outcomes: ['Ordered Kafka manifest processing', '3 airlines · 100+ stations'], stack: 'Java · Spring Boot · MySQL · Kafka · Elasticsearch · Docker',
      detail: { context: 'The system served airline booking and settlement operations across multiple organizations and stations.', challenge: 'The platform needed reliable message ordering, historical FX traceability, and strong data separation.', solution: 'Owned around 70% of delivery, ran 12 sprints, and implemented ordered Kafka processing, versioned FX conversion, and data-isolated global roles.', result: 'A production system that supports operations for three airlines and more than one hundred stations.' },
    },
  ],
  zh: [
    {
      id: 'chi', number: '01', client: 'CHI Cargo · 德国', title: '账单生成与管理系统',
      summary: '面向航空货运的账单平台，聚焦更快的批处理、可靠的审计流转和生产环境交付。', metric: '1 小时 → 5 分钟', metricLabel: '批量账单处理',
      outcomes: ['交付约 80% 功能', '核心 API：7 秒 → 20 毫秒'], stack: 'Java · Spring Boot · MySQL · Redis · RabbitMQ · Docker',
      detail: { context: '航空货运账单需要在财务与文档系统之间实现准确、可追溯的协作流程。', challenge: '批量处理耗时较长，审计步骤还涉及 DIAMANT 与 DOCUWARE 集成。', solution: '负责核心功能交付，设计账单流程，并完成围绕生产系统的自动审计衔接。', result: '将账单处理从 1 小时降至 5 分钟，核心 API 从 7 秒优化至 20 毫秒。' },
    },
    {
      id: 'balance', number: '02', client: '航空企业', title: '载重预测与预配载平衡系统',
      summary: '覆盖 10 多个业务模块的飞机规划平台，包含高计算量的运营流程。', metric: '300 秒 → 异步', metricLabel: '阻塞式计算流程',
      outcomes: ['交付 10+ 个模块', '后端 + Vue 3 交付'], stack: 'Java · Spring Boot · PostgreSQL · Redis · SSE · Vue 3',
      detail: { context: '飞机载重平衡业务需要在复杂的业务流程中保持计算准确性。', challenge: '一条计算路径平均阻塞约 300 秒，影响运营人员使用。', solution: '交付后端服务和 Vue 3 调整，将阻塞式流程替换为异步处理和 SSE 结果推送。', result: '计算过程成为可观察的异步工作流，不再需要长时间等待请求完成。' },
    },
    {
      id: 'tanzania', number: '03', client: '坦桑尼亚航空', title: '订舱与结算系统',
      summary: '覆盖订舱、结算、舱单处理和数据隔离运营的国际航空业务系统。', metric: '12 个 Sprint', metricLabel: '端到端交付',
      outcomes: ['Kafka 舱单消息有序消费', '3 家航空公司 · 100+ 站点'], stack: 'Java · Spring Boot · MySQL · Kafka · Elasticsearch · Docker',
      detail: { context: '该系统服务于多家航空公司和多个站点的订舱与结算运营。', challenge: '平台需要可靠消息顺序、历史汇率可追溯和严格的数据隔离。', solution: '负责约 70% 的交付并推进 12 个 Sprint，实现 Kafka 有序消费、版本化汇率换算和数据隔离的全球角色体系。', result: '系统支撑 3 家航空公司和 100 多个站点的业务运营。' },
    },
  ],
} as const

const copy = {
  en: {
    name: 'Owen Zou', role: 'Backend / Full-stack Engineer', nav: ['Work', 'Experience', 'Lab', 'Contact'], hero: 'Building production systems for logistics, aviation, and AI-assisted workflows.', heroStack: 'Java · Spring Boot · Vue · Docker',
    workLabel: 'Selected work', workTitle: 'Systems built for operations that cannot pause.', workLead: 'Production software where business workflow, performance, and delivery all matter.', viewCase: 'Read case study',
    processTitle: 'From requirements to production.', processLead: 'I work across the engineering loop, including the conversations and operational details that make software useful.',
    process: [['Understand', 'Requirements, business workflows, edge cases'], ['Design', 'Architecture, schemas, API contracts'], ['Build', 'Java services, integrations, frontend delivery'], ['Test', 'Unit tests, integration checks, code review'], ['Deploy', 'Docker, CI/CD, reverse proxy'], ['Observe', 'Logs, production debugging, iteration']],
    experienceLabel: 'Experience', experienceTitle: 'International software delivery, end to end.', roleLine: 'iTran Systems · Backend Developer · 2025.08–2026.08', experience: ['Delivered aviation logistics systems and production releases independently.', 'Led English-language customer meetings, demos, and training.', 'Improved team practice around Git workflows, TDD, and AI-assisted delivery.'],
    skillsTitle: 'Engineering depth, organized by the work it supports.', stackGroups: [['Primary', 'Java · Spring Boot · Spring Security · Spring Cloud'], ['Data', 'MySQL · PostgreSQL · Redis · Elasticsearch'], ['Messaging', 'Kafka · RabbitMQ · SSE · WebSocket'], ['Infrastructure', 'Docker · Linux · Nginx · CI/CD'], ['Frontend', 'Vue 3 · TypeScript · REST APIs'], ['AI development', 'Codex · Claude Code · MCP · Agent Skills']],
    proofLabel: 'OneDev CI/CD & live preview', proofTitle: 'A pull request can become a safe, reviewable environment.', proofSteps: ['Branch-aware builds use lockfiles and verified caches.', 'Backend tests pass before Docker deployment.', 'Each pull request receives an isolated frontend and backend preview.', 'Preview links are published, then removed after merge or discard.'],
    labTitle: 'Engineering Lab', labLead: 'Small experiments that keep implementation instincts sharp.', lab: [['Distributed locking', 'Redis coordination patterns'], ['Message flow', 'RabbitMQ and Kafka delivery paths'], ['Realtime systems', 'WebSocket and SSE prototypes'], ['AI workflow', 'Agent-assisted development practices']],
    aboutTitle: 'Backend-focused. Delivery-minded.', about: 'I enjoy turning complex business workflows into maintainable production systems. Current interests include distributed systems, developer tooling, DevOps, and AI-assisted development.', contactTitle: 'Have an opportunity in mind?', contactLead: 'Let’s talk.', email: 'Email Owen', language: '中文', themeLight: 'Light theme', themeDark: 'Dark theme', switchToDark: 'Switch to dark theme', switchToLight: 'Switch to light theme', caseLabel: 'Case study', context: 'Context', challenge: 'Technical challenge', solution: 'Approach', result: 'Result',
  },
  zh: {
    name: '邹博文', role: '后端 / 全栈工程师', nav: ['项目', '经历', '实验室', '联系'], hero: '为物流、航空和 AI 辅助工作流构建可上线的生产系统。', heroStack: 'Java · Spring Boot · Vue · Docker',
    workLabel: '精选项目', workTitle: '为不能停摆的业务系统打造可靠交付。', workLead: '生产软件不仅需要代码，也需要理解业务流程、性能和交付。', viewCase: '查看案例',
    processTitle: '从需求到生产环境。', processLead: '我覆盖完整的工程闭环，也重视让软件真正可用的沟通与运营细节。', process: [['理解', '需求、业务流程与边界情况'], ['设计', '架构、数据模型与 API 契约'], ['构建', 'Java 服务、系统集成与前端交付'], ['测试', '单元测试、集成检查与代码评审'], ['部署', 'Docker、CI/CD 与反向代理'], ['观察', '日志、生产排障与持续迭代']],
    experienceLabel: '工作经历', experienceTitle: '面向国际客户的端到端软件交付。', roleLine: 'iTran Systems · 后端开发工程师 · 2025.08–2026.08', experience: ['独立交付航空物流系统及生产发布。', '主持英文客户会议、演示和培训。', '推进 Git 工作流、TDD 与 AI 辅助研发实践。'],
    skillsTitle: '按实际工程工作组织的技术深度。', stackGroups: [['核心能力', 'Java · Spring Boot · Spring Security · Spring Cloud'], ['数据', 'MySQL · PostgreSQL · Redis · Elasticsearch'], ['消息', 'Kafka · RabbitMQ · SSE · WebSocket'], ['基础设施', 'Docker · Linux · Nginx · CI/CD'], ['前端', 'Vue 3 · TypeScript · REST APIs'], ['AI 开发', 'Codex · Claude Code · MCP · Agent Skills']],
    proofLabel: 'OneDev CI/CD 与实时预览', proofTitle: '一个拉取请求即可成为安全、可评审的独立环境。', proofSteps: ['按分支构建使用锁定文件和已验证的缓存。', '后端测试通过后，才会部署 Docker 镜像。', '每个拉取请求均拥有独立的前后端预览环境。', '预览链接会发布出来，并在合并或废弃后清理。'],
    labTitle: '工程实验室', labLead: '用于持续磨练实现直觉的小型技术实验。', lab: [['分布式锁', 'Redis 协调模式'], ['消息流', 'RabbitMQ 与 Kafka 的交付路径'], ['实时系统', 'WebSocket 与 SSE 原型'], ['AI 工作流', 'Agent 辅助研发实践']],
    aboutTitle: '专注后端，也关注交付。', about: '我喜欢将复杂业务流程转化为可维护的生产系统。目前关注分布式系统、开发者工具、DevOps 和 AI 辅助开发。', contactTitle: '有合适的机会吗？', contactLead: '欢迎联系。', email: '发送邮件', language: 'EN', themeLight: '浅色主题', themeDark: '深色主题', switchToDark: '切换至深色模式', switchToLight: '切换至浅色模式', caseLabel: '项目案例', context: '背景', challenge: '技术挑战', solution: '解决方案', result: '结果',
  },
} as const

function SectionReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const reducedMotion = useReducedMotion()
  return <motion.div className={className} initial={reducedMotion ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.16 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>{children}</motion.div>
}

function App({ reducedMotion = false }: { reducedMotion?: boolean }) {
  const [language, setLanguage] = useState<Language>('en')
  const [dark, setDark] = useState(() => window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? true)
  const t = copy[language]
  const selectedProjects = projects[language]

  useEffect(() => { document.documentElement.classList.toggle('dark', dark) }, [dark])

  return (
    <MotionConfig reducedMotion={reducedMotion ? 'always' : 'user'}>
      <main>
        <nav className="nav-shell" aria-label="Primary navigation">
          <a className="wordmark" href="#top" aria-label="Owen Zou, top of page">OZ<span>.</span></a>
          <div className="nav-links"><a href="#work">{t.nav[0]}</a><a href="#experience">{t.nav[1]}</a><a href="#lab">{t.nav[2]}</a><a href="#contact">{t.nav[3]}</a></div>
          <div className="nav-actions"><button className="nav-button" type="button" onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}>{t.language}</button><button className="theme-button" type="button" aria-label={dark ? t.switchToLight : t.switchToDark} onClick={() => setDark(!dark)}>{dark ? <Sun size={16} /> : <Moon size={16} />}<span>{dark ? t.themeLight : t.themeDark}</span></button></div>
        </nav>

        <section id="top" className="hero page-shell" aria-labelledby="hero-name">
          <motion.p className="role-kicker" initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>{t.role}</motion.p>
          <motion.h1 id="hero-name" initial={{ opacity: 0, y: reducedMotion ? 0 : 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}>{t.name}</motion.h1>
          <motion.p className="hero-statement" initial={{ opacity: 0, y: reducedMotion ? 0 : 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}>{t.hero}</motion.p>
          <motion.div className="hero-footer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25, duration: 0.5 }}><p>{t.heroStack}</p><a className="arrow-link" href="#work">{t.workLabel}<ArrowDownRight /></a></motion.div>
        </section>

        <section id="work" className="work-section page-shell" aria-labelledby="work-heading">
          <SectionReveal className="section-heading"><p className="eyebrow">{t.workLabel}</p><h2 id="work-heading">{t.workTitle}</h2><p>{t.workLead}</p></SectionReveal>
          <div className="project-grid">{selectedProjects.map((project, index) => <SectionReveal className={`project project-${index + 1}`} key={project.id}><div className="project-meta"><span>{project.number}</span><span>{project.client}</span></div><div className="project-main"><h3>{project.title}</h3><p>{project.summary}</p><a className="text-link" href={`#case-${project.id}`}>{t.viewCase}<ArrowUpRight /></a></div><div className="project-evidence"><strong>{project.metric}</strong><span>{project.metricLabel}</span><ul>{project.outcomes.map(outcome => <li key={outcome}>{outcome}</li>)}</ul><p>{project.stack}</p></div></SectionReveal>)}</div>
          <div className="case-studies">{selectedProjects.map(project => <article id={`case-${project.id}`} className="case-study" key={project.id}><p className="case-number">{project.number} / {t.caseLabel}</p><h3>{project.title}</h3><div className="case-study-grid"><div><h4>{t.context}</h4><p>{project.detail.context}</p></div><div><h4>{t.challenge}</h4><p>{project.detail.challenge}</p></div><div><h4>{t.solution}</h4><p>{project.detail.solution}</p></div><div><h4>{t.result}</h4><p>{project.detail.result}</p></div></div></article>)}</div>
        </section>

        <section className="process-section" aria-labelledby="process-heading"><SectionReveal className="page-shell"><div className="process-heading"><h2 id="process-heading">{t.processTitle}</h2><p>{t.processLead}</p></div><ol className="process-list">{t.process.map(([title, detail], index) => <li key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{detail}</p></li>)}</ol></SectionReveal></section>
        <section id="experience" className="experience-section page-shell" aria-labelledby="experience-heading"><SectionReveal><p className="eyebrow">{t.experienceLabel}</p><div className="experience-layout"><div><h2 id="experience-heading">{t.experienceTitle}</h2><p className="role-line">{t.roleLine}</p></div><ul>{t.experience.map(item => <li key={item}>{item}</li>)}</ul></div></SectionReveal></section>
        <section className="skills-section page-shell" aria-labelledby="skills-heading"><SectionReveal><h2 id="skills-heading">{t.skillsTitle}</h2><div className="stack-grid">{t.stackGroups.map(([title, detail]) => <div key={title}><h3>{title}</h3><p>{detail}</p></div>)}</div><article className="delivery-proof"><div><p className="eyebrow">{t.proofLabel}</p><h3>{t.proofTitle}</h3></div><ol>{t.proofSteps.map((step, index) => <li key={step}><span>0{index + 1}</span><p>{step}</p></li>)}</ol></article></SectionReveal></section>
        <section id="lab" className="lab-section page-shell" aria-labelledby="lab-heading"><SectionReveal><div className="section-heading compact"><h2 id="lab-heading">{t.labTitle}</h2><p>{t.labLead}</p></div><div className="lab-grid">{t.lab.map(([title, detail]) => <article key={title}><ArrowUpRight /><h3>{title}</h3><p>{detail}</p></article>)}</div></SectionReveal></section>
        <section className="about-section page-shell" aria-labelledby="about-heading"><SectionReveal><h2 id="about-heading">{t.aboutTitle}</h2><p>{t.about}</p></SectionReveal></section>
        <footer id="contact" className="contact-section" aria-labelledby="contact-heading"><SectionReveal className="page-shell"><p className="eyebrow">Contact</p><h2 id="contact-heading">{t.contactTitle}<br /><span>{t.contactLead}</span></h2><div className="contact-links"><a href={profileLinks.email}>{t.email}<Mail /></a><a href={profileLinks.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight /></a><a href={profileLinks.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight /></a></div><p className="footer-credit">© {new Date().getFullYear()} Owen Zou</p></SectionReveal></footer>
      </main>
    </MotionConfig>
  )
}

export default App
