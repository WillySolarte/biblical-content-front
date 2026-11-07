import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/common/constants/query-keys'
import { getUserAuthenticated } from '@/features/user/services/user.service'


export default function useAuth() {

  const { data, isError, isLoading } = useQuery({
    queryKey: queryKeys.auth,
    queryFn: getUserAuthenticated,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000
  })

  return {
    data,
    isError,
    isLoading,
    authenticated: !!data
  }
}