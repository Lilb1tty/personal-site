import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import userEvent from '@testing-library/user-event'
import App from './App'

test('presents the English portfolio identity and all selected work', () => {
  render(<App />)

  expect(screen.getByRole('heading', { name: 'Owen Zou' })).toBeInTheDocument()
  expect(screen.getByText(/Java Developer/)).toBeInTheDocument()
  expect(screen.getByText('CHI Billing Generation & Management System')).toBeInTheDocument()
  expect(screen.getByText('Load Forecasting & Pre-Load Weight & Balance System')).toBeInTheDocument()
  expect(screen.getByText('Tanzania Booking & Settlement System')).toBeInTheDocument()
  expect(screen.getByText(/DIAMANT and DOCUWARE integrations/)).toBeInTheDocument()
  expect(screen.getByText(/Average 300-second blocking computation/)).toBeInTheDocument()
  expect(screen.getByText('12 Sprints delivered end to end')).toBeInTheDocument()
  expect(screen.getByText('Ordered Kafka processing for flight manifest messages')).toBeInTheDocument()
  expect(screen.getByText(/Data-isolated global roles/)).toBeInTheDocument()
})

test('switches the visible portfolio content to Chinese', async () => {
  const user = userEvent.setup()
  render(<App />)

  await user.click(screen.getByRole('button', { name: '中文' }))

  expect(screen.getByRole('heading', { name: '邹博文' })).toBeInTheDocument()
  expect(screen.getByText('精选项目')).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'Java 后端' })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: '切换至深色模式' })).toBeInTheDocument()
})

test('removes transform-heavy motion when reduced motion is preferred', () => {
  render(<App reducedMotion />)

  expect(screen.getByRole('heading', { name: 'Owen Zou' })).not.toHaveStyle({ transform: 'translateY(28px)' })
})

test('lets visitors manually switch to the dark theme', async () => {
  const user = userEvent.setup()
  render(<App />)

  await user.click(screen.getByRole('button', { name: 'Switch to dark theme' }))

  expect(document.documentElement).toHaveClass('dark')
})
