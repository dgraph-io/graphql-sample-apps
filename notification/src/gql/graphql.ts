/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /**
   * The DateTime scalar type represents date and time as a string in RFC3339 format.
   * For example: "1985-04-12T23:20:50.52Z" represents 20 mins 50.52 secs after the 23rd hour of Apr 12th 1985 in UTC.
   */
  DateTime: { input: any; output: any; }
  /**
   * The Int64 scalar type represents a signed 64‐bit numeric non‐fractional value.
   * Int64 can represent values in range [-(2^63),(2^63 - 1)].
   */
  Int64: { input: any; output: any; }
};

export type AddMessageInboxInput = {
  Status?: InputMaybe<MessageStatus>;
  User: UserRef;
  message: MessageRef;
};

export type AddMessageInboxPayload = {
  __typename?: 'AddMessageInboxPayload';
  messageInbox?: Maybe<Array<Maybe<MessageInbox>>>;
  numUids?: Maybe<Scalars['Int']['output']>;
};


export type AddMessageInboxPayloadMessageInboxArgs = {
  filter?: InputMaybe<MessageInboxFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type AddMessageInput = {
  expire: Scalars['DateTime']['input'];
  issued: Scalars['DateTime']['input'];
  title: Scalars['String']['input'];
};

export type AddMessagePayload = {
  __typename?: 'AddMessagePayload';
  message?: Maybe<Array<Maybe<Message>>>;
  numUids?: Maybe<Scalars['Int']['output']>;
};


export type AddMessagePayloadMessageArgs = {
  filter?: InputMaybe<MessageFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<MessageOrder>;
};

export type AddUserInput = {
  email: Scalars['String']['input'];
};

export type AddUserPayload = {
  __typename?: 'AddUserPayload';
  numUids?: Maybe<Scalars['Int']['output']>;
  user?: Maybe<Array<Maybe<User>>>;
};


export type AddUserPayloadUserArgs = {
  filter?: InputMaybe<UserFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<UserOrder>;
};

export type AuthRule = {
  and?: InputMaybe<Array<InputMaybe<AuthRule>>>;
  not?: InputMaybe<AuthRule>;
  or?: InputMaybe<Array<InputMaybe<AuthRule>>>;
  rule?: InputMaybe<Scalars['String']['input']>;
};

export type ContainsFilter = {
  point?: InputMaybe<PointRef>;
  polygon?: InputMaybe<PolygonRef>;
};

export type CustomHttp = {
  body?: InputMaybe<Scalars['String']['input']>;
  forwardHeaders?: InputMaybe<Array<Scalars['String']['input']>>;
  graphql?: InputMaybe<Scalars['String']['input']>;
  introspectionHeaders?: InputMaybe<Array<Scalars['String']['input']>>;
  method: HttpMethod;
  mode?: InputMaybe<Mode>;
  secretHeaders?: InputMaybe<Array<Scalars['String']['input']>>;
  skipIntrospection?: InputMaybe<Scalars['Boolean']['input']>;
  url: Scalars['String']['input'];
};

export type DateTimeFilter = {
  between?: InputMaybe<DateTimeRange>;
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  ge?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  le?: InputMaybe<Scalars['DateTime']['input']>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type DateTimeRange = {
  max: Scalars['DateTime']['input'];
  min: Scalars['DateTime']['input'];
};

export type DeleteMessageInboxPayload = {
  __typename?: 'DeleteMessageInboxPayload';
  messageInbox?: Maybe<Array<Maybe<MessageInbox>>>;
  msg?: Maybe<Scalars['String']['output']>;
  numUids?: Maybe<Scalars['Int']['output']>;
};


export type DeleteMessageInboxPayloadMessageInboxArgs = {
  filter?: InputMaybe<MessageInboxFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type DeleteMessagePayload = {
  __typename?: 'DeleteMessagePayload';
  message?: Maybe<Array<Maybe<Message>>>;
  msg?: Maybe<Scalars['String']['output']>;
  numUids?: Maybe<Scalars['Int']['output']>;
};


export type DeleteMessagePayloadMessageArgs = {
  filter?: InputMaybe<MessageFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<MessageOrder>;
};

export type DeleteUserPayload = {
  __typename?: 'DeleteUserPayload';
  msg?: Maybe<Scalars['String']['output']>;
  numUids?: Maybe<Scalars['Int']['output']>;
  user?: Maybe<Array<Maybe<User>>>;
};


export type DeleteUserPayloadUserArgs = {
  filter?: InputMaybe<UserFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<UserOrder>;
};

export enum DgraphIndex {
  Bool = 'bool',
  Day = 'day',
  Exact = 'exact',
  Float = 'float',
  Fulltext = 'fulltext',
  Geo = 'geo',
  Hash = 'hash',
  Hour = 'hour',
  Int = 'int',
  Int64 = 'int64',
  Month = 'month',
  Regexp = 'regexp',
  Term = 'term',
  Trigram = 'trigram',
  Year = 'year'
}

export type FloatFilter = {
  between?: InputMaybe<FloatRange>;
  eq?: InputMaybe<Scalars['Float']['input']>;
  ge?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  le?: InputMaybe<Scalars['Float']['input']>;
  lt?: InputMaybe<Scalars['Float']['input']>;
};

export type FloatRange = {
  max: Scalars['Float']['input'];
  min: Scalars['Float']['input'];
};

export type GenerateMutationParams = {
  add?: InputMaybe<Scalars['Boolean']['input']>;
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  update?: InputMaybe<Scalars['Boolean']['input']>;
};

export type GenerateQueryParams = {
  aggregate?: InputMaybe<Scalars['Boolean']['input']>;
  get?: InputMaybe<Scalars['Boolean']['input']>;
  password?: InputMaybe<Scalars['Boolean']['input']>;
  query?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum HttpMethod {
  Delete = 'DELETE',
  Get = 'GET',
  Patch = 'PATCH',
  Post = 'POST',
  Put = 'PUT'
}

export type Int64Filter = {
  between?: InputMaybe<Int64Range>;
  eq?: InputMaybe<Scalars['Int64']['input']>;
  ge?: InputMaybe<Scalars['Int64']['input']>;
  gt?: InputMaybe<Scalars['Int64']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int64']['input']>>>;
  le?: InputMaybe<Scalars['Int64']['input']>;
  lt?: InputMaybe<Scalars['Int64']['input']>;
};

export type Int64Range = {
  max: Scalars['Int64']['input'];
  min: Scalars['Int64']['input'];
};

export type IntFilter = {
  between?: InputMaybe<IntRange>;
  eq?: InputMaybe<Scalars['Int']['input']>;
  ge?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  le?: InputMaybe<Scalars['Int']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
};

export type IntRange = {
  max: Scalars['Int']['input'];
  min: Scalars['Int']['input'];
};

export type IntersectsFilter = {
  multiPolygon?: InputMaybe<MultiPolygonRef>;
  polygon?: InputMaybe<PolygonRef>;
};

export type Message = {
  __typename?: 'Message';
  expire: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  issued: Scalars['DateTime']['output'];
  title: Scalars['String']['output'];
};

export type MessageAggregateResult = {
  __typename?: 'MessageAggregateResult';
  count?: Maybe<Scalars['Int']['output']>;
  expireMax?: Maybe<Scalars['DateTime']['output']>;
  expireMin?: Maybe<Scalars['DateTime']['output']>;
  issuedMax?: Maybe<Scalars['DateTime']['output']>;
  issuedMin?: Maybe<Scalars['DateTime']['output']>;
  titleMax?: Maybe<Scalars['String']['output']>;
  titleMin?: Maybe<Scalars['String']['output']>;
};

export type MessageFilter = {
  and?: InputMaybe<Array<InputMaybe<MessageFilter>>>;
  has?: InputMaybe<Array<InputMaybe<MessageHasFilter>>>;
  id?: InputMaybe<Array<Scalars['ID']['input']>>;
  not?: InputMaybe<MessageFilter>;
  or?: InputMaybe<Array<InputMaybe<MessageFilter>>>;
  title?: InputMaybe<StringTermFilter>;
};

export enum MessageHasFilter {
  Expire = 'expire',
  Issued = 'issued',
  Title = 'title'
}

export type MessageInbox = {
  __typename?: 'MessageInbox';
  Status?: Maybe<MessageStatus>;
  User: User;
  message: Message;
};


export type MessageInboxUserArgs = {
  filter?: InputMaybe<UserFilter>;
};


export type MessageInboxMessageArgs = {
  filter?: InputMaybe<MessageFilter>;
};

export type MessageInboxAggregateResult = {
  __typename?: 'MessageInboxAggregateResult';
  count?: Maybe<Scalars['Int']['output']>;
};

export type MessageInboxFilter = {
  and?: InputMaybe<Array<InputMaybe<MessageInboxFilter>>>;
  has?: InputMaybe<Array<InputMaybe<MessageInboxHasFilter>>>;
  not?: InputMaybe<MessageInboxFilter>;
  or?: InputMaybe<Array<InputMaybe<MessageInboxFilter>>>;
};

export enum MessageInboxHasFilter {
  Status = 'Status',
  User = 'User',
  Message = 'message'
}

export type MessageInboxPatch = {
  Status?: InputMaybe<MessageStatus>;
  User?: InputMaybe<UserRef>;
  message?: InputMaybe<MessageRef>;
};

export type MessageInboxRef = {
  Status?: InputMaybe<MessageStatus>;
  User?: InputMaybe<UserRef>;
  message?: InputMaybe<MessageRef>;
};

export type MessageOrder = {
  asc?: InputMaybe<MessageOrderable>;
  desc?: InputMaybe<MessageOrderable>;
  then?: InputMaybe<MessageOrder>;
};

export enum MessageOrderable {
  Expire = 'expire',
  Issued = 'issued',
  Title = 'title'
}

export type MessagePatch = {
  expire?: InputMaybe<Scalars['DateTime']['input']>;
  issued?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type MessageRef = {
  expire?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  issued?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export enum MessageStatus {
  Read = 'read',
  Unread = 'unread'
}

export enum Mode {
  Batch = 'BATCH',
  Single = 'SINGLE'
}

export type MultiPolygon = {
  __typename?: 'MultiPolygon';
  polygons: Array<Polygon>;
};

export type MultiPolygonRef = {
  polygons: Array<PolygonRef>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addMessage?: Maybe<AddMessagePayload>;
  addMessageInbox?: Maybe<AddMessageInboxPayload>;
  addUser?: Maybe<AddUserPayload>;
  deleteMessage?: Maybe<DeleteMessagePayload>;
  deleteMessageInbox?: Maybe<DeleteMessageInboxPayload>;
  deleteUser?: Maybe<DeleteUserPayload>;
  updateMessage?: Maybe<UpdateMessagePayload>;
  updateMessageInbox?: Maybe<UpdateMessageInboxPayload>;
};


export type MutationAddMessageArgs = {
  input: Array<AddMessageInput>;
};


export type MutationAddMessageInboxArgs = {
  input: Array<AddMessageInboxInput>;
};


export type MutationAddUserArgs = {
  input: Array<AddUserInput>;
  upsert?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationDeleteMessageArgs = {
  filter: MessageFilter;
};


export type MutationDeleteMessageInboxArgs = {
  filter: MessageInboxFilter;
};


export type MutationDeleteUserArgs = {
  filter: UserFilter;
};


export type MutationUpdateMessageArgs = {
  input: UpdateMessageInput;
};


export type MutationUpdateMessageInboxArgs = {
  input: UpdateMessageInboxInput;
};

export type NearFilter = {
  coordinate: PointRef;
  distance: Scalars['Float']['input'];
};

export type Point = {
  __typename?: 'Point';
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
};

export type PointGeoFilter = {
  near?: InputMaybe<NearFilter>;
  within?: InputMaybe<WithinFilter>;
};

export type PointList = {
  __typename?: 'PointList';
  points: Array<Point>;
};

export type PointListRef = {
  points: Array<PointRef>;
};

export type PointRef = {
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
};

export type Polygon = {
  __typename?: 'Polygon';
  coordinates: Array<PointList>;
};

export type PolygonGeoFilter = {
  contains?: InputMaybe<ContainsFilter>;
  intersects?: InputMaybe<IntersectsFilter>;
  near?: InputMaybe<NearFilter>;
  within?: InputMaybe<WithinFilter>;
};

export type PolygonRef = {
  coordinates: Array<PointListRef>;
};

export type Query = {
  __typename?: 'Query';
  aggregateMessage?: Maybe<MessageAggregateResult>;
  aggregateMessageInbox?: Maybe<MessageInboxAggregateResult>;
  aggregateUser?: Maybe<UserAggregateResult>;
  getMessage?: Maybe<Message>;
  getUser?: Maybe<User>;
  queryMessage?: Maybe<Array<Maybe<Message>>>;
  queryMessageInbox?: Maybe<Array<Maybe<MessageInbox>>>;
  queryUser?: Maybe<Array<Maybe<User>>>;
};


export type QueryAggregateMessageArgs = {
  filter?: InputMaybe<MessageFilter>;
};


export type QueryAggregateMessageInboxArgs = {
  filter?: InputMaybe<MessageInboxFilter>;
};


export type QueryAggregateUserArgs = {
  filter?: InputMaybe<UserFilter>;
};


export type QueryGetMessageArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetUserArgs = {
  email: Scalars['String']['input'];
};


export type QueryQueryMessageArgs = {
  filter?: InputMaybe<MessageFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<MessageOrder>;
};


export type QueryQueryMessageInboxArgs = {
  filter?: InputMaybe<MessageInboxFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryQueryUserArgs = {
  filter?: InputMaybe<UserFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<UserOrder>;
};

export type StringExactFilter = {
  between?: InputMaybe<StringRange>;
  eq?: InputMaybe<Scalars['String']['input']>;
  ge?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  le?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
};

export type StringFullTextFilter = {
  alloftext?: InputMaybe<Scalars['String']['input']>;
  anyoftext?: InputMaybe<Scalars['String']['input']>;
};

export type StringHashFilter = {
  eq?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type StringRange = {
  max: Scalars['String']['input'];
  min: Scalars['String']['input'];
};

export type StringRegExpFilter = {
  regexp?: InputMaybe<Scalars['String']['input']>;
};

export type StringTermFilter = {
  allofterms?: InputMaybe<Scalars['String']['input']>;
  anyofterms?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateMessageInboxInput = {
  filter: MessageInboxFilter;
  remove?: InputMaybe<MessageInboxPatch>;
  set?: InputMaybe<MessageInboxPatch>;
};

export type UpdateMessageInboxPayload = {
  __typename?: 'UpdateMessageInboxPayload';
  messageInbox?: Maybe<Array<Maybe<MessageInbox>>>;
  numUids?: Maybe<Scalars['Int']['output']>;
};


export type UpdateMessageInboxPayloadMessageInboxArgs = {
  filter?: InputMaybe<MessageInboxFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateMessageInput = {
  filter: MessageFilter;
  remove?: InputMaybe<MessagePatch>;
  set?: InputMaybe<MessagePatch>;
};

export type UpdateMessagePayload = {
  __typename?: 'UpdateMessagePayload';
  message?: Maybe<Array<Maybe<Message>>>;
  numUids?: Maybe<Scalars['Int']['output']>;
};


export type UpdateMessagePayloadMessageArgs = {
  filter?: InputMaybe<MessageFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<MessageOrder>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
};

export type UserAggregateResult = {
  __typename?: 'UserAggregateResult';
  count?: Maybe<Scalars['Int']['output']>;
  emailMax?: Maybe<Scalars['String']['output']>;
  emailMin?: Maybe<Scalars['String']['output']>;
};

export type UserFilter = {
  and?: InputMaybe<Array<InputMaybe<UserFilter>>>;
  email?: InputMaybe<StringHashFilter>;
  has?: InputMaybe<Array<InputMaybe<UserHasFilter>>>;
  not?: InputMaybe<UserFilter>;
  or?: InputMaybe<Array<InputMaybe<UserFilter>>>;
};

export enum UserHasFilter {
  Email = 'email'
}

export type UserOrder = {
  asc?: InputMaybe<UserOrderable>;
  desc?: InputMaybe<UserOrderable>;
  then?: InputMaybe<UserOrder>;
};

export enum UserOrderable {
  Email = 'email'
}

export type UserRef = {
  email: Scalars['String']['input'];
};

export type WithinFilter = {
  polygon: PolygonRef;
};

export type MessageItemFragment = { __typename?: 'Message', id: string, title: string, issued: any, expire: any };

export type AllMessagesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllMessagesQuery = { __typename?: 'Query', queryMessage?: Array<{ __typename?: 'Message', id: string, title: string, issued: any, expire: any } | null> | null };

export const MessageItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MessageItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Message"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"issued"}},{"kind":"Field","name":{"kind":"Name","value":"expire"}}]}}]} as unknown as DocumentNode<MessageItemFragment, unknown>;
export const AllMessagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"allMessages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"queryMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"10"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MessageItem"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MessageItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Message"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"issued"}},{"kind":"Field","name":{"kind":"Name","value":"expire"}}]}}]} as unknown as DocumentNode<AllMessagesQuery, AllMessagesQueryVariables>;