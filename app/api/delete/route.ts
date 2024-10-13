import { del } from "@vercel/blob"

export async function DELETE(req: Request) {
    const body = await req.json()
    await del(body)
    return new Response(JSON.stringify('File deleted'), { status: 200 })
}