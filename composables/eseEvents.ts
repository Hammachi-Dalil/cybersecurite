export const useEvents = async () => {
    const { $supabase } = useNuxtApp(); // Récupère l'instance Supabase injectée
    const { data, error } = await $supabase.from("events").select("*").order("date", { ascending: true });
  
    if (error) {
      console.error("Erreur lors du chargement des événements :", error.message);
      throw new Error(error.message);
    }
  
    return data || [];
  };
  