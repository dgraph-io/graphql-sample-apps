export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The Int64 scalar type represents a signed 64‐bit numeric non‐fractional value.
   * Int64 can represent values in range [-(2^63),(2^63 - 1)].
   */
  Int64: any;
  /**
   * The DateTime scalar type represents date and time as a string in RFC3339 format.
   * For example: "1985-04-12T23:20:50.52Z" represents 20 minutes and 50.52 seconds after the 23rd hour of April 12th, 1985 in UTC.
   */
  DateTime: any;
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

export type UpdateRolePayload = {
  __typename?: 'UpdateRolePayload';
  role?: Maybe<Array<Maybe<Role>>>;
  numUids?: Maybe<Scalars['Int']>;
};


export type UpdateRolePayloadRoleArgs = {
  filter?: Maybe<RoleFilter>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export enum UserHasFilter {
  Username = 'username',
  DisplayName = 'displayName',
  Image = 'image',
  IsAdmin = 'isAdmin',
  Tickets = 'tickets',
  AuthoredComments = 'authoredComments'
}

export type UserRef = {
  username?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  isAdmin?: Maybe<Scalars['Boolean']>;
  tickets?: Maybe<Array<Maybe<TicketRef>>>;
  authoredComments?: Maybe<Array<Maybe<CommentRef>>>;
};

export type CommentPatch = {
  datetime?: Maybe<Scalars['DateTime']>;
  text?: Maybe<Scalars['String']>;
  onTicket?: Maybe<TicketRef>;
  author?: Maybe<UserRef>;
};

export type ProjectFilter = {
  projID?: Maybe<Array<Scalars['ID']>>;
  name?: Maybe<StringTermFilter>;
  has?: Maybe<ProjectHasFilter>;
  and?: Maybe<Array<Maybe<ProjectFilter>>>;
  or?: Maybe<Array<Maybe<ProjectFilter>>>;
  not?: Maybe<ProjectFilter>;
};

export type AddProjectPayload = {
  __typename?: 'AddProjectPayload';
  project?: Maybe<Array<Maybe<Project>>>;
  numUids?: Maybe<Scalars['Int']>;
};


export type AddProjectPayloadProjectArgs = {
  filter?: Maybe<ProjectFilter>;
  order?: Maybe<ProjectOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type StringFullTextFilter = {
  alloftext?: Maybe<Scalars['String']>;
  anyoftext?: Maybe<Scalars['String']>;
};

export type TicketAggregateResult = {
  __typename?: 'TicketAggregateResult';
  count?: Maybe<Scalars['Int']>;
  titleMin?: Maybe<Scalars['String']>;
  titleMax?: Maybe<Scalars['String']>;
  datetimeMin?: Maybe<Scalars['DateTime']>;
  datetimeMax?: Maybe<Scalars['DateTime']>;
  descriptionMin?: Maybe<Scalars['String']>;
  descriptionMax?: Maybe<Scalars['String']>;
  orderPreferenceMin?: Maybe<Scalars['Int']>;
  orderPreferenceMax?: Maybe<Scalars['Int']>;
  orderPreferenceSum?: Maybe<Scalars['Int']>;
  orderPreferenceAvg?: Maybe<Scalars['Float']>;
};

export enum TicketOrderable {
  Title = 'title',
  Datetime = 'datetime',
  Description = 'description',
  OrderPreference = 'orderPreference'
}

export type Permission_Hash = {
  eq?: Maybe<Permission>;
  in?: Maybe<Array<Maybe<Permission>>>;
};

export type TicketRef = {
  id?: Maybe<Scalars['ID']>;
  onColumn?: Maybe<ColumnRef>;
  title?: Maybe<Scalars['String']>;
  datetime?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  orderPreference?: Maybe<Scalars['Int']>;
  assigned?: Maybe<UserRef>;
  comments?: Maybe<Array<Maybe<CommentRef>>>;
};

export type ContainsFilter = {
  point?: Maybe<PointRef>;
  polygon?: Maybe<PolygonRef>;
};

export type GenerateMutationParams = {
  add?: Maybe<Scalars['Boolean']>;
  update?: Maybe<Scalars['Boolean']>;
  delete?: Maybe<Scalars['Boolean']>;
};

export enum CommentHasFilter {
  Datetime = 'datetime',
  Text = 'text',
  OnTicket = 'onTicket',
  Author = 'author'
}

export type AddUserInput = {
  username: Scalars['String'];
  displayName?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  isAdmin?: Maybe<Scalars['Boolean']>;
  tickets?: Maybe<Array<Maybe<TicketRef>>>;
  authoredComments?: Maybe<Array<Maybe<CommentRef>>>;
};

export enum HttpMethod {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Patch = 'PATCH',
  Delete = 'DELETE'
}

export type Column = {
  __typename?: 'Column';
  colID: Scalars['ID'];
  inProject: Project;
  name: Scalars['String'];
  /** @deprecated To order columns inside projects use Project.order */
  orderPreference?: Maybe<Scalars['Int']>;
  tickets?: Maybe<Array<Maybe<Ticket>>>;
  /** A JSON array storing the order of the tickets by id */
  order?: Maybe<Scalars['String']>;
  ticketsAggregate?: Maybe<TicketAggregateResult>;
};


export type ColumnInProjectArgs = {
  filter?: Maybe<ProjectFilter>;
};


export type ColumnTicketsArgs = {
  filter?: Maybe<TicketFilter>;
  order?: Maybe<TicketOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type ColumnTicketsAggregateArgs = {
  filter?: Maybe<TicketFilter>;
};

export type Project = {
  __typename?: 'Project';
  projID: Scalars['ID'];
  name: Scalars['String'];
  url?: Maybe<Scalars['String']>;
  ghOwner?: Maybe<Scalars['String']>;
  ghName?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  admin?: Maybe<User>;
  roles?: Maybe<Array<Maybe<Role>>>;
  columns?: Maybe<Array<Maybe<Column>>>;
  /** A JSON array storing the order of the columns by id */
  order?: Maybe<Scalars['String']>;
  rolesAggregate?: Maybe<RoleAggregateResult>;
  columnsAggregate?: Maybe<ColumnAggregateResult>;
};


export type ProjectAdminArgs = {
  filter?: Maybe<UserFilter>;
};


export type ProjectRolesArgs = {
  filter?: Maybe<RoleFilter>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type ProjectColumnsArgs = {
  filter?: Maybe<ColumnFilter>;
  order?: Maybe<ColumnOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type ProjectRolesAggregateArgs = {
  filter?: Maybe<RoleFilter>;
};


export type ProjectColumnsAggregateArgs = {
  filter?: Maybe<ColumnFilter>;
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

export type UpdateProjectPayload = {
  __typename?: 'UpdateProjectPayload';
  project?: Maybe<Array<Maybe<Project>>>;
  numUids?: Maybe<Scalars['Int']>;
};


export type UpdateProjectPayloadProjectArgs = {
  filter?: Maybe<ProjectFilter>;
  order?: Maybe<ProjectOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type PointListRef = {
  points: Array<PointRef>;
};

export type StringRange = {
  min: Scalars['String'];
  max: Scalars['String'];
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

export type Polygon = {
  __typename?: 'Polygon';
  coordinates: Array<PointList>;
};

export type IntersectsFilter = {
  polygon?: Maybe<PolygonRef>;
  multiPolygon?: Maybe<MultiPolygonRef>;
};

export type UpdateColumnPayload = {
  __typename?: 'UpdateColumnPayload';
  column?: Maybe<Array<Maybe<Column>>>;
  numUids?: Maybe<Scalars['Int']>;
};


export type UpdateColumnPayloadColumnArgs = {
  filter?: Maybe<ColumnFilter>;
  order?: Maybe<ColumnOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export enum ProjectHasFilter {
  Name = 'name',
  Url = 'url',
  GhOwner = 'ghOwner',
  GhName = 'ghName',
  Description = 'description',
  Admin = 'admin',
  Roles = 'roles',
  Columns = 'columns',
  Order = 'order'
}

export type AddCommentInput = {
  datetime: Scalars['DateTime'];
  text: Scalars['String'];
  onTicket?: Maybe<TicketRef>;
  author: UserRef;
};

export type UpdateRoleInput = {
  filter: RoleFilter;
  set?: Maybe<RolePatch>;
  remove?: Maybe<RolePatch>;
};

export type ColumnAggregateResult = {
  __typename?: 'ColumnAggregateResult';
  count?: Maybe<Scalars['Int']>;
  nameMin?: Maybe<Scalars['String']>;
  nameMax?: Maybe<Scalars['String']>;
  orderPreferenceMin?: Maybe<Scalars['Int']>;
  orderPreferenceMax?: Maybe<Scalars['Int']>;
  orderPreferenceSum?: Maybe<Scalars['Int']>;
  orderPreferenceAvg?: Maybe<Scalars['Float']>;
  orderMin?: Maybe<Scalars['String']>;
  orderMax?: Maybe<Scalars['String']>;
};

export type PointGeoFilter = {
  near?: Maybe<NearFilter>;
  within?: Maybe<WithinFilter>;
};

export type CommentOrder = {
  asc?: Maybe<CommentOrderable>;
  desc?: Maybe<CommentOrderable>;
  then?: Maybe<CommentOrder>;
};

export type CommentRef = {
  id?: Maybe<Scalars['ID']>;
  datetime?: Maybe<Scalars['DateTime']>;
  text?: Maybe<Scalars['String']>;
  onTicket?: Maybe<TicketRef>;
  author?: Maybe<UserRef>;
};

export type TicketOrder = {
  asc?: Maybe<TicketOrderable>;
  desc?: Maybe<TicketOrderable>;
  then?: Maybe<TicketOrder>;
};

export type UserFilter = {
  username?: Maybe<StringHashFilter>;
  has?: Maybe<UserHasFilter>;
  and?: Maybe<Array<Maybe<UserFilter>>>;
  or?: Maybe<Array<Maybe<UserFilter>>>;
  not?: Maybe<UserFilter>;
};

export type AuthRule = {
  and?: Maybe<Array<Maybe<AuthRule>>>;
  or?: Maybe<Array<Maybe<AuthRule>>>;
  not?: Maybe<AuthRule>;
  rule?: Maybe<Scalars['String']>;
};

export type Icon = {
  __typename?: 'Icon';
  src: Scalars['String'];
  type?: Maybe<Scalars['String']>;
  sizes?: Maybe<Scalars['String']>;
};

export type Point = {
  __typename?: 'Point';
  longitude: Scalars['Float'];
  latitude: Scalars['Float'];
};

export type PolygonRef = {
  coordinates: Array<PointListRef>;
};

export type GenerateQueryParams = {
  get?: Maybe<Scalars['Boolean']>;
  query?: Maybe<Scalars['Boolean']>;
  password?: Maybe<Scalars['Boolean']>;
  aggregate?: Maybe<Scalars['Boolean']>;
};

export type UserOrder = {
  asc?: Maybe<UserOrderable>;
  desc?: Maybe<UserOrderable>;
  then?: Maybe<UserOrder>;
};

export type Icons = {
  __typename?: 'Icons';
  domain?: Maybe<Scalars['String']>;
  icons?: Maybe<Array<Maybe<Icon>>>;
  error?: Maybe<Scalars['String']>;
};

export type UserAggregateResult = {
  __typename?: 'UserAggregateResult';
  count?: Maybe<Scalars['Int']>;
  usernameMin?: Maybe<Scalars['String']>;
  usernameMax?: Maybe<Scalars['String']>;
  displayNameMin?: Maybe<Scalars['String']>;
  displayNameMax?: Maybe<Scalars['String']>;
  imageMin?: Maybe<Scalars['String']>;
  imageMax?: Maybe<Scalars['String']>;
};

export enum RoleHasFilter {
  Permission = 'permission',
  AssignedTo = 'assignedTo'
}

export type AddProjectInput = {
  name: Scalars['String'];
  url?: Maybe<Scalars['String']>;
  ghOwner?: Maybe<Scalars['String']>;
  ghName?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  admin?: Maybe<UserRef>;
  roles?: Maybe<Array<Maybe<RoleRef>>>;
  columns?: Maybe<Array<Maybe<ColumnRef>>>;
  /** A JSON array storing the order of the columns by id */
  order?: Maybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  getProject?: Maybe<Project>;
  queryProject?: Maybe<Array<Maybe<Project>>>;
  aggregateProject?: Maybe<ProjectAggregateResult>;
  getColumn?: Maybe<Column>;
  queryColumn?: Maybe<Array<Maybe<Column>>>;
  aggregateColumn?: Maybe<ColumnAggregateResult>;
  getTicket?: Maybe<Ticket>;
  queryTicket?: Maybe<Array<Maybe<Ticket>>>;
  aggregateTicket?: Maybe<TicketAggregateResult>;
  getComment?: Maybe<Comment>;
  queryComment?: Maybe<Array<Maybe<Comment>>>;
  aggregateComment?: Maybe<CommentAggregateResult>;
};


export type SubscriptionGetProjectArgs = {
  projID: Scalars['ID'];
};


export type SubscriptionQueryProjectArgs = {
  filter?: Maybe<ProjectFilter>;
  order?: Maybe<ProjectOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type SubscriptionAggregateProjectArgs = {
  filter?: Maybe<ProjectFilter>;
};


export type SubscriptionGetColumnArgs = {
  colID: Scalars['ID'];
};


export type SubscriptionQueryColumnArgs = {
  filter?: Maybe<ColumnFilter>;
  order?: Maybe<ColumnOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type SubscriptionAggregateColumnArgs = {
  filter?: Maybe<ColumnFilter>;
};


export type SubscriptionGetTicketArgs = {
  id: Scalars['ID'];
};


export type SubscriptionQueryTicketArgs = {
  filter?: Maybe<TicketFilter>;
  order?: Maybe<TicketOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type SubscriptionAggregateTicketArgs = {
  filter?: Maybe<TicketFilter>;
};


export type SubscriptionGetCommentArgs = {
  id: Scalars['ID'];
};


export type SubscriptionQueryCommentArgs = {
  filter?: Maybe<CommentFilter>;
  order?: Maybe<CommentOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type SubscriptionAggregateCommentArgs = {
  filter?: Maybe<CommentFilter>;
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

export type PointRef = {
  longitude: Scalars['Float'];
  latitude: Scalars['Float'];
};

export type NearFilter = {
  distance: Scalars['Float'];
  coordinate: PointRef;
};

export type DeleteRolePayload = {
  __typename?: 'DeleteRolePayload';
  role?: Maybe<Array<Maybe<Role>>>;
  msg?: Maybe<Scalars['String']>;
  numUids?: Maybe<Scalars['Int']>;
};


export type DeleteRolePayloadRoleArgs = {
  filter?: Maybe<RoleFilter>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export enum ColumnOrderable {
  Name = 'name',
  OrderPreference = 'orderPreference',
  Order = 'order'
}

export enum ProjectOrderable {
  Name = 'name',
  Url = 'url',
  GhOwner = 'ghOwner',
  GhName = 'ghName',
  Description = 'description',
  Order = 'order'
}

export type Role = {
  __typename?: 'Role';
  id: Scalars['ID'];
  permission: Array<Permission>;
  assignedTo?: Maybe<Array<Maybe<User>>>;
  assignedToAggregate?: Maybe<UserAggregateResult>;
};


export type RoleAssignedToArgs = {
  filter?: Maybe<UserFilter>;
  order?: Maybe<UserOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type RoleAssignedToAggregateArgs = {
  filter?: Maybe<UserFilter>;
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

export enum UserOrderable {
  Username = 'username',
  DisplayName = 'displayName',
  Image = 'image'
}

export type UpdateCommentInput = {
  filter: CommentFilter;
  set?: Maybe<CommentPatch>;
  remove?: Maybe<CommentPatch>;
};

export type StringRegExpFilter = {
  regexp?: Maybe<Scalars['String']>;
};

export type FloatRange = {
  min: Scalars['Float'];
  max: Scalars['Float'];
};

export type CommentFilter = {
  id?: Maybe<Array<Scalars['ID']>>;
  datetime?: Maybe<DateTimeFilter>;
  has?: Maybe<CommentHasFilter>;
  and?: Maybe<Array<Maybe<CommentFilter>>>;
  or?: Maybe<Array<Maybe<CommentFilter>>>;
  not?: Maybe<CommentFilter>;
};

export type RoleRef = {
  id?: Maybe<Scalars['ID']>;
  permission?: Maybe<Array<Permission>>;
  assignedTo?: Maybe<Array<Maybe<UserRef>>>;
};

export type IntRange = {
  min: Scalars['Int'];
  max: Scalars['Int'];
};

export type PolygonGeoFilter = {
  near?: Maybe<NearFilter>;
  within?: Maybe<WithinFilter>;
  contains?: Maybe<ContainsFilter>;
  intersects?: Maybe<IntersectsFilter>;
};

export type RoleFilter = {
  id?: Maybe<Array<Scalars['ID']>>;
  permission?: Maybe<Permission_Hash>;
  has?: Maybe<RoleHasFilter>;
  and?: Maybe<Array<Maybe<RoleFilter>>>;
  or?: Maybe<Array<Maybe<RoleFilter>>>;
  not?: Maybe<RoleFilter>;
};

export type PointList = {
  __typename?: 'PointList';
  points: Array<Point>;
};

export type UpdateTicketPayload = {
  __typename?: 'UpdateTicketPayload';
  ticket?: Maybe<Array<Maybe<Ticket>>>;
  numUids?: Maybe<Scalars['Int']>;
};


export type UpdateTicketPayloadTicketArgs = {
  filter?: Maybe<TicketFilter>;
  order?: Maybe<TicketOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  getUser?: Maybe<User>;
  queryUser?: Maybe<Array<Maybe<User>>>;
  aggregateUser?: Maybe<UserAggregateResult>;
  getProject?: Maybe<Project>;
  queryProject?: Maybe<Array<Maybe<Project>>>;
  aggregateProject?: Maybe<ProjectAggregateResult>;
  getRole?: Maybe<Role>;
  queryRole?: Maybe<Array<Maybe<Role>>>;
  aggregateRole?: Maybe<RoleAggregateResult>;
  getColumn?: Maybe<Column>;
  queryColumn?: Maybe<Array<Maybe<Column>>>;
  aggregateColumn?: Maybe<ColumnAggregateResult>;
  getTicket?: Maybe<Ticket>;
  queryTicket?: Maybe<Array<Maybe<Ticket>>>;
  aggregateTicket?: Maybe<TicketAggregateResult>;
  getComment?: Maybe<Comment>;
  queryComment?: Maybe<Array<Maybe<Comment>>>;
  aggregateComment?: Maybe<CommentAggregateResult>;
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


export type QueryAggregateUserArgs = {
  filter?: Maybe<UserFilter>;
};


export type QueryGetProjectArgs = {
  projID: Scalars['ID'];
};


export type QueryQueryProjectArgs = {
  filter?: Maybe<ProjectFilter>;
  order?: Maybe<ProjectOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryAggregateProjectArgs = {
  filter?: Maybe<ProjectFilter>;
};


export type QueryGetRoleArgs = {
  id: Scalars['ID'];
};


export type QueryQueryRoleArgs = {
  filter?: Maybe<RoleFilter>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryAggregateRoleArgs = {
  filter?: Maybe<RoleFilter>;
};


export type QueryGetColumnArgs = {
  colID: Scalars['ID'];
};


export type QueryQueryColumnArgs = {
  filter?: Maybe<ColumnFilter>;
  order?: Maybe<ColumnOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryAggregateColumnArgs = {
  filter?: Maybe<ColumnFilter>;
};


export type QueryGetTicketArgs = {
  id: Scalars['ID'];
};


export type QueryQueryTicketArgs = {
  filter?: Maybe<TicketFilter>;
  order?: Maybe<TicketOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryAggregateTicketArgs = {
  filter?: Maybe<TicketFilter>;
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


export type QueryAggregateCommentArgs = {
  filter?: Maybe<CommentFilter>;
};

export type TicketFilter = {
  id?: Maybe<Array<Scalars['ID']>>;
  title?: Maybe<StringTermFilter>;
  datetime?: Maybe<DateTimeFilter>;
  has?: Maybe<TicketHasFilter>;
  and?: Maybe<Array<Maybe<TicketFilter>>>;
  or?: Maybe<Array<Maybe<TicketFilter>>>;
  not?: Maybe<TicketFilter>;
};

export type UpdateColumnInput = {
  filter: ColumnFilter;
  set?: Maybe<ColumnPatch>;
  remove?: Maybe<ColumnPatch>;
};

export type AddRolePayload = {
  __typename?: 'AddRolePayload';
  role?: Maybe<Array<Maybe<Role>>>;
  numUids?: Maybe<Scalars['Int']>;
};


export type AddRolePayloadRoleArgs = {
  filter?: Maybe<RoleFilter>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type AddRoleInput = {
  permission: Array<Permission>;
  assignedTo?: Maybe<Array<Maybe<UserRef>>>;
};

export enum Mode {
  Batch = 'BATCH',
  Single = 'SINGLE'
}

export type IntFilter = {
  eq?: Maybe<Scalars['Int']>;
  le?: Maybe<Scalars['Int']>;
  lt?: Maybe<Scalars['Int']>;
  ge?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  between?: Maybe<IntRange>;
};

export type StringExactFilter = {
  eq?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Maybe<Scalars['String']>>>;
  le?: Maybe<Scalars['String']>;
  lt?: Maybe<Scalars['String']>;
  ge?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  between?: Maybe<StringRange>;
};

export type CommentAggregateResult = {
  __typename?: 'CommentAggregateResult';
  count?: Maybe<Scalars['Int']>;
  datetimeMin?: Maybe<Scalars['DateTime']>;
  datetimeMax?: Maybe<Scalars['DateTime']>;
  textMin?: Maybe<Scalars['String']>;
  textMax?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addUser?: Maybe<AddUserPayload>;
  updateUser?: Maybe<UpdateUserPayload>;
  deleteUser?: Maybe<DeleteUserPayload>;
  addProject?: Maybe<AddProjectPayload>;
  updateProject?: Maybe<UpdateProjectPayload>;
  deleteProject?: Maybe<DeleteProjectPayload>;
  addRole?: Maybe<AddRolePayload>;
  updateRole?: Maybe<UpdateRolePayload>;
  deleteRole?: Maybe<DeleteRolePayload>;
  addColumn?: Maybe<AddColumnPayload>;
  updateColumn?: Maybe<UpdateColumnPayload>;
  deleteColumn?: Maybe<DeleteColumnPayload>;
  addTicket?: Maybe<AddTicketPayload>;
  updateTicket?: Maybe<UpdateTicketPayload>;
  deleteTicket?: Maybe<DeleteTicketPayload>;
  addComment?: Maybe<AddCommentPayload>;
  updateComment?: Maybe<UpdateCommentPayload>;
  deleteComment?: Maybe<DeleteCommentPayload>;
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


export type MutationAddProjectArgs = {
  input: Array<AddProjectInput>;
};


export type MutationUpdateProjectArgs = {
  input: UpdateProjectInput;
};


export type MutationDeleteProjectArgs = {
  filter: ProjectFilter;
};


export type MutationAddRoleArgs = {
  input: Array<AddRoleInput>;
};


export type MutationUpdateRoleArgs = {
  input: UpdateRoleInput;
};


export type MutationDeleteRoleArgs = {
  filter: RoleFilter;
};


export type MutationAddColumnArgs = {
  input: Array<AddColumnInput>;
};


export type MutationUpdateColumnArgs = {
  input: UpdateColumnInput;
};


export type MutationDeleteColumnArgs = {
  filter: ColumnFilter;
};


export type MutationAddTicketArgs = {
  input: Array<AddTicketInput>;
};


export type MutationUpdateTicketArgs = {
  input: UpdateTicketInput;
};


export type MutationDeleteTicketArgs = {
  filter: TicketFilter;
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

export type MultiPolygonRef = {
  polygons: Array<PolygonRef>;
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

export type AddTicketPayload = {
  __typename?: 'AddTicketPayload';
  ticket?: Maybe<Array<Maybe<Ticket>>>;
  numUids?: Maybe<Scalars['Int']>;
};


export type AddTicketPayloadTicketArgs = {
  filter?: Maybe<TicketFilter>;
  order?: Maybe<TicketOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type DeleteProjectPayload = {
  __typename?: 'DeleteProjectPayload';
  project?: Maybe<Array<Maybe<Project>>>;
  msg?: Maybe<Scalars['String']>;
  numUids?: Maybe<Scalars['Int']>;
};


export type DeleteProjectPayloadProjectArgs = {
  filter?: Maybe<ProjectFilter>;
  order?: Maybe<ProjectOrder>;
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

export type DateTimeRange = {
  min: Scalars['DateTime'];
  max: Scalars['DateTime'];
};

export type MultiPolygon = {
  __typename?: 'MultiPolygon';
  polygons: Array<Polygon>;
};

export type Int64Filter = {
  eq?: Maybe<Scalars['Int64']>;
  le?: Maybe<Scalars['Int64']>;
  lt?: Maybe<Scalars['Int64']>;
  ge?: Maybe<Scalars['Int64']>;
  gt?: Maybe<Scalars['Int64']>;
  between?: Maybe<Int64Range>;
};

export type RoleAggregateResult = {
  __typename?: 'RoleAggregateResult';
  count?: Maybe<Scalars['Int']>;
};

export type TicketPatch = {
  onColumn?: Maybe<ColumnRef>;
  title?: Maybe<Scalars['String']>;
  datetime?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  orderPreference?: Maybe<Scalars['Int']>;
  assigned?: Maybe<UserRef>;
  comments?: Maybe<Array<Maybe<CommentRef>>>;
};


export type DateTimeFilter = {
  eq?: Maybe<Scalars['DateTime']>;
  le?: Maybe<Scalars['DateTime']>;
  lt?: Maybe<Scalars['DateTime']>;
  ge?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  between?: Maybe<DateTimeRange>;
};

export type StringTermFilter = {
  allofterms?: Maybe<Scalars['String']>;
  anyofterms?: Maybe<Scalars['String']>;
};

export type AddColumnPayload = {
  __typename?: 'AddColumnPayload';
  column?: Maybe<Array<Maybe<Column>>>;
  numUids?: Maybe<Scalars['Int']>;
};


export type AddColumnPayloadColumnArgs = {
  filter?: Maybe<ColumnFilter>;
  order?: Maybe<ColumnOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type ProjectAggregateResult = {
  __typename?: 'ProjectAggregateResult';
  count?: Maybe<Scalars['Int']>;
  nameMin?: Maybe<Scalars['String']>;
  nameMax?: Maybe<Scalars['String']>;
  urlMin?: Maybe<Scalars['String']>;
  urlMax?: Maybe<Scalars['String']>;
  ghOwnerMin?: Maybe<Scalars['String']>;
  ghOwnerMax?: Maybe<Scalars['String']>;
  ghNameMin?: Maybe<Scalars['String']>;
  ghNameMax?: Maybe<Scalars['String']>;
  descriptionMin?: Maybe<Scalars['String']>;
  descriptionMax?: Maybe<Scalars['String']>;
  orderMin?: Maybe<Scalars['String']>;
  orderMax?: Maybe<Scalars['String']>;
};

export enum ColumnHasFilter {
  InProject = 'inProject',
  Name = 'name',
  OrderPreference = 'orderPreference',
  Tickets = 'tickets',
  Order = 'order'
}

export type AddTicketInput = {
  onColumn: ColumnRef;
  title: Scalars['String'];
  datetime?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  orderPreference?: Maybe<Scalars['Int']>;
  assigned?: Maybe<UserRef>;
  comments?: Maybe<Array<Maybe<CommentRef>>>;
};

export type UpdateProjectInput = {
  filter: ProjectFilter;
  set?: Maybe<ProjectPatch>;
  remove?: Maybe<ProjectPatch>;
};

export type Int64Range = {
  min: Scalars['Int64'];
  max: Scalars['Int64'];
};

export type DeleteColumnPayload = {
  __typename?: 'DeleteColumnPayload';
  column?: Maybe<Array<Maybe<Column>>>;
  msg?: Maybe<Scalars['String']>;
  numUids?: Maybe<Scalars['Int']>;
};


export type DeleteColumnPayloadColumnArgs = {
  filter?: Maybe<ColumnFilter>;
  order?: Maybe<ColumnOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type ColumnOrder = {
  asc?: Maybe<ColumnOrderable>;
  desc?: Maybe<ColumnOrderable>;
  then?: Maybe<ColumnOrder>;
};

export type ProjectPatch = {
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  ghOwner?: Maybe<Scalars['String']>;
  ghName?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  admin?: Maybe<UserRef>;
  roles?: Maybe<Array<Maybe<RoleRef>>>;
  columns?: Maybe<Array<Maybe<ColumnRef>>>;
  /** A JSON array storing the order of the columns by id */
  order?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  username: Scalars['String'];
  displayName?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  isAdmin?: Maybe<Scalars['Boolean']>;
  tickets?: Maybe<Array<Maybe<Ticket>>>;
  authoredComments?: Maybe<Array<Maybe<Comment>>>;
  ticketsAggregate?: Maybe<TicketAggregateResult>;
  authoredCommentsAggregate?: Maybe<CommentAggregateResult>;
};


export type UserTicketsArgs = {
  filter?: Maybe<TicketFilter>;
  order?: Maybe<TicketOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type UserAuthoredCommentsArgs = {
  filter?: Maybe<CommentFilter>;
  order?: Maybe<CommentOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type UserTicketsAggregateArgs = {
  filter?: Maybe<TicketFilter>;
};


export type UserAuthoredCommentsAggregateArgs = {
  filter?: Maybe<CommentFilter>;
};

export enum TicketHasFilter {
  OnColumn = 'onColumn',
  Title = 'title',
  Datetime = 'datetime',
  Description = 'description',
  OrderPreference = 'orderPreference',
  Assigned = 'assigned',
  Comments = 'comments'
}

export type AddColumnInput = {
  inProject: ProjectRef;
  name: Scalars['String'];
  orderPreference?: Maybe<Scalars['Int']>;
  tickets?: Maybe<Array<Maybe<TicketRef>>>;
  /** A JSON array storing the order of the tickets by id */
  order?: Maybe<Scalars['String']>;
};

export type ColumnFilter = {
  colID?: Maybe<Array<Scalars['ID']>>;
  has?: Maybe<ColumnHasFilter>;
  and?: Maybe<Array<Maybe<ColumnFilter>>>;
  or?: Maybe<Array<Maybe<ColumnFilter>>>;
  not?: Maybe<ColumnFilter>;
};

export type FloatFilter = {
  eq?: Maybe<Scalars['Float']>;
  le?: Maybe<Scalars['Float']>;
  lt?: Maybe<Scalars['Float']>;
  ge?: Maybe<Scalars['Float']>;
  gt?: Maybe<Scalars['Float']>;
  between?: Maybe<FloatRange>;
};

export enum Permission {
  View = 'VIEW',
  Edit = 'EDIT',
  Delete = 'DELETE'
}

export type Ticket = {
  __typename?: 'Ticket';
  id: Scalars['ID'];
  onColumn: Column;
  title: Scalars['String'];
  datetime?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  /** @deprecated To order tickets inside columns use Column.order */
  orderPreference?: Maybe<Scalars['Int']>;
  assigned?: Maybe<User>;
  comments?: Maybe<Array<Maybe<Comment>>>;
  commentsAggregate?: Maybe<CommentAggregateResult>;
};


export type TicketOnColumnArgs = {
  filter?: Maybe<ColumnFilter>;
};


export type TicketAssignedArgs = {
  filter?: Maybe<UserFilter>;
};


export type TicketCommentsArgs = {
  filter?: Maybe<CommentFilter>;
  order?: Maybe<CommentOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type TicketCommentsAggregateArgs = {
  filter?: Maybe<CommentFilter>;
};

export type DeleteTicketPayload = {
  __typename?: 'DeleteTicketPayload';
  ticket?: Maybe<Array<Maybe<Ticket>>>;
  msg?: Maybe<Scalars['String']>;
  numUids?: Maybe<Scalars['Int']>;
};


export type DeleteTicketPayloadTicketArgs = {
  filter?: Maybe<TicketFilter>;
  order?: Maybe<TicketOrder>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export enum CommentOrderable {
  Datetime = 'datetime',
  Text = 'text'
}

export type ColumnPatch = {
  inProject?: Maybe<ProjectRef>;
  name?: Maybe<Scalars['String']>;
  orderPreference?: Maybe<Scalars['Int']>;
  tickets?: Maybe<Array<Maybe<TicketRef>>>;
  /** A JSON array storing the order of the tickets by id */
  order?: Maybe<Scalars['String']>;
};

export type ProjectRef = {
  projID?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  ghOwner?: Maybe<Scalars['String']>;
  ghName?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  admin?: Maybe<UserRef>;
  roles?: Maybe<Array<Maybe<RoleRef>>>;
  columns?: Maybe<Array<Maybe<ColumnRef>>>;
  /** A JSON array storing the order of the columns by id */
  order?: Maybe<Scalars['String']>;
};

export type UpdateTicketInput = {
  filter: TicketFilter;
  set?: Maybe<TicketPatch>;
  remove?: Maybe<TicketPatch>;
};

export type UserPatch = {
  displayName?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  isAdmin?: Maybe<Scalars['Boolean']>;
  tickets?: Maybe<Array<Maybe<TicketRef>>>;
  authoredComments?: Maybe<Array<Maybe<CommentRef>>>;
};

export type WithinFilter = {
  polygon: PolygonRef;
};

export type StringHashFilter = {
  eq?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type ColumnRef = {
  colID?: Maybe<Scalars['ID']>;
  inProject?: Maybe<ProjectRef>;
  name?: Maybe<Scalars['String']>;
  orderPreference?: Maybe<Scalars['Int']>;
  tickets?: Maybe<Array<Maybe<TicketRef>>>;
  /** A JSON array storing the order of the tickets by id */
  order?: Maybe<Scalars['String']>;
};

export type ProjectOrder = {
  asc?: Maybe<ProjectOrderable>;
  desc?: Maybe<ProjectOrderable>;
  then?: Maybe<ProjectOrder>;
};

export type RolePatch = {
  permission?: Maybe<Array<Permission>>;
  assignedTo?: Maybe<Array<Maybe<UserRef>>>;
};

export type UpdateUserInput = {
  filter: UserFilter;
  set?: Maybe<UserPatch>;
  remove?: Maybe<UserPatch>;
};

export enum DgraphIndex {
  Int = 'int',
  Int64 = 'int64',
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
  Hour = 'hour',
  Geo = 'geo'
}

export type Comment = {
  __typename?: 'Comment';
  id: Scalars['ID'];
  datetime: Scalars['DateTime'];
  text: Scalars['String'];
  onTicket?: Maybe<Ticket>;
  author: User;
};


export type CommentOnTicketArgs = {
  filter?: Maybe<TicketFilter>;
};


export type CommentAuthorArgs = {
  filter?: Maybe<UserFilter>;
};
