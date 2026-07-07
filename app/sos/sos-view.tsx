import { Phone, Siren, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"

// --- EDIT THIS: replace every placeholder below with your real information ---

const EMERGENCY_SERVICES = [
    { label: "Ambulance", number: "118" },
    { label: "Police", number: "110" },
    { label: "Fire", number: "113" },
]

const EMERGENCY_CONTACTS = [
    { name: "Jane Doe", relation: "Spouse", number: "+62 812-0000-0001" },
    { name: "John Doe", relation: "Parent", number: "+62 812-0000-0002" },
]

const MEDICAL_INFO = {
    bloodType: "O+",
    allergies: ["Penicillin"],
    medications: ["None"],
    conditions: ["None"],
}

const MEETING_POINTS = [
    "Primary: Front gate of [Building/Complex Name]",
    "Secondary: [Nearby landmark, e.g. corner of Street A & Street B]",
]

const LAST_UPDATED = "2026-07-06"

// --- end of editable data ---

function telHref(number: string) {
    return `tel:${number.replace(/[^+\d]/g, "")}`
}

export function SosView() {
    return (
        <div className="min-h-screen bg-white px-4 py-6 text-neutral-900">
            <div className="mx-auto w-full max-w-md space-y-8">
                {/* Header */}
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-red-800">
                        <Siren className="size-6 shrink-0" />
                        <span className="text-sm font-semibold uppercase tracking-wide">
                            In Case of Emergency
                        </span>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Emergency Information
                    </h1>
                </div>

                {/* Emergency Services */}
                <section className="space-y-2">
                    <h2 className="text-sm font-bold uppercase text-neutral-500">
                        Emergency Services
                    </h2>
                    <div className="grid grid-cols-3 gap-2">
                        {EMERGENCY_SERVICES.map((service) => (
                            <Button
                                key={service.label}
                                asChild
                                size="lg"
                                className="h-16 flex-col gap-1 bg-red-800 text-base font-semibold text-white hover:bg-red-800/90">
                                <a href={telHref(service.number)} aria-label={`Call ${service.label}, ${service.number}`}>
                                    <Phone className="size-5" />
                                    {service.label}
                                </a>
                            </Button>
                        ))}
                    </div>
                </section>

                {/* Emergency Contacts */}
                <section className="space-y-2">
                    <h2 className="text-sm font-bold uppercase text-neutral-500">
                        Emergency Contacts
                    </h2>
                    <div className="space-y-2">
                        {EMERGENCY_CONTACTS.map((contact) => (
                            <Button
                                key={contact.name}
                                asChild
                                variant="outline"
                                size="lg"
                                className="h-16 w-full justify-between border-neutral-200 px-4">
                                <a href={telHref(contact.number)} aria-label={`Call ${contact.name}, ${contact.relation}`}>
                                    <span className="flex flex-col items-start">
                                        <span className="font-semibold">{contact.name}</span>
                                        <span className="text-xs text-neutral-500">
                                            {contact.relation}
                                        </span>
                                    </span>
                                    <Phone className="size-5" />
                                </a>
                            </Button>
                        ))}
                    </div>
                </section>

                {/* Sensitive info toggle — native <details> so it needs no client-side JS */}
                <details className="group space-y-3 rounded-lg border border-neutral-200 p-4">
                    <summary className="flex w-full cursor-pointer list-none items-center justify-between text-sm font-bold uppercase text-neutral-500 [&::-webkit-details-marker]:hidden">
                        <span>Medical &amp; Location Details</span>
                        <Eye className="size-4 group-open:hidden" />
                        <EyeOff className="hidden size-4 group-open:block" />
                    </summary>

                    <p className="text-sm text-neutral-500 group-open:hidden">
                        Hidden by default. Tap to reveal.
                    </p>

                    <div className="hidden space-y-4 group-open:block">
                        <div>
                            <p className="font-semibold">
                                Blood Type: {MEDICAL_INFO.bloodType}
                            </p>
                            <p className="text-sm text-neutral-500">
                                <strong>Allergies:</strong>{" "}
                                {MEDICAL_INFO.allergies.join(", ")}
                            </p>
                            <p className="text-sm text-neutral-500">
                                <strong>Medications:</strong>{" "}
                                {MEDICAL_INFO.medications.join(", ")}
                            </p>
                            <p className="text-sm text-neutral-500">
                                <strong>Conditions:</strong>{" "}
                                {MEDICAL_INFO.conditions.join(", ")}
                            </p>
                        </div>
                        <div>
                            <p className="mb-1 font-semibold">Meeting Points</p>
                            <ul className="list-disc space-y-1 pl-5 text-sm text-neutral-500">
                                {MEETING_POINTS.map((point) => (
                                    <li key={point}>{point}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </details>

                <p className="border-t border-neutral-200 pt-4 text-xs text-neutral-500">
                    No analytics, trackers, or external API calls. All data is
                    hardcoded at build time. Last reviewed {LAST_UPDATED} — review
                    every six months.
                </p>
            </div>
        </div>
    )
}
