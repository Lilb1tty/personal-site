import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import userEvent from '@testing-library/user-event'
import App from './App'

test('presents the engineering portfolio identity and selected work', () => {
  render(<App />)

  expect(screen.getByRole('heading', { name: 'Owen Zou' })).toBeInTheDocument()
  expect(screen.getByText('Backend / Full-stack Engineer')).toBeInTheDocument()
  expect(screen.getAllByText('Billing Generation & Management')).toHaveLength(2)
  expect(screen.getAllByText('Load Forecasting & Weight Balance')).toHaveLength(2)
  expect(screen.getAllByText('Booking & Settlement System')).toHaveLength(2)
  expect(screen.getByText(/DIAMANT and DOCUWARE/)).toBeInTheDocument()
  expect(screen.getByText(/300 seconds/)).toBeInTheDocument()
  expect(screen.getByText('12 sprints')).toBeInTheDocument()
  expect(screen.getByText(/Ordered Kafka manifest processing/)).toBeInTheDocument()
  expect(screen.getByText(/data-isolated global roles/)).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'A pull request can become a safe, reviewable environment.' })).toBeInTheDocument()
  expect(screen.getByText(/Each pull request receives an isolated frontend and backend preview/)).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: /Have an opportunity in mind/ })).toBeInTheDocument()
})

test('switches the visible portfolio content to Chinese', async () => {
  const user = userEvent.setup()
  render(<App />)

  await user.click(screen.getByRole('button', { name: '中文' }))

  expect(screen.getByRole('heading', { name: '邹博文' })).toBeInTheDocument()
  expect(screen.getAllByText('精选项目')).toHaveLength(2)
  expect(screen.getByText('后端 / 全栈工程师')).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: '一个拉取请求即可成为安全、可评审的独立环境。' })).toBeInTheDocument()
  expect(screen.getByText(/每个拉取请求均拥有独立的前后端预览环境/)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: '切换至浅色模式' })).toBeInTheDocument()
})

test('removes transform-heavy motion when reduced motion is preferred', () => {
  render(<App reducedMotion />)

  expect(screen.getByRole('heading', { name: 'Owen Zou' })).not.toHaveStyle({ transform: 'translateY(28px)' })
})

test('lets visitors manually switch themes', async () => {
  const user = userEvent.setup()
  render(<App />)

  await user.click(screen.getByRole('button', { name: 'Switch to light theme' }))

  expect(document.documentElement).not.toHaveClass('dark')
})
