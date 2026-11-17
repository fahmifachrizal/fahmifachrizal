// Every figure here is taken from the CV (public/…Curriculum Vitae.pdf).
const facts = [
  { value: "2017", label: "First role: research analyst at the ITB Meteorology Laboratory, running the WRF weather model." },
  { value: "2023", label: "Joined the foundational engineering team behind Wondr by BNI." },
  { value: "4", label: "Investment modules built end-to-end for Wondr: Bonds/Sukuk, Mutual Funds, Diaspora and DPLK." },
  { value: "93.6", label: "Honor Award score at the Hacktiv8 Full Stack JavaScript Immersive program." },
]

export function NumbersSection() {
  return (
    <section aria-labelledby="numbers-heading" className="surface-ink">
      <div className="page-container py-28 lg:py-40">
        <div data-reveal className="mx-auto max-w-4xl text-center">
          <p className="eyebrow text-muted-foreground">Track record</p>
          <h2 id="numbers-heading" className="display mt-5 text-4xl leading-[1.1] md:text-5xl lg:text-6xl">
            From weather models to digital banking.
          </h2>
        </div>
        <dl className="mx-auto mt-16 grid max-w-6xl gap-x-10 gap-y-12 text-center sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {facts.map((fact, i) => (
            <div
              key={fact.value}
              data-reveal
              style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}
              className="flex flex-col-reverse justify-end gap-4"
            >
              <dt className="mx-auto max-w-[16rem] text-sm leading-relaxed text-muted-foreground">{fact.label}</dt>
              <dd className="display text-6xl lg:text-7xl">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
