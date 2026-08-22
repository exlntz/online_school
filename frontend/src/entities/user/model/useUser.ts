import { useQuery, type UseQueryResult } from "@tanstack/react-query"
import type { User } from "../../../types/user"
import { getMe } from "../api/user.api"


export const useUser = (): UseQueryResult<User, Error> => {
    return useQuery({
        queryKey: ['user'],
        queryFn: getMe,
        retry: false,
        staleTime: 1000*60*5,
    })
}