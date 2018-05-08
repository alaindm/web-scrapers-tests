const puppeteer = require('puppeteer')
const getValidImovelID = require('../getValidImovelId')
const cheerioTest = require('../cheerio')
const jsdomTest = require('../jsdom')
const puppeteerFetch = require('../puppeteerFetch')
const puppeteerClick = require('../puppeteerClick')
const puppeteerClickMin = require('../puppeteerClickMin')

let id
beforeAll(async () => {
  id = await getValidImovelID()
})

describe('Using HTTP Client (Request)', () => {
  test('Cheerio', async () => {}, 5000)

  test('JSDOM', async () => {}, 5000)
})

describe('Using Headless Browser (Puppeteer)', () => {
  beforeAll(async () => {
    id = await getValidImovelID()
  })

  test(
    'Clicking. All Javascript executed. All resources downloaded.',
    async () => {},
    10000,
  )

  test(
    'Clicking. All Javascript executed. Minimal resources downloaded.',
    async () => {},
    10000,
  )

  test(
    'With fetch API. No Javascript executed. Minimal resources downloaded.',
    async () => {},
    10000,
  )

  afterAll(() => {
    // console.log results
  })
})

afterAll(() => {
  // console.log results
})
