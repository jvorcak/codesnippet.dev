import type { NextApiRequest, NextApiResponse } from 'next'
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
const chromium = require('chrome-aws-lambda')

type Data = {
  name: string
}

export const getURL = () =>
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
    ? 'https://codesnippet-development.vercel.app'
    : 'http://localhost:3000'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // const token = req.headers.token;
  const { user } = await supabaseClient.auth.api.getUserByCookie(req)

  const twitter = user?.identities?.find(
    (id) => id.provider === 'twitter'
  )?.identity_data

  const { download } = req.query

  const browser = await chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: true,
    ignoreHTTPSErrors: true,
  })

  const page = await browser.newPage()

  await page.goto(
    encodeURI(`${getURL()}/44/how-to-kill-a-process-in-unix-system`)
  )
  await page.setViewportSize({ width: 1200, height: 675, deviceScaleFactor: 2 })

  const imageBuffer = await page.screenshot()

  if (download) {
    res.setHeader(
      'Content-disposition',
      'attachment; filename=social-image.png'
    )
  }

  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': imageBuffer.length,
  })

  res.end(imageBuffer)
}
