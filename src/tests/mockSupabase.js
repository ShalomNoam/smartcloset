/**
 * Factory for a lightweight Supabase mock.
 *
 * Every builder method returns the *same* object so chained calls like
 *   supabase.from('x').insert({}).select().single()
 * all go through one set of spies that you can assert on.
 *
 * Terminal points:
 *   .single()  — resolves with { data, error }
 *   .then()    — makes the builder itself a thenable (for queries that
 *                end with .order() or .eq() without calling .single())
 */
export function buildMock({ data = null, error = null } = {}) {
  const resolved = { data, error }

  const m = {
    from:   vi.fn(),
    select: vi.fn(),
    insert: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    eq:     vi.fn(),
    order:  vi.fn(),
    single: vi.fn(() => Promise.resolve(resolved)),
    // Thenable so `await supabase.from(...).select(...)...` works
    then:   (onFulfilled, onRejected) =>
      Promise.resolve(resolved).then(onFulfilled, onRejected),
  }

  // Make every chainable method return the same mock object
  m.from   = vi.fn(() => m)
  m.select = vi.fn(() => m)
  m.insert = vi.fn(() => m)
  m.update = vi.fn(() => m)
  m.delete = vi.fn(() => m)
  m.eq     = vi.fn(() => m)
  m.order  = vi.fn(() => m)

  return m
}
