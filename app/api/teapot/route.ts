export async function GET(req: Request){
    return new Response('I am a teapot', { status: 418 })
}