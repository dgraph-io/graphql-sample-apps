export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['ID'];
  title: Scalars['String'];
  text: Scalars['String'];
  datePublished?: Maybe<Scalars['DateTime']>;
  likes?: Maybe<Scalars['Int']>;
  author: User;
  tags: Array<Scalars['String']>;
  category: Category;
  comments: Array<Comment>;
};


export type PostAuthorArgs = {
  filter?: Maybe<UserFilter>;
};


export type PostCategoryArgs = {
  filter?: Maybe<CategoryFilter>;
};


export type PostCommentsArgs = {
  filter?: Maybe<CommentFilter>;
  order?: Maybe<CommentOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
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
  user?: Maybe<Array<Maybe<User>>>;
  msg?: Maybe<Scalars['String']>;
  numUids?: Maybe<Scalars['Int']>;
};


export type DeleteUserPayloadUserArgs = {
  filter?: Maybe<UserFilter>;
  order?: Maybe<UserOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
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

export enum UserOrderable {
  Username = 'username',
  DisplayName = 'displayName',
  AvatarImg = 'avatarImg'
}

export type Mutation = {
  __typename?: 'Mutation';
  addUser?: Maybe<AddUserPayload>;
  updateUser?: Maybe<UpdateUserPayload>;
  deleteUser?: Maybe<DeleteUserPayload>;
  addPermission?: Maybe<AddPermissionPayload>;
  updatePermission?: Maybe<UpdatePermissionPayload>;
  deletePermission?: Maybe<DeletePermissionPayload>;
  addPost?: Maybe<AddPostPayload>;
  updatePost?: Maybe<UpdatePostPayload>;
  deletePost?: Maybe<DeletePostPayload>;
  addComment?: Maybe<AddCommentPayload>;
  updateComment?: Maybe<UpdateCommentPayload>;
  deleteComment?: Maybe<DeleteCommentPayload>;
  addCategory?: Maybe<AddCategoryPayload>;
  updateCategory?: Maybe<UpdateCategoryPayload>;
  deleteCategory?: Maybe<DeleteCategoryPayload>;
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


export type MutationAddPermissionArgs = {
  input: Array<AddPermissionInput>;
};


export type MutationUpdatePermissionArgs = {
  input: UpdatePermissionInput;
};


export type MutationDeletePermissionArgs = {
  filter: PermissionFilter;
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


export type MutationAddCommentArgs = {
  input: Array<AddCommentInput>;
};


export type MutationUpdateCommentArgs = {
  input: UpdateCommentInput;
};


export type MutationDeleteCommentArgs = {
  filter: CommentFilter;
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

export type IntFilter = {
  eq?: Maybe<Scalars['Int']>;
  le?: Maybe<Scalars['Int']>;
  lt?: Maybe<Scalars['Int']>;
  ge?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
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
  isPublic?: Maybe<Scalars['Boolean']>;
  permissions?: Maybe<Array<Maybe<PermissionRef>>>;
};

export type PostRef = {
  id?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  datePublished?: Maybe<Scalars['DateTime']>;
  likes?: Maybe<Scalars['Int']>;
  author?: Maybe<UserRef>;
  tags?: Maybe<Array<Scalars['String']>>;
  category?: Maybe<CategoryRef>;
  comments?: Maybe<Array<CommentRef>>;
};

export type Role_Hash = {
  eq: Role;
};

export type UpdateCategoryInput = {
  filter: CategoryFilter;
  set?: Maybe<CategoryPatch>;
  remove?: Maybe<CategoryPatch>;
};

export type UserRef = {
  username?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  avatarImg?: Maybe<Scalars['String']>;
  posts?: Maybe<Array<Maybe<PostRef>>>;
  roles?: Maybe<Array<Maybe<PermissionRef>>>;
};

export type StringFullTextFilter = {
  alloftext?: Maybe<Scalars['String']>;
  anyoftext?: Maybe<Scalars['String']>;
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

export type DeleteCommentPayload = {
  __typename?: 'DeleteCommentPayload';
  comment?: Maybe<Array<Maybe<Comment>>>;
  msg?: Maybe<Scalars['String']>;
  numUids?: Maybe<Scalars['Int']>;
};


export type DeleteCommentPayloadCommentArgs = {
  filter?: Maybe<CommentFilter>;
  order?: Maybe<CommentOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type AddUserInput = {
  username: Scalars['String'];
  displayName?: Maybe<Scalars['String']>;
  avatarImg?: Maybe<Scalars['String']>;
  posts?: Maybe<Array<Maybe<PostRef>>>;
  roles?: Maybe<Array<Maybe<PermissionRef>>>;
};

export type CommentPatch = {
  text?: Maybe<Scalars['String']>;
  commentsOn?: Maybe<PostRef>;
  author?: Maybe<UserRef>;
};

export type UpdateCommentInput = {
  filter: CommentFilter;
  set?: Maybe<CommentPatch>;
  remove?: Maybe<CommentPatch>;
};

export type UserPatch = {
  displayName?: Maybe<Scalars['String']>;
  avatarImg?: Maybe<Scalars['String']>;
  posts?: Maybe<Array<Maybe<PostRef>>>;
  roles?: Maybe<Array<Maybe<PermissionRef>>>;
};

export type DateTimeFilter = {
  eq?: Maybe<Scalars['DateTime']>;
  le?: Maybe<Scalars['DateTime']>;
  lt?: Maybe<Scalars['DateTime']>;
  ge?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
};

export type StringExactFilter = {
  eq?: Maybe<Scalars['String']>;
  le?: Maybe<Scalars['String']>;
  lt?: Maybe<Scalars['String']>;
  ge?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
};

export type CommentRef = {
  id?: Maybe<Scalars['ID']>;
  text?: Maybe<Scalars['String']>;
  commentsOn?: Maybe<PostRef>;
  author?: Maybe<UserRef>;
};

export type AddPostInput = {
  title: Scalars['String'];
  text: Scalars['String'];
  datePublished?: Maybe<Scalars['DateTime']>;
  likes?: Maybe<Scalars['Int']>;
  author: UserRef;
  tags: Array<Scalars['String']>;
  category: CategoryRef;
  comments: Array<CommentRef>;
};

export type UpdateUserInput = {
  filter: UserFilter;
  set?: Maybe<UserPatch>;
  remove?: Maybe<UserPatch>;
};

export enum Role {
  Reader = 'READER',
  Writer = 'WRITER',
  Administrator = 'ADMINISTRATOR'
}

export type StringRegExpFilter = {
  regexp?: Maybe<Scalars['String']>;
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

export enum PostOrderable {
  Title = 'title',
  Text = 'text',
  DatePublished = 'datePublished',
  Likes = 'likes',
  Tags = 'tags'
}

export type AddCategoryInput = {
  name: Scalars['String'];
  posts?: Maybe<Array<Maybe<PostRef>>>;
  isPublic?: Maybe<Scalars['Boolean']>;
  permissions?: Maybe<Array<Maybe<PermissionRef>>>;
};

export type PermissionFilter = {
  role?: Maybe<Role_Hash>;
  and?: Maybe<PermissionFilter>;
  or?: Maybe<PermissionFilter>;
  not?: Maybe<PermissionFilter>;
};

export type PermissionRef = {
  user?: Maybe<UserRef>;
  role?: Maybe<Role>;
  forCategory?: Maybe<CategoryRef>;
};

export type Permission = {
  __typename?: 'Permission';
  user: User;
  role: Role;
  forCategory?: Maybe<Category>;
};


export type PermissionUserArgs = {
  filter?: Maybe<UserFilter>;
};


export type PermissionForCategoryArgs = {
  filter?: Maybe<CategoryFilter>;
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

export type AddCommentPayload = {
  __typename?: 'AddCommentPayload';
  comment?: Maybe<Array<Maybe<Comment>>>;
  numUids?: Maybe<Scalars['Int']>;
};


export type AddCommentPayloadCommentArgs = {
  filter?: Maybe<CommentFilter>;
  order?: Maybe<CommentOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type AddPermissionPayload = {
  __typename?: 'AddPermissionPayload';
  permission?: Maybe<Array<Maybe<Permission>>>;
  numUids?: Maybe<Scalars['Int']>;
};


export type AddPermissionPayloadPermissionArgs = {
  filter?: Maybe<PermissionFilter>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type UpdatePermissionInput = {
  filter: PermissionFilter;
  set?: Maybe<PermissionPatch>;
  remove?: Maybe<PermissionPatch>;
};

export type UserFilter = {
  username?: Maybe<StringHashFilter>;
  and?: Maybe<UserFilter>;
  or?: Maybe<UserFilter>;
  not?: Maybe<UserFilter>;
};

export type Query = {
  __typename?: 'Query';
  getUser?: Maybe<User>;
  queryUser?: Maybe<Array<Maybe<User>>>;
  queryPermission?: Maybe<Array<Maybe<Permission>>>;
  getPost?: Maybe<Post>;
  queryPost?: Maybe<Array<Maybe<Post>>>;
  getComment?: Maybe<Comment>;
  queryComment?: Maybe<Array<Maybe<Comment>>>;
  getCategory?: Maybe<Category>;
  queryCategory?: Maybe<Array<Maybe<Category>>>;
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


export type QueryQueryPermissionArgs = {
  filter?: Maybe<PermissionFilter>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
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


export type QueryGetCommentArgs = {
  id: Scalars['ID'];
};


export type QueryQueryCommentArgs = {
  filter?: Maybe<CommentFilter>;
  order?: Maybe<CommentOrder>;
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

export type AuthRule = {
  and?: Maybe<Array<Maybe<AuthRule>>>;
  or?: Maybe<Array<Maybe<AuthRule>>>;
  not?: Maybe<AuthRule>;
  rule?: Maybe<Scalars['String']>;
};

export enum HttpMethod {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Patch = 'PATCH',
  Delete = 'DELETE'
}

export type StringHashFilter = {
  eq?: Maybe<Scalars['String']>;
};

export type DeleteCategoryPayload = {
  __typename?: 'DeleteCategoryPayload';
  category?: Maybe<Array<Maybe<Category>>>;
  msg?: Maybe<Scalars['String']>;
  numUids?: Maybe<Scalars['Int']>;
};


export type DeleteCategoryPayloadCategoryArgs = {
  filter?: Maybe<CategoryFilter>;
  order?: Maybe<CategoryOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type AddCommentInput = {
  text: Scalars['String'];
  commentsOn: PostRef;
  author: UserRef;
};

export type User = {
  __typename?: 'User';
  username: Scalars['String'];
  displayName?: Maybe<Scalars['String']>;
  avatarImg?: Maybe<Scalars['String']>;
  posts?: Maybe<Array<Maybe<Post>>>;
  roles?: Maybe<Array<Maybe<Permission>>>;
};


export type UserPostsArgs = {
  filter?: Maybe<PostFilter>;
  order?: Maybe<PostOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type UserRolesArgs = {
  filter?: Maybe<PermissionFilter>;
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
  introspectionHeaders?: Maybe<Array<Scalars['String']>>;
  skipIntrospection?: Maybe<Scalars['Boolean']>;
};

export type UpdateCommentPayload = {
  __typename?: 'UpdateCommentPayload';
  comment?: Maybe<Array<Maybe<Comment>>>;
  numUids?: Maybe<Scalars['Int']>;
};


export type UpdateCommentPayloadCommentArgs = {
  filter?: Maybe<CommentFilter>;
  order?: Maybe<CommentOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type CommentFilter = {
  id?: Maybe<Array<Scalars['ID']>>;
  not?: Maybe<CommentFilter>;
};

export type StringTermFilter = {
  allofterms?: Maybe<Scalars['String']>;
  anyofterms?: Maybe<Scalars['String']>;
};

export type AddPermissionInput = {
  user: UserRef;
  role: Role;
  forCategory?: Maybe<CategoryRef>;
};

export type CategoryFilter = {
  id?: Maybe<Array<Scalars['ID']>>;
  isPublic?: Maybe<Scalars['Boolean']>;
  and?: Maybe<CategoryFilter>;
  or?: Maybe<CategoryFilter>;
  not?: Maybe<CategoryFilter>;
};

export type Comment = {
  __typename?: 'Comment';
  id: Scalars['ID'];
  text: Scalars['String'];
  commentsOn: Post;
  author: User;
};


export type CommentCommentsOnArgs = {
  filter?: Maybe<PostFilter>;
};


export type CommentAuthorArgs = {
  filter?: Maybe<UserFilter>;
};


export enum Mode {
  Batch = 'BATCH',
  Single = 'SINGLE'
}

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

export enum CategoryOrderable {
  Name = 'name'
}

export type PermissionPatch = {
  user?: Maybe<UserRef>;
  role?: Maybe<Role>;
  forCategory?: Maybe<CategoryRef>;
};

export type UpdatePermissionPayload = {
  __typename?: 'UpdatePermissionPayload';
  permission?: Maybe<Array<Maybe<Permission>>>;
  numUids?: Maybe<Scalars['Int']>;
};


export type UpdatePermissionPayloadPermissionArgs = {
  filter?: Maybe<PermissionFilter>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type CategoryOrder = {
  asc?: Maybe<CategoryOrderable>;
  desc?: Maybe<CategoryOrderable>;
  then?: Maybe<CategoryOrder>;
};

export type CategoryPatch = {
  name?: Maybe<Scalars['String']>;
  posts?: Maybe<Array<Maybe<PostRef>>>;
  isPublic?: Maybe<Scalars['Boolean']>;
  permissions?: Maybe<Array<Maybe<PermissionRef>>>;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['ID'];
  name: Scalars['String'];
  posts?: Maybe<Array<Maybe<Post>>>;
  isPublic?: Maybe<Scalars['Boolean']>;
  permissions?: Maybe<Array<Maybe<Permission>>>;
};


export type CategoryPostsArgs = {
  filter?: Maybe<PostFilter>;
  order?: Maybe<PostOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type CategoryPermissionsArgs = {
  filter?: Maybe<PermissionFilter>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type PostFilter = {
  id?: Maybe<Array<Scalars['ID']>>;
  not?: Maybe<PostFilter>;
};

export type PostOrder = {
  asc?: Maybe<PostOrderable>;
  desc?: Maybe<PostOrderable>;
  then?: Maybe<PostOrder>;
};

export type DeletePermissionPayload = {
  __typename?: 'DeletePermissionPayload';
  permission?: Maybe<Array<Maybe<Permission>>>;
  msg?: Maybe<Scalars['String']>;
  numUids?: Maybe<Scalars['Int']>;
};


export type DeletePermissionPayloadPermissionArgs = {
  filter?: Maybe<PermissionFilter>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export enum CommentOrderable {
  Text = 'text'
}

export type CommentOrder = {
  asc?: Maybe<CommentOrderable>;
  desc?: Maybe<CommentOrderable>;
  then?: Maybe<CommentOrder>;
};

export type DeletePostPayload = {
  __typename?: 'DeletePostPayload';
  post?: Maybe<Array<Maybe<Post>>>;
  msg?: Maybe<Scalars['String']>;
  numUids?: Maybe<Scalars['Int']>;
};


export type DeletePostPayloadPostArgs = {
  filter?: Maybe<PostFilter>;
  order?: Maybe<PostOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type PostPatch = {
  title?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  datePublished?: Maybe<Scalars['DateTime']>;
  likes?: Maybe<Scalars['Int']>;
  author?: Maybe<UserRef>;
  tags?: Maybe<Array<Scalars['String']>>;
  category?: Maybe<CategoryRef>;
  comments?: Maybe<Array<CommentRef>>;
};

export type UpdatePostInput = {
  filter: PostFilter;
  set?: Maybe<PostPatch>;
  remove?: Maybe<PostPatch>;
};

export type UserOrder = {
  asc?: Maybe<UserOrderable>;
  desc?: Maybe<UserOrderable>;
  then?: Maybe<UserOrder>;
};
