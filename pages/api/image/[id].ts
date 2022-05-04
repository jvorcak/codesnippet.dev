import type { NextApiRequest, NextApiResponse } from 'next'
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
const playwright = require('playwright-aws-lambda')

type Data = {
  name: string
}

export const getURL = () =>
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
    ? 'https://createimage.dev'
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

  const browser = await playwright.launchChromium({
    headless: true,
  })
  const page = await browser.newPage()

  await page.goto(
    encodeURI(`${getURL()}/44/how-to-kill-a-process-in-unix-system`)
  )
  await page.setViewportSize({ width: 1200, height: 675 })

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
