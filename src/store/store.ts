import { defineStore } from "pinia";
import serverApi from "../services/server";
import { ref } from "vue";
import { TournamentDto } from "../interface/tournament.dto";

export const useTournamentStore = defineStore("tournament", () => {
  const tournament = ref<TournamentDto | null>(null);

  const loading = ref<boolean>(false);

  const getTournament = async (tournamentId: string | string[]) => {
    try {
      loading.value = true;
      const response = await serverApi.get<TournamentDto>(
        `/tournaments/${tournamentId}`
      );

      if (response.data) {
        tournament.value = response.data;
      } else {
        console.error("La respuesta no coincide con el tipo esperado");
      }

      loading.value = false;
    } catch (error) {
      console.error("Error al obtener torneo:", error);
      loading.value = false;
    }
  };

  return {
    tournament,
    loading,
    getTournament,
  };
});
