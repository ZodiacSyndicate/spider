const puppeteer = require('puppeteer')

;(async () => {
  try {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('https://eosflare.io/token/betdicetoken/DICE')
    const wrapperHandle = await page.$('.blackheader.data-iterator')
    await page.waitFor('.blackheader.data-iterator .layout.row.wrap')
    const html = await wrapperHandle.$$eval('.layout.row.wrap', node =>
      node.map(v => {
        const name = v.querySelector('.flex.xs12.sm5.md6').querySelector('a')
          .innerText
        const balance = v.querySelector('div.flex.xs8.sm4.md3.text-sm-right')
        const percent = v.querySelector('div.flex.xs4.sm3.md3.text-xs-right')
        return { name, balance, percent }
      })
    )
    console.log(html)
    await browser.close()
  } catch (err) {
    console.log(err)
  }
})()
