import { NextResponse } from "next/server";


export async function GET() {
    return NextResponse.json({
        message: 'Successfully fetched detail!',
        data: process.env.MAP_KEY,
    }, {
        status: 200,
    })
}