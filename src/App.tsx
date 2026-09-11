import { motion, MotionConfig, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { ArrowUpRight, Mail } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { MouseEvent, ReactNode } from 'react'
import { Button } from '@/components/ui/button'

const profileLinks = {
  email: 'mailto:owen@lil-bitty.com',
  linkedin: 'https://www.linkedin.com/in/owen-zou/',
  github: 'https://github.com/Lilb1tty',
}

function MagneticAction({ children, reducedMotion }: { children: ReactNode; reducedMotion: boolean }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 280, damping: 18 })
  const springY = useSpring(y, { stiffness: 280, damping: 18 })

  const handlePointerMove = (event: MouseEvent<HTMLSpanElement>) => {
    if (reducedMotion) return
    const bounds = event.currentTarget.getBoundingClientRect()
    x.set((event.clientX - bounds.left - bounds.width / 2) * 0.14)
    y.set((event.clientY - bounds.top - bounds.height / 2) * 0.14)
  }

  const resetPosition = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.span className="magnetic-action" style={{ x: springX, y: springY }} onMouseMove={handlePointerMove} onMouseLeave={resetPosition} whileTap={reducedMotion ? undefined : { scale: 0.97 }}>
      {children}
    </motion.span>
  )
}

const projects = {
  en: [
  {
    title: 'CHI Billing Generation & Management System',
    client: 'CHI Cargo, Germany',
    summary:
      'Owned approximately 80% of delivery for an air-cargo billing platform, including DIAMANT and DOCUWARE integrations for automated audit workflows.',
    outcomes: ['Billing processing: 1 hour to 5 minutes', 'Key API response: 7 seconds to 20 milliseconds'],
    stack: 'Spring Boot · Spring Security · MySQL · Redis · RabbitMQ · MinIO · XXL-JOB',
  },
  {
    title: 'Load Forecasting & Pre-Load Weight & Balance System',
    client: 'Aviation enterprise',
    summary:
      'Delivered backend work and Vue 3 frontend adjustments for a 10+ module aircraft weight and balance calculation platform.',
    outcomes: ['Average 300-second blocking computation moved to asynchronous SSE delivery', 'Backend delivery plus Vue 3 adjustments'],
    stack: 'Spring Boot · Spring Security · PostgreSQL · Redis · MyBatis-Plus · MapStruct · Spring Retry · Vue 3',
  },
  {
    title: 'Tanzania Booking & Settlement System',
    client: 'Air Tanzania',
    summary:
      'Owned approximately 70% of delivery for an international airline booking and settlement system, including core booking and settlement capabilities.',
    outcomes: ['12 Sprints delivered end to end', 'Ordered Kafka processing for flight manifest messages', 'FX conversion with historical version traceability', 'Data-isolated global roles across 3 airlines and 100+ stations'],
    stack: 'Spring Boot · Spring Security · MySQL · Redis · Kafka · Elasticsearch · XXL-JOB',
  },
  ],
  zh: [
    {
      title: 'CHI 账单生成与管理系统', client: '德国 CHI Cargo',
      summary: '负责约 80% 的功能交付，覆盖航空货运账单平台的数据导入、人工复核与自动分发流程，并深度对接 DIAMANT 与 DOCUWARE 实现审计自动化。',
      outcomes: ['批量账单处理从 1 小时缩短至 5 分钟', '核心 API 响应从 7 秒缩短至 20 毫秒'],
      stack: 'Spring Boot · Spring Security · MySQL · Redis · RabbitMQ · MinIO · XXL-JOB',
    },
    {
      title: '载重预测与预配载平衡系统', client: '航空企业',
      summary: '交付飞机载重平衡平台后端，并独立完成 Vue 3 前端调整，覆盖 10 多个业务模块。',
      outcomes: ['将平均 300 秒的阻塞计算改为异步 SSE 结果推送', '完成后端交付与 Vue 3 调整'],
      stack: 'Spring Boot · Spring Security · PostgreSQL · Redis · MyBatis-Plus · MapStruct · Spring Retry · Vue 3',
    },
    {
      title: '坦桑尼亚航空订舱与结算系统', client: '坦桑尼亚航空',
      summary: '负责约 70% 的功能交付，完成国际航空业务系统的订舱与结算核心能力，并推动 Sprint 执行。',
      outcomes: ['端到端交付 12 个 Sprint', '实现航班舱单消息的 Kafka 有序消费', '支持外汇换算及历史版本可追溯', '为 3 家航空公司、100 多个站点提供数据隔离的全球角色体系'],
      stack: 'Spring Boot · Spring Security · MySQL · Redis · Kafka · Elasticsearch · XXL-JOB',
    },
  ],
}

