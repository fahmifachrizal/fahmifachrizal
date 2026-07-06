import { SosView } from "./sos-view"

export const metadata = {
    title: "SOS | Mukhammad Fahmi Fachrizal",
    description: "Emergency information portal",
    robots: {
        index: false,
        follow: false,
    },
}

export default function SosPage() {
    return <SosView />
}
