import { Phone, Siren } from "lucide-react"
import { Button } from "@/components/ui/button"

// --- EDIT THIS: replace every placeholder below with your real information ---

const EMERGENCY_SERVICES = [
    { label: "Ambulance", number: "118" },
    { label: "Police", number: "110" },
    { label: "Fire", number: "113" },
]

const EMERGENCY_CONTACTS = [
    { name: process.env.PERSON1_NAME ?? "", relation: "Spouse", number: process.env.PERSON1_NUMBER ?? "" },
    { name: process.env.PERSON2_NAME ?? "", relation: "Self", number: process.env.PERSON2_NUMBER ?? "" },
]

const LAST_UPDATED = "2026-07-06"

// --- end of editable data ---

function telHref(number: string) {
    return `tel:${number.replace(/[^+\d]/g, "")}`
}

// Shows only "+6281" and the last 4 digits, masks everything in between.
function maskPhone(number: string) {
    const digits = number.replace(/[^+\d]/g, "")
    const prefix = digits.slice(0, 5)
    const last4 = digits.slice(-4)
    const maskedLength = Math.max(digits.length - prefix.length - last4.length, 0)
    return `${prefix}${"*".repeat(maskedLength)}${last4}`
}

export function SosView() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-[#E7E0DE] px-4 py-6 text-neutral-900">
            <div className="mx-auto w-full max-w-md space-y-8 text-center">
                {/* Header */}
                <div className="space-y-1">
                    <div className="flex items-center justify-center gap-2 text-red-500">
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
                                className="h-16 w-full justify-between border-neutral-200 bg-[#F5F5F5] px-4 hover:bg-[#EFEFEF]">
                                <a href={telHref(contact.number)} aria-label={`Call ${contact.name}, ${contact.relation}`}>
                                    <span className="flex flex-col items-start">
                                        <span className="font-semibold">{contact.name}</span>
                                        <span className="text-xs text-neutral-500">
                                            {contact.relation} · {maskPhone(contact.number)}
                                        </span>
                                    </span>
                                    <Phone className="size-5" />
                                </a>
                            </Button>
                        ))}
                    </div>
                </section>

                <p className="border-t border-neutral-300 pt-4 text-xs text-neutral-500">
                    No analytics, trackers, or external API calls. All data is
                    hardcoded at build time. Last reviewed {LAST_UPDATED} — review
                    every six months.
                </p>
            </div>
        </div>
    )
}
