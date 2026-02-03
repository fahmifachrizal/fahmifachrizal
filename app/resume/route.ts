
import { promises as fs } from "fs"
import path from "path"
import { NextResponse } from "next/server"

export const dynamic = "force-static"
export const revalidate = false

export async function GET() {
  const filePath = path.join(process.cwd(), "public", "Mukhammad Fahmi Fachrizal - Curriculum Vitae.pdf")
  
  try {
    const fileBuffer = await fs.readFile(filePath)
    
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="Fahmi_Fachrizal_Resume.pdf"',
      },
    })
  } catch {
    return new NextResponse("Resume not found", { status: 404 })
  }
}
