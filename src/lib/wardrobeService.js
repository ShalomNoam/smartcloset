/**
 * Pure Supabase operations for clothing_items.
 * Each function receives the supabase client so callers (and tests) can
 * inject any implementation they like.
 */

/**
 * Insert a new clothing item for the given user.
 * @returns {Promise<object>} The newly created row.
 */
export async function createClothingItem(supabase, userId, data) {
  const { data: newItem, error } = await supabase
    .from('clothing_items')
    .insert({ ...data, user_id: userId })
    .select()
    .single()
  if (error) throw error
  return newItem
}

/**
 * Fetch all clothing items belonging to userId, newest first.
 * @returns {Promise<object[]>}
 */
export async function fetchUserClothingItems(supabase, userId) {
  const { data, error } = await supabase
    .from('clothing_items')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data ?? []
}

/**
 * Update specific fields of a clothing item.
 * The `user_id` filter ensures a user can only edit their own items.
 */
export async function updateClothingItem(supabase, userId, id, updates) {
  const { error } = await supabase
    .from('clothing_items')
    .update(updates)
    .eq('id', id)
    .eq('user_id', userId)
  if (error) throw error
}

/**
 * Delete a clothing item.
 * The `user_id` filter ensures a user can only delete their own items.
 */
export async function deleteClothingItem(supabase, userId, id) {
  const { error } = await supabase
    .from('clothing_items')
    .delete()
    .eq('id', id)
    .eq('user_id', userId)
  if (error) throw error
}
