import { supabase } from '../lib/supabaseClient';

export const incrementViewCount = async (table: 'events' | 'products', id: number) => {
  try {
    const { data, error: fetchError } = await supabase
      .from(table)
      .select('views')
      .eq('id', id)
      .single();

    if (fetchError) throw fetchError;

    const currentViews = data?.views ?? 0;

    const { error: updateError } = await supabase
      .from(table)
      .update({ views: currentViews + 1 })
      .eq('id', id);

    if (updateError) throw updateError;
  } catch (err) {
    console.error('Error al incrementar vistas:', err);
  }
};