const puppeteer = require('puppeteer')

async function getValidID() {
  let browser = await puppeteer.launch()
  let page = await browser.newPage()
  await page.goto('https://www.zapimoveis.com.br')
  await page.waitFor('#divVitrineSugestoes > li:nth-child(1) > figure > a')
  let strWithID = await page.$eval(
    '#divVitrineSugestoes > li:nth-child(1) > figure > a',
    e => e.outerHTML,
  )
  browser.close()
  let id
  let regex = /\/ID-[0-9]+\//
  let idMatchArray = regex.exec(strWithID)
  let idMatch = idMatchArray[0]
  id = idMatch.slice(4, -1)
  browser.close()
  return id
}

module.exports = getValidID
