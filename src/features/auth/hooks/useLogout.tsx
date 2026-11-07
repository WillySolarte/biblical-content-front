import { useMutation, useQueryClient } from "@tanstack/react-query";
import flashy from "@pablotheblink/flashyjs";
import { logOut } from "../services/auth.service";
import { queryKeys } from "@/common/constants/query-keys";


export default function useLogout() {
    
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logOut,
    onError: (error) => {
      flashy.error(error?.message, {
        position: "top-center",
        animation: "bounce",
      });
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.auth });
      window.location.reload();
    },
  });
}
