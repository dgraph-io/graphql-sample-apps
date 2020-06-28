export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type StringTermFilter = {
  allofterms?: Maybe<Scalars['String']>;
  anyofterms?: Maybe<Scalars['String']>;
};

export type StringExactFilter = {
  eq?: Maybe<Scalars['String']>;
  le?: Maybe<Scalars['String']>;
  lt?: Maybe<Scalars['String']>;
  ge?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
};

export type UpdateCategoryPayload = {
  __typename?: 'UpdateCategoryPayload';
  category?: Maybe<Array<Maybe<Category>>>;
  numUids?: Maybe<Scalars['Int']>;
};


export type UpdateCategoryPayloadCategoryArgs = {
  filter?: Maybe<CategoryFilter>;
  order?: Maybe<CategoryOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export enum PostOrderable {
  Title = 'title',
  Text = 'text',
  DatePublished = 'datePublished',
  Likes = 'likes'
}

export type UserFilter = {
  username?: Maybe<StringHashFilter>;
  and?: Maybe<UserFilter>;
  or?: Maybe<UserFilter>;
  not?: Maybe<UserFilter>;
};

export type DeletePostPayload = {
  __typename?: 'DeletePostPayload';
  msg?: Maybe<Scalars['String']>;
  numUids?: Maybe<Scalars['Int']>;
};

export type UpdateCategoryInput = {
  filter: CategoryFilter;
  set?: Maybe<CategoryPatch>;
  remove?: Maybe<CategoryPatch>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addPost?: Maybe<AddPostPayload>;
  updatePost?: Maybe<UpdatePostPayload>;
  deletePost?: Maybe<DeletePostPayload>;
  addCategory?: Maybe<AddCategoryPayload>;
  updateCategory?: Maybe<UpdateCategoryPayload>;
  deleteCategory?: Maybe<DeleteCategoryPayload>;
  addUser?: Maybe<AddUserPayload>;
  updateUser?: Maybe<UpdateUserPayload>;
  deleteUser?: Maybe<DeleteUserPayload>;
};


export type MutationAddPostArgs = {
  input: Array<AddPostInput>;
};


export type MutationUpdatePostArgs = {
  input: UpdatePostInput;
};


export type MutationDeletePostArgs = {
  filter: PostFilter;
};


export type MutationAddCategoryArgs = {
  input: Array<AddCategoryInput>;
};


export type MutationUpdateCategoryArgs = {
  input: UpdateCategoryInput;
};


export type MutationDeleteCategoryArgs = {
  filter: CategoryFilter;
};


export type MutationAddUserArgs = {
  input: Array<AddUserInput>;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type MutationDeleteUserArgs = {
  filter: UserFilter;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['ID'];
  name: Scalars['String'];
  posts?: Maybe<Array<Maybe<Post>>>;
};


export type CategoryPostsArgs = {
  filter?: Maybe<PostFilter>;
  order?: Maybe<PostOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type CustomHttp = {
  url: Scalars['String'];
  method: HttpMethod;
  body?: Maybe<Scalars['String']>;
  graphql?: Maybe<Scalars['String']>;
  mode?: Maybe<Mode>;
  forwardHeaders?: Maybe<Array<Scalars['String']>>;
  secretHeaders?: Maybe<Array<Scalars['String']>>;
  skipIntrospection?: Maybe<Scalars['Boolean']>;
};

export type AddPostPayload = {
  __typename?: 'AddPostPayload';
  post?: Maybe<Array<Maybe<Post>>>;
  numUids?: Maybe<Scalars['Int']>;
};


export type AddPostPayloadPostArgs = {
  filter?: Maybe<PostFilter>;
  order?: Maybe<PostOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type DeleteUserPayload = {
  __typename?: 'DeleteUserPayload';
  msg?: Maybe<Scalars['String']>;
  numUids?: Maybe<Scalars['Int']>;
};

export type AddPostInput = {
  title: Scalars['String'];
  text: Scalars['String'];
  datePublished?: Maybe<Scalars['DateTime']>;
  likes?: Maybe<Scalars['Int']>;
  author: UserRef;
  category: CategoryRef;
};

export type UserPatch = {
  displayName?: Maybe<Scalars['String']>;
  avatarImg?: Maybe<Scalars['String']>;
  posts?: Maybe<Array<Maybe<PostRef>>>;
};

export type UserRef = {
  username?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  avatarImg?: Maybe<Scalars['String']>;
  posts?: Maybe<Array<Maybe<PostRef>>>;
};

export enum DgraphIndex {
  Int = 'int',
  Float = 'float',
  Bool = 'bool',
  Hash = 'hash',
  Exact = 'exact',
  Term = 'term',
  Fulltext = 'fulltext',
  Trigram = 'trigram',
  Regexp = 'regexp',
  Year = 'year',
  Month = 'month',
  Day = 'day',
  Hour = 'hour'
}

export type DateTimeFilter = {
  eq?: Maybe<Scalars['DateTime']>;
  le?: Maybe<Scalars['DateTime']>;
  lt?: Maybe<Scalars['DateTime']>;
  ge?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
};

export type StringRegExpFilter = {
  regexp?: Maybe<Scalars['String']>;
};

export enum UserOrderable {
  Username = 'username',
  DisplayName = 'displayName',
  AvatarImg = 'avatarImg'
}

export type UserOrder = {
  asc?: Maybe<UserOrderable>;
  desc?: Maybe<UserOrderable>;
  then?: Maybe<UserOrder>;
};

export type Query = {
  __typename?: 'Query';
  getPost?: Maybe<Post>;
  queryPost?: Maybe<Array<Maybe<Post>>>;
  getCategory?: Maybe<Category>;
  queryCategory?: Maybe<Array<Maybe<Category>>>;
  getUser?: Maybe<User>;
  queryUser?: Maybe<Array<Maybe<User>>>;
};


export type QueryGetPostArgs = {
  id: Scalars['ID'];
};


export type QueryQueryPostArgs = {
  filter?: Maybe<PostFilter>;
  order?: Maybe<PostOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryGetCategoryArgs = {
  id: Scalars['ID'];
};


export type QueryQueryCategoryArgs = {
  filter?: Maybe<CategoryFilter>;
  order?: Maybe<CategoryOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryGetUserArgs = {
  username: Scalars['String'];
};


export type QueryQueryUserArgs = {
  filter?: Maybe<UserFilter>;
  order?: Maybe<UserOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type AuthRule = {
  and?: Maybe<Array<Maybe<AuthRule>>>;
  or?: Maybe<Array<Maybe<AuthRule>>>;
  not?: Maybe<AuthRule>;
  rule?: Maybe<Scalars['String']>;
};

export enum CategoryOrderable {
  Name = 'name'
}

export type CategoryPatch = {
  name?: Maybe<Scalars['String']>;
  posts?: Maybe<Array<Maybe<PostRef>>>;
};

export type UpdatePostInput = {
  filter: PostFilter;
  set?: Maybe<PostPatch>;
  remove?: Maybe<PostPatch>;
};

export type User = {
  __typename?: 'User';
  username: Scalars['String'];
  displayName?: Maybe<Scalars['String']>;
  avatarImg?: Maybe<Scalars['String']>;
  posts?: Maybe<Array<Maybe<Post>>>;
};


export type UserPostsArgs = {
  filter?: Maybe<PostFilter>;
  order?: Maybe<PostOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['ID'];
  title: Scalars['String'];
  text: Scalars['String'];
  datePublished?: Maybe<Scalars['DateTime']>;
  likes?: Maybe<Scalars['Int']>;
  author: User;
  category: Category;
};


export type PostAuthorArgs = {
  filter?: Maybe<UserFilter>;
};


export type PostCategoryArgs = {
  filter?: Maybe<CategoryFilter>;
};

export type CategoryFilter = {
  id?: Maybe<Array<Scalars['ID']>>;
  not?: Maybe<CategoryFilter>;
};

export type AddUserPayload = {
  __typename?: 'AddUserPayload';
  user?: Maybe<Array<Maybe<User>>>;
  numUids?: Maybe<Scalars['Int']>;
};


export type AddUserPayloadUserArgs = {
  filter?: Maybe<UserFilter>;
  order?: Maybe<UserOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type AddUserInput = {
  username: Scalars['String'];
  displayName?: Maybe<Scalars['String']>;
  avatarImg?: Maybe<Scalars['String']>;
  posts?: Maybe<Array<Maybe<PostRef>>>;
};

export type PostOrder = {
  asc?: Maybe<PostOrderable>;
  desc?: Maybe<PostOrderable>;
  then?: Maybe<PostOrder>;
};

export enum Mode {
  Batch = 'BATCH',
  Single = 'SINGLE'
}

export type CategoryOrder = {
  asc?: Maybe<CategoryOrderable>;
  desc?: Maybe<CategoryOrderable>;
  then?: Maybe<CategoryOrder>;
};

export enum HttpMethod {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Patch = 'PATCH',
  Delete = 'DELETE'
}

export type PostFilter = {
  id?: Maybe<Array<Scalars['ID']>>;
  not?: Maybe<PostFilter>;
};

export type UpdatePostPayload = {
  __typename?: 'UpdatePostPayload';
  post?: Maybe<Array<Maybe<Post>>>;
  numUids?: Maybe<Scalars['Int']>;
};


export type UpdatePostPayloadPostArgs = {
  filter?: Maybe<PostFilter>;
  order?: Maybe<PostOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type PostRef = {
  id?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  datePublished?: Maybe<Scalars['DateTime']>;
  likes?: Maybe<Scalars['Int']>;
  author?: Maybe<UserRef>;
  category?: Maybe<CategoryRef>;
};

export type FloatFilter = {
  eq?: Maybe<Scalars['Float']>;
  le?: Maybe<Scalars['Float']>;
  lt?: Maybe<Scalars['Float']>;
  ge?: Maybe<Scalars['Float']>;
  gt?: Maybe<Scalars['Float']>;
};

export type CategoryRef = {
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  posts?: Maybe<Array<Maybe<PostRef>>>;
};

export type PostPatch = {
  title?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  datePublished?: Maybe<Scalars['DateTime']>;
  likes?: Maybe<Scalars['Int']>;
  author?: Maybe<UserRef>;
  category?: Maybe<CategoryRef>;
};

export type StringFullTextFilter = {
  alloftext?: Maybe<Scalars['String']>;
  anyoftext?: Maybe<Scalars['String']>;
};

export type StringHashFilter = {
  eq?: Maybe<Scalars['String']>;
};

export type DeleteCategoryPayload = {
  __typename?: 'DeleteCategoryPayload';
  msg?: Maybe<Scalars['String']>;
  numUids?: Maybe<Scalars['Int']>;
};

export type AddCategoryPayload = {
  __typename?: 'AddCategoryPayload';
  category?: Maybe<Array<Maybe<Category>>>;
  numUids?: Maybe<Scalars['Int']>;
};


export type AddCategoryPayloadCategoryArgs = {
  filter?: Maybe<CategoryFilter>;
  order?: Maybe<CategoryOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type UpdateUserInput = {
  filter: UserFilter;
  set?: Maybe<UserPatch>;
  remove?: Maybe<UserPatch>;
};

export type IntFilter = {
  eq?: Maybe<Scalars['Int']>;
  le?: Maybe<Scalars['Int']>;
  lt?: Maybe<Scalars['Int']>;
  ge?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
};

export type UpdateUserPayload = {
  __typename?: 'UpdateUserPayload';
  user?: Maybe<Array<Maybe<User>>>;
  numUids?: Maybe<Scalars['Int']>;
};


export type UpdateUserPayloadUserArgs = {
  filter?: Maybe<UserFilter>;
  order?: Maybe<UserOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type AddCategoryInput = {
  name: Scalars['String'];
  posts?: Maybe<Array<Maybe<PostRef>>>;
};
