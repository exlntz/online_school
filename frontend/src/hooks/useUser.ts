import { useQuery, type UseQueryResult } from "@tanstack/react-query"
import { getMe } from "../api/auth"
import type { User } from "../types/user"


export const useUser = (): UseQueryResult<User, Error> => {
    return useQuery({
        queryKey: ['user'],
        queryFn: getMe,
        retry: false,
        staleTime: 1000*60*5,
    })
}