const copy = {
  en: {
    name: 'Owen Zou', role: 'Java Developer', navigation: ['Work', 'Experience', 'Skills', 'Contact'], workLabel: 'SELECTED WORK', workTitle: 'Systems built for operations that cannot pause.',
    masthead: 'Backend-focused Java developer. Independent delivery from requirements through production, with Vue 3 frontend capability.', email: 'Email Owen', experienceLabel: 'EXPERIENCE', experienceTitle: 'iTran Systems', roleLine: 'Backend Developer / 2025.08-2026.08',
    experienceOne: 'Delivered aviation logistics systems, independently handled CI/CD and production releases, and led English-language customer meetings, demonstrations, and training.', experienceTwo: 'Standardized team practices for Git branching, TDD, and AI-assisted delivery while improving performance and message reliability in production.',
    skillsLabel: 'TECHNICAL SKILLS', skillsTitle: 'Backend depth with end-to-end delivery range.', skillGroups: ['Java Backend', 'Data and Messaging', 'Delivery', 'AI-Assisted Development'], contactLabel: 'CONTACT', contactTitle: "Let's discuss the systems you need to ship.", language: '中文', themeDark: 'Dark', themeLight: 'Light', switchToDark: 'Switch to dark theme', switchToLight: 'Switch to light theme',
  },
  zh: {
    name: '邹博文', role: 'Java 开发工程师', navigation: ['项目', '经历', '技能', '联系'], workLabel: '精选项目', workTitle: '为不能停摆的业务系统打造可靠交付。',
    masthead: '以后端为核心的 Java 开发工程师，具备从需求到生产发布的独立交付能力，也可完成 Vue 3 前端调整。', email: '发送邮件', experienceLabel: '工作经历', experienceTitle: 'iTran Systems', roleLine: '后端开发工程师 / 2025.08-2026.08',
    experienceOne: '参与航空物流系统交付，独立处理 CI/CD、生产发布，并主持英文客户会议、演示和培训。', experienceTwo: '推动 Git 分支、TDD 与 AI 辅助研发规范，持续改善生产环境中的性能与消息可靠性。',
    skillsLabel: '技术能力', skillsTitle: '扎实后端深度，覆盖端到端交付。', skillGroups: ['Java 后端', '数据与消息', '交付能力', 'AI 辅助研发'], contactLabel: '联系我', contactTitle: '期待与你讨论下一个需要可靠交付的系统。', language: 'EN', themeDark: '深色', themeLight: '浅色', switchToDark: '切换至深色模式', switchToLight: '切换至浅色模式',
  },
}

