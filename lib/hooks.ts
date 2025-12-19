import { useMutation } from "@tanstack/react-query";
import { apiFetch } from "./fetcher";
import type { NormalRequest, NormalResponse } from "./types";

export function useNormalSort() {
    return useMutation({
        mutationFn: async (input: NormalRequest & { endpoint: string }) => {
            const json = await apiFetch<NormalResponse>(
                input.endpoint,
                {
                    method: "POST",
                    body: JSON.stringify({ initialArray: input.initialArray })
                }
            )

            return json
        }
    })
}