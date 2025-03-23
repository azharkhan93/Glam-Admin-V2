export async function GET(req: Request) {
    return new Response(JSON.stringify({message: "hello Imam from test route"}),
    { status: 200}
)
}