import { IResolvers } from '../types/gql';
import { buildQuery } from './query'
import { buildMutation } from './mutation'
import { getDgSchema } from '../dgraph'

export async function buildResolvers()  {
  const  dg = await getDgSchema()

  return {
    Query: buildQuery(dg),
    Mutation: buildMutation(dg)
  }
}
