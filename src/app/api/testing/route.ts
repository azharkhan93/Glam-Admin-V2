export async function GET(request: Request) {

    return new Response(JSON.stringify({message: "hello iam from proteced"}),
    {status: 200}
)
}