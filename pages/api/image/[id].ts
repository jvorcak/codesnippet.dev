import type { NextApiRequest, NextApiResponse } from 'next'
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
const chromium = require('chrome-aws-lambda')
import { decode } from 'base64-arraybuffer'

type Data = {
  name: string
}

export const getURL = () =>
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
    ? 'https://codesnippet-development.vercel.app'
    : 'http://localhost:3000'

const getPuppeteer = async () => {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production') {
    return chromium.puppeteer
  } else {
    const { default: mainPuppeteer } = await import('puppeteer')
    return mainPuppeteer
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // const token = req.headers.token;
  const { user } = await supabaseClient.auth.api.getUserByCookie(req)

  const twitter = user?.identities?.find(
    (id) => id.provider === 'twitter'
  )?.identity_data

  const { id } = req.query

  const puppeteer = await getPuppeteer()

  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: {
      width: 1200,
      height: 675,
      deviceScaleFactor: 2,
    },
    executablePath: await chromium.executablePath,
    headless: true,
    ignoreHTTPSErrors: true,
  })

  const page = await browser.newPage()

  await page.goto(`${getURL()}/${id}/image`)

  const imageBufferBase64 = await page.screenshot({ encoding: 'base64' })
  const imageBuffer = await page.screenshot()

  const imagePath = `${user?.id}/${id}.png`

  const { data, error } = await supabaseClient.storage
    .from('images')
    .upload(imagePath, decode(imageBufferBase64), {
      upsert: true,
      contentType: 'image/png',
      cacheControl: '3600',
    })

  await supabaseClient
    .from('snippets')
    .update({
      imagePath,
    })
    .match({
      id,
    })

  console.log({ data, error })

  // if (download) {
  //   res.setHeader(
  //     'Content-disposition',
  //     'attachment; filename=social-image.png'
  //   )
  // }

  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': imageBuffer.length,
  })

  res.end(imageBuffer)
}
