import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  DateTime: any,
};

export type AddAnswerInput = {
  text: Scalars['String'],
  inAnswerTo: QuestionRef,
};

export type AddAuthorInput = {
  username: Scalars['String'],
  password: Scalars['String'],
  email: Scalars['String'],
  dob?: Maybe<Scalars['DateTime']>,
};

export type AddCommentInput = {
  text: Scalars['String'],
  commentsOn: PostRef,
};

export type AddQuestionInput = {
  text: Scalars['String'],
  title: Scalars['String'],
  tags?: Maybe<Array<Maybe<Scalars['String']>>>,
};

export type Answer = Post & {
   __typename?: 'Answer',
  id: Scalars['ID'],
  text?: Maybe<Scalars['String']>,
  datePublished?: Maybe<Scalars['DateTime']>,
  likes?: Maybe<Scalars['Int']>,
  author: Author,
  inAnswerTo: Question,
  comments?: Maybe<Array<Maybe<Comment>>>,
};

export type Author = {
   __typename?: 'Author',
  username: Scalars['String'],
  email: Scalars['String'],
  dob?: Maybe<Scalars['DateTime']>,
  questions?: Maybe<Array<Maybe<Question>>>,
  answers?: Maybe<Array<Maybe<Answer>>>,
};

export type Comment = Post & {
   __typename?: 'Comment',
  id: Scalars['ID'],
  text?: Maybe<Scalars['String']>,
  datePublished?: Maybe<Scalars['DateTime']>,
  likes?: Maybe<Scalars['Int']>,
  author: Author,
  commentsOn: Post,
  comments?: Maybe<Array<Maybe<Comment>>>,
};


export type DateTimeFilter = {
  eq?: Maybe<Scalars['DateTime']>,
  le?: Maybe<Scalars['DateTime']>,
  lt?: Maybe<Scalars['DateTime']>,
  ge?: Maybe<Scalars['DateTime']>,
  gt?: Maybe<Scalars['DateTime']>,
};

export type Mutation = {
   __typename?: 'Mutation',
  /** # Keep some of the mutations from the backend */
  addQuestion?: Maybe<Question>,
  addAnswer?: Maybe<Answer>,
  addComment?: Maybe<Comment>,
  /** # Change the updatePost mutation to some more intentional operations */
  editPostText?: Maybe<Post>,
  likePost?: Maybe<Post>,
};


export type MutationAddQuestionArgs = {
  input: AddQuestionInput
};


export type MutationAddAnswerArgs = {
  input: AddAnswerInput
};


export type MutationAddCommentArgs = {
  input: AddCommentInput
};


export type MutationEditPostTextArgs = {
  id: Scalars['ID'],
  newText: Scalars['String']
};


export type MutationLikePostArgs = {
  id: Scalars['ID'],
  likes: Scalars['Int']
};

export type Post = {
  id: Scalars['ID'],
  text?: Maybe<Scalars['String']>,
  datePublished?: Maybe<Scalars['DateTime']>,
  likes?: Maybe<Scalars['Int']>,
  author: Author,
};

export type PostRef = {
  id: Scalars['ID'],
};

export type Query = {
   __typename?: 'Query',
  /** # Expose only some of the queries from the Dgraph backend */
  getQuestion?: Maybe<Question>,
  getAnswer?: Maybe<Answer>,
  getComment?: Maybe<Comment>,
  queryQuestion?: Maybe<Array<Maybe<Question>>>,
  /** # And add some extra queries */
  myTopQuestions?: Maybe<Array<Maybe<Question>>>,
};


export type QueryGetQuestionArgs = {
  id: Scalars['ID']
};


export type QueryGetAnswerArgs = {
  id: Scalars['ID']
};


export type QueryGetCommentArgs = {
  id: Scalars['ID']
};


export type QueryQueryQuestionArgs = {
  filter?: Maybe<QuestionFilter>,
  order?: Maybe<QuestionOrder>,
  first?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>
};

export type Question = Post & {
   __typename?: 'Question',
  id: Scalars['ID'],
  text?: Maybe<Scalars['String']>,
  datePublished?: Maybe<Scalars['DateTime']>,
  likes?: Maybe<Scalars['Int']>,
  author: Author,
  title: Scalars['String'],
  tags?: Maybe<Array<Maybe<Scalars['String']>>>,
  answers?: Maybe<Array<Maybe<Answer>>>,
  comments?: Maybe<Array<Maybe<Comment>>>,
};

export type QuestionFilter = {
  title?: Maybe<StringTermFilter>,
  tags?: Maybe<StringExactFilter>,
  text?: Maybe<StringFullTextFilter>,
  datePublished?: Maybe<DateTimeFilter>,
  or?: Maybe<QuestionFilter>,
};

export type QuestionOrder = {
  asc?: Maybe<QuestionOrderable>,
  desc?: Maybe<QuestionOrderable>,
  then?: Maybe<QuestionOrder>,
};

export enum QuestionOrderable {
  Likes = 'likes',
  DatePublished = 'datePublished'
}

export type QuestionRef = {
  id: Scalars['ID'],
};

export type StringExactFilter = {
  eq?: Maybe<Scalars['String']>,
};

export type StringFullTextFilter = {
  alloftext?: Maybe<Scalars['String']>,
  anyoftext?: Maybe<Scalars['String']>,
};

export type StringHashFilter = {
  eq?: Maybe<Scalars['String']>,
};

