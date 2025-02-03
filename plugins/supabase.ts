// plugins/supabase.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const supabaseUrl: string = config.public.supabaseUrl;
  const supabaseKey: string = config.public.supabaseKey;

  const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

  return {
    provide: {
      supabase,
    },
  };
});
