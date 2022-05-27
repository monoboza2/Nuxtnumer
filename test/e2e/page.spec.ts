import { test, expect} from '@playwright/test'

test('home', async ({ page}) => {
  await page.goto("http://localhost:3000/") // <-- Nuxt app is running and route '/' is showing.

  // Step 1 - Is Homepage working
  await expect(page.locator('h1').locator('text=Nuxt_Numer')).toBeVisible()
})

test('Bisection', async ({ page}) => {
  await page.goto("http://localhost:3000/Root/Bisection") // <-- Nuxt app is running and route '/' is showing.
  // await page.fill("Input(fx)","x^4*12")
  await expect(page.locator('h1').locator('text=Chart')).toBeVisible()
})
test('False', async ({ page}) => {
  await page.goto("http://localhost:3000/Root/False-Position") // <-- Nuxt app is running and route '/' is showing.

  await expect(page.locator('h1').locator('text=Chart')).toBeVisible()
})

test('Onepoint', async ({ page}) => {
  await page.goto("http://localhost:3000/Root/One-Point") // <-- Nuxt app is running and route '/' is showing.

  await expect(page.locator('h1').locator('text=Chart')).toBeVisible()
})
test('Newton', async ({ page}) => {
  await page.goto("http://localhost:3000/Root/Newton Raphson") // <-- Nuxt app is running and route '/' is showing.

  await expect(page.locator('h1').locator('text=Chart')).toBeVisible()
})