export type StringTermFilter = {
  allofterms?: Maybe<Scalars['String']>,
  anyofterms?: Maybe<Scalars['String']>,
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type isTypeOfResolverFn = (obj: any, info: GraphQLResolveInfo) => boolean;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  Question: ResolverTypeWrapper<Question>,
  Post: ResolverTypeWrapper<Post>,
  String: ResolverTypeWrapper<Scalars['String']>,
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  Author: ResolverTypeWrapper<Author>,
  Answer: ResolverTypeWrapper<Answer>,
  Comment: ResolverTypeWrapper<Comment>,
  QuestionFilter: QuestionFilter,
  StringTermFilter: StringTermFilter,
  StringExactFilter: StringExactFilter,
  StringFullTextFilter: StringFullTextFilter,
  DateTimeFilter: DateTimeFilter,
  QuestionOrder: QuestionOrder,
  QuestionOrderable: QuestionOrderable,
  Mutation: ResolverTypeWrapper<{}>,
  AddQuestionInput: AddQuestionInput,
  AddAnswerInput: AddAnswerInput,
  QuestionRef: QuestionRef,
  AddCommentInput: AddCommentInput,
  PostRef: PostRef,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  AddAuthorInput: AddAuthorInput,
  StringHashFilter: StringHashFilter,
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {},
  ID: Scalars['ID'],
  Question: Question,
  Post: Post,
  String: Scalars['String'],
  DateTime: Scalars['DateTime'],
  Int: Scalars['Int'],
  Author: Author,
  Answer: Answer,
  Comment: Comment,
  QuestionFilter: QuestionFilter,
  StringTermFilter: StringTermFilter,
  StringExactFilter: StringExactFilter,
  StringFullTextFilter: StringFullTextFilter,
  DateTimeFilter: DateTimeFilter,
  QuestionOrder: QuestionOrder,
  QuestionOrderable: QuestionOrderable,
  Mutation: {},
  AddQuestionInput: AddQuestionInput,
  AddAnswerInput: AddAnswerInput,
  QuestionRef: QuestionRef,
  AddCommentInput: AddCommentInput,
  PostRef: PostRef,
  Boolean: Scalars['Boolean'],
  AddAuthorInput: AddAuthorInput,
  StringHashFilter: StringHashFilter,
}>;

export type AnswerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Answer'] = ResolversParentTypes['Answer']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  datePublished?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  likes?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  author?: Resolver<ResolversTypes['Author'], ParentType, ContextType>,
  inAnswerTo?: Resolver<ResolversTypes['Question'], ParentType, ContextType>,
  comments?: Resolver<Maybe<Array<Maybe<ResolversTypes['Comment']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn,
}>;

export type AuthorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Author'] = ResolversParentTypes['Author']> = ResolversObject<{
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  dob?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  questions?: Resolver<Maybe<Array<Maybe<ResolversTypes['Question']>>>, ParentType, ContextType>,
  answers?: Resolver<Maybe<Array<Maybe<ResolversTypes['Answer']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn,
}>;

export type CommentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  datePublished?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  likes?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  author?: Resolver<ResolversTypes['Author'], ParentType, ContextType>,
  commentsOn?: Resolver<ResolversTypes['Post'], ParentType, ContextType>,
  comments?: Resolver<Maybe<Array<Maybe<ResolversTypes['Comment']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn,
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime'
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  addQuestion?: Resolver<Maybe<ResolversTypes['Question']>, ParentType, ContextType, RequireFields<MutationAddQuestionArgs, 'input'>>,
  addAnswer?: Resolver<Maybe<ResolversTypes['Answer']>, ParentType, ContextType, RequireFields<MutationAddAnswerArgs, 'input'>>,
  addComment?: Resolver<Maybe<ResolversTypes['Comment']>, ParentType, ContextType, RequireFields<MutationAddCommentArgs, 'input'>>,
  editPostText?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<MutationEditPostTextArgs, 'id' | 'newText'>>,
  likePost?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<MutationLikePostArgs, 'id' | 'likes'>>,
}>;

export type PostResolvers<ContextType = any, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Question' | 'Answer' | 'Comment', ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  datePublished?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  likes?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  author?: Resolver<ResolversTypes['Author'], ParentType, ContextType>,
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  getQuestion?: Resolver<Maybe<ResolversTypes['Question']>, ParentType, ContextType, RequireFields<QueryGetQuestionArgs, 'id'>>,
  getAnswer?: Resolver<Maybe<ResolversTypes['Answer']>, ParentType, ContextType, RequireFields<QueryGetAnswerArgs, 'id'>>,
  getComment?: Resolver<Maybe<ResolversTypes['Comment']>, ParentType, ContextType, RequireFields<QueryGetCommentArgs, 'id'>>,
  queryQuestion?: Resolver<Maybe<Array<Maybe<ResolversTypes['Question']>>>, ParentType, ContextType, QueryQueryQuestionArgs>,
  myTopQuestions?: Resolver<Maybe<Array<Maybe<ResolversTypes['Question']>>>, ParentType, ContextType>,
}>;

export type QuestionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Question'] = ResolversParentTypes['Question']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  datePublished?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  likes?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  author?: Resolver<ResolversTypes['Author'], ParentType, ContextType>,
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  tags?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>,
  answers?: Resolver<Maybe<Array<Maybe<ResolversTypes['Answer']>>>, ParentType, ContextType>,
  comments?: Resolver<Maybe<Array<Maybe<ResolversTypes['Comment']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn,
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Answer?: AnswerResolvers<ContextType>,
  Author?: AuthorResolvers<ContextType>,
  Comment?: CommentResolvers<ContextType>,
  DateTime?: GraphQLScalarType,
  Mutation?: MutationResolvers<ContextType>,
  Post?: PostResolvers,
  Query?: QueryResolvers<ContextType>,
  Question?: QuestionResolvers<ContextType>,
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