function App({ reducedMotion = false }: { reducedMotion?: boolean }) {
  const [language, setLanguage] = useState<'en' | 'zh'>('en')
  const [dark, setDark] = useState(() => window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false)
  const prefersReducedMotion = useReducedMotion()
  const reduceMotion = reducedMotion || prefersReducedMotion
  const t = copy[language]
  const localizedProjects = projects[language]
  const translate = (amount: number) => (reduceMotion ? 0 : amount)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return (
    <MotionConfig reducedMotion={reducedMotion ? "always" : "user"}>
    <main>
      <nav className="nav-shell" aria-label="Primary navigation">
        <a className="wordmark" href="#top">OZ</a>
        <div className="nav-links">
          <a href="#work">{t.navigation[0]}</a>
          <a href="#experience">{t.navigation[1]}</a>
          <a href="#skills">{t.navigation[2]}</a>
          <a href="#contact">{t.navigation[3]}</a>
          <button className="language-toggle" type="button" onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}>{t.language}</button>
          <button className="theme-toggle" type="button" aria-label={dark ? t.switchToLight : t.switchToDark} onClick={() => setDark(!dark)}>{dark ? t.themeLight : t.themeDark}</button>
        </div>
      </nav>

      <section id="top" className="masthead section-shell">
        <motion.p className="mono-label" initial={{ opacity: 0, y: translate(16) }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
          {t.name} / {t.role}
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: translate(28) }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
          {t.name}
        </motion.h1>
        <motion.p className="masthead-copy" initial={{ opacity: 0, y: translate(20) }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
          {t.masthead}
        </motion.p>
        <motion.div className="masthead-actions" initial={{ opacity: 0, y: translate(18) }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
          <MagneticAction reducedMotion={Boolean(reduceMotion)}><Button asChild size="lg"><a href={profileLinks.email}><Mail /> {t.email}</a></Button></MagneticAction>
          <MagneticAction reducedMotion={Boolean(reduceMotion)}><Button asChild size="lg" variant="outline"><a href={profileLinks.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight /></a></Button></MagneticAction>
          <MagneticAction reducedMotion={Boolean(reduceMotion)}><Button asChild size="lg" variant="outline"><a href={profileLinks.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight /></a></Button></MagneticAction>
        </motion.div>
      </section>

      <section id="work" className="section-shell work-section" aria-labelledby="work-heading">
        <div className="section-intro"><p className="mono-label">{t.workLabel}</p><h2 id="work-heading">{t.workTitle}</h2></div>
        <div className="project-list">
          {localizedProjects.map((project, index) => (
            <motion.article className="project" key={project.title} initial={{ opacity: 0, y: translate(32) }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ delay: index * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
              <div className="project-index">0{index + 1}</div>
              <div className="project-copy"><p className="project-client">{project.client}</p><h3>{project.title}</h3><p>{project.summary}</p></div>
              <div className="project-proof"><ul>{project.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul><p className="stack">{project.stack}</p></div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="experience" className="section-shell split-section" aria-labelledby="experience-heading">
        <div><p className="mono-label">{t.experienceLabel}</p><h2 id="experience-heading">{t.experienceTitle}</h2></div>
        <div className="prose-block"><p className="role-line">{t.roleLine}</p><p>{t.experienceOne}</p><p>{t.experienceTwo}</p></div>
      </section>

      <section id="skills" className="section-shell skills-section" aria-labelledby="skills-heading">
        <div className="section-intro"><p className="mono-label">{t.skillsLabel}</p><h2 id="skills-heading">{t.skillsTitle}</h2></div>
        <div className="skills-grid">
          <div><h3>{t.skillGroups[0]}</h3><p>Spring Boot, Spring Security, Spring Cloud Alibaba, MyBatis-Plus, MapStruct, XXL-JOB</p></div>
          <div><h3>{t.skillGroups[1]}</h3><p>MySQL, PostgreSQL, Redis, Kafka, RabbitMQ, Elasticsearch, MinIO</p></div>
          <div><h3>{t.skillGroups[2]}</h3><p>Docker, CI/CD, Nginx, Caddy, Playwright, Scrum, Axure RP</p></div>
          <div><h3>{t.skillGroups[3]}</h3><p>Codex, Claude Code, MCP, Agent Skills, Session Hooks, TDD gates</p></div>
        </div>
      </section>

      <section id="contact" className="contact-section section-shell" aria-labelledby="contact-heading">
        <p className="mono-label">{t.contactLabel}</p><h2 id="contact-heading">{t.contactTitle}</h2>
        <div className="contact-links"><MagneticAction reducedMotion={Boolean(reduceMotion)}><a href={profileLinks.email}>owen@lil-bitty.com <ArrowUpRight /></a></MagneticAction><MagneticAction reducedMotion={Boolean(reduceMotion)}><a href={profileLinks.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight /></a></MagneticAction></div>
      </section>
    </main>
    </MotionConfig>
  )
}

export default App
