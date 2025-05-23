/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
const { test, describe, expect, beforeEach } = require('@playwright/test')

describe('Pokedex', () => {
  test('front page can be opened', async ({ page }) => {
    await page.goto('http://localhost:5000/')
    await expect(page.getByText('ivysaur')).toBeVisible()
    await expect(page.getByText('Pokémon and Pokémon character names are trademarks of Nintendo.')).toBeVisible()
  })
  test('pokemon page can be navigated to', async ({ page }) => {
    // Mở trang chính
    await page.goto('http://localhost:5000/')

    // Click vào hình ảnh hoặc liên kết của Pokémon "bulbasaur"
    await page.click('text=bulbasaur')

    // Kiểm tra nội dung trên trang chi tiết
    await expect(page.getByText('chlorophyll')).toBeVisible()
  })
})