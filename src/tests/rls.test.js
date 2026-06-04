/**
 * Test 5 — Row Level Security
 *
 * Strategy (two layers):
 *
 * A) Unit test (always runs): confirms that fetchUserClothingItems always
 *    injects a user_id filter — the service layer never issues a "select all"
 *    query that could expose other users' rows.
 *
 * B) Integration test (runs when VITE_SUPABASE_URL is set): hits the real
 *    Supabase project with an *unauthenticated* client and verifies that RLS
 *    prevents any rows being returned.  An unauthenticated request has
 *    auth.uid() = null, so the policy `USING (auth.uid() = user_id)` matches
 *    nothing — any real user row is invisible.
 */
import { describe, it, expect } from 'vitest'
import { buildMock } from './mockSupabase.js'
import { fetchUserClothingItems } from '../lib/wardrobeService.js'

// ── A: Unit test — service always scopes queries by user_id ──────────────────
describe('RLS unit: service layer always filters by user_id', () => {
  it('fetchUserClothingItems always includes a user_id eq filter', async () => {
    const db = buildMock({ data: [], error: null })

    await fetchUserClothingItems(db, 'user-A')

    const eqCalls = db.eq.mock.calls
    const hasUserIdFilter = eqCalls.some(([col]) => col === 'user_id')

    expect(hasUserIdFilter).toBe(true)
  })

  it('the user_id filter uses the exact caller-supplied id (not a wildcard)', async () => {
    const db = buildMock({ data: [], error: null })

    await fetchUserClothingItems(db, 'user-specific-id')

    const userIdCall = db.eq.mock.calls.find(([col]) => col === 'user_id')
    expect(userIdCall?.[1]).toBe('user-specific-id')
    expect(userIdCall?.[1]).not.toBe('*')
    expect(userIdCall?.[1]).not.toBe('')
    expect(userIdCall?.[1]).not.toBeNull()
  })

  it('a request for user-A never carries user-B\'s id in its filter', async () => {
    const dbA = buildMock({ data: [], error: null })
    const dbB = buildMock({ data: [], error: null })

    await fetchUserClothingItems(dbA, 'user-A')
    await fetchUserClothingItems(dbB, 'user-B')

    const filterA = dbA.eq.mock.calls.find(([col]) => col === 'user_id')?.[1]
    const filterB = dbB.eq.mock.calls.find(([col]) => col === 'user_id')?.[1]

    expect(filterA).toBe('user-A')
    expect(filterB).toBe('user-B')
    expect(filterA).not.toBe(filterB)
  })
})

// ── B: Integration test — unauthenticated Supabase client sees no rows ────────
const supabaseUrl  = import.meta.env?.VITE_SUPABASE_URL
const supabaseAnon = import.meta.env?.VITE_SUPABASE_ANON_KEY
const hasRealCreds = Boolean(supabaseUrl && supabaseAnon)

describe.skipIf(!hasRealCreds)('RLS integration: real Supabase (unauthenticated)', () => {
  it('unauthenticated client cannot read clothing_items rows', async () => {
    // Dynamic import so the module only resolves when env vars are present
    const { createClient } = await import('@supabase/supabase-js')
    // Create a fresh client with NO session — auth.uid() will be null server-side
    const anonClient = createClient(supabaseUrl, supabaseAnon)

    const { data, error } = await anonClient.from('clothing_items').select('*')

    // RLS should either return an empty array or a policy error.
    // Either way, zero real rows must be visible.
    const rows = data ?? []
    expect(rows.length).toBe(0)
    // If Supabase returned an error it must be an RLS/auth denial, not a
    // network or schema error (those would indicate a misconfiguration).
    if (error) {
      expect(error.code).toMatch(/42501|PGRST301|insufficient_privilege/i)
    }
  }, 10_000) // allow up to 10 s for the network round-trip

  it('unauthenticated client cannot read outfits rows', async () => {
    const { createClient } = await import('@supabase/supabase-js')
    const anonClient = createClient(supabaseUrl, supabaseAnon)

    const { data, error } = await anonClient.from('outfits').select('*')

    const rows = data ?? []
    expect(rows.length).toBe(0)
    if (error) {
      expect(error.code).toMatch(/42501|PGRST301|insufficient_privilege/i)
    }
  }, 10_000)
})
