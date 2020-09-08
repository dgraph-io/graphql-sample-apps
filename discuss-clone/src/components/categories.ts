import { useCategoriesQuery } from "./types/operations"

export function useCategories(username: string) {

  const {
    data,
    loading,
    error
  } = useCategoriesQuery({ variables: { username: username } })

  const allCategories = data?.all ?? []
  const publicCategories = data?.public ?? []
  const writeableCategories = data?.writable ?? []

  const allWriteableCategories = [
    ...writeableCategories,
    ...publicCategories.filter(
      (c) => !writeableCategories.find((c1) => c1?.id === c?.id)
    ),
  ]
  
  return { allCategories , publicCategories, allWriteableCategories, loading, error }
}
