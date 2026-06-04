/**
 * Pure Supabase operations for outfits.
 */

/**
 * Fetch all outfits for a user, newest first.
 * @returns {Promise<object[]>}
 */
export async function fetchUserOutfits(supabase, userId) {
  const { data, error } = await supabase
    .from('outfits')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data ?? []
}

/**
 * Persist the saved (heart) toggle for an outfit.
 * @param {boolean} saved
 */
export async function saveOutfit(supabase, userId, outfitId, saved) {
  const { error } = await supabase
    .from('outfits')
    .update({ saved })
    .eq('id', outfitId)
    .eq('user_id', userId)
  if (error) throw error
}

/**
 * Insert a new outfit row (used when persisting a generated outfit on first save).
 * @returns {Promise<object>} The newly created row.
 */
export async function createOutfit(supabase, userId, outfitData) {
  const { data: newOutfit, error } = await supabase
    .from('outfits')
    .insert({ ...outfitData, user_id: userId })
    .select()
    .single()
  if (error) throw error
  return newOutfit
}
