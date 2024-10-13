export const revalidate = 0

import { list } from "@vercel/blob";

export async function GET(req: Request) {
    // Return list of images
    return new Response(JSON.stringify(await list()), { status: 200 })
}