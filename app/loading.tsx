export default function Loading() {
  return (
    <div role="status" className="page-container section-y min-h-[60vh]">
      <p className="eyebrow animate-pulse text-muted-foreground">Loading</p>
      <div className="mt-6 h-px w-full max-w-md overflow-hidden bg-border">
        <div className="h-full w-1/3 animate-pulse bg-foreground" />
      </div>
    </div>
  )
}
