/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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
   * The DateTime scalar type represents date and time as a string in RFC3339 format.
   * For example: "1985-04-12T23:20:50.52Z" represents 20 minutes and 50.52 seconds after the 23rd hour of April 12th, 1985 in UTC.
   */
  DateTime: any;
  /**
   * The Int64 scalar type represents a signed 64‐bit numeric non‐fractional value.
   * Int64 can represent values in range [-(2^63),(2^63 - 1)].
   */
  Int64: any;
};

export type AddCategoryInput = {
  name: Scalars['String'];
};

export type AddCategoryPayload = {
  __typename?: 'AddCategoryPayload';
  category?: Maybe<Array<Maybe<Category>>>;
  numUids?: Maybe<Scalars['Int']>;
};


export type AddCategoryPayloadCategoryArgs = {
  filter?: InputMaybe<CategoryFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<CategoryOrder>;
};

export type AddCityInput = {
  name: Scalars['String'];
  state?: InputMaybe<StateRef>;
};

export type AddCityPayload = {
  __typename?: 'AddCityPayload';
  city?: Maybe<Array<Maybe<City>>>;
  numUids?: Maybe<Scalars['Int']>;
};


export type AddCityPayloadCityArgs = {
  filter?: InputMaybe<CityFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<CityOrder>;
};

export type AddDonationInput = {
  amount?: InputMaybe<Scalars['Float']>;
  donor?: InputMaybe<DonorRef>;
  project?: InputMaybe<ProjectRef>;
};

export type AddDonationPayload = {
  __typename?: 'AddDonationPayload';
  donation?: Maybe<Array<Maybe<Donation>>>;
  numUids?: Maybe<Scalars['Int']>;
};


export type AddDonationPayloadDonationArgs = {
  filter?: InputMaybe<DonationFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<DonationOrder>;
};

export type AddDonorInput = {
  amount?: InputMaybe<Scalars['Float']>;
  donations?: InputMaybe<Array<InputMaybe<DonationRef>>>;
  name: Scalars['String'];
};

export type AddDonorPayload = {
  __typename?: 'AddDonorPayload';
  donor?: Maybe<Array<Maybe<Donor>>>;
  numUids?: Maybe<Scalars['Int']>;
};


export type AddDonorPayloadDonorArgs = {
  filter?: InputMaybe<DonorFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<DonorOrder>;
};

export type AddProjectInput = {
  category?: InputMaybe<CategoryRef>;
  donations?: InputMaybe<Array<InputMaybe<DonationRef>>>;
  grade?: InputMaybe<Scalars['String']>;
  school?: InputMaybe<SchoolRef>;
  title: Scalars['String'];
};

export type AddProjectPayload = {
  __typename?: 'AddProjectPayload';
  numUids?: Maybe<Scalars['Int']>;
  project?: Maybe<Array<Maybe<Project>>>;
};


export type AddProjectPayloadProjectArgs = {
  filter?: InputMaybe<ProjectFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<ProjectOrder>;
};

export type AddSchoolInput = {
  city?: InputMaybe<CityRef>;
  geoloc?: InputMaybe<PointRef>;
  name: Scalars['String'];
  projects?: InputMaybe<Array<InputMaybe<ProjectRef>>>;
  type: Scalars['String'];
};

export type AddSchoolPayload = {
  __typename?: 'AddSchoolPayload';
  numUids?: Maybe<Scalars['Int']>;
  school?: Maybe<Array<Maybe<School>>>;
};


export type AddSchoolPayloadSchoolArgs = {
  filter?: InputMaybe<SchoolFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<SchoolOrder>;
};

export type AddStateInput = {
  name: Scalars['String'];
};

export type AddStatePayload = {
  __typename?: 'AddStatePayload';
  numUids?: Maybe<Scalars['Int']>;
  state?: Maybe<Array<Maybe<State>>>;
};


export type AddStatePayloadStateArgs = {
  filter?: InputMaybe<StateFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<StateOrder>;
};

export type AuthRule = {
  and?: InputMaybe<Array<InputMaybe<AuthRule>>>;
  not?: InputMaybe<AuthRule>;
  or?: InputMaybe<Array<InputMaybe<AuthRule>>>;
  rule?: InputMaybe<Scalars['String']>;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type CategoryAggregateResult = {
  __typename?: 'CategoryAggregateResult';
  count?: Maybe<Scalars['Int']>;
  nameMax?: Maybe<Scalars['String']>;
  nameMin?: Maybe<Scalars['String']>;
};

export type CategoryFilter = {
  and?: InputMaybe<Array<InputMaybe<CategoryFilter>>>;
  has?: InputMaybe<Array<InputMaybe<CategoryHasFilter>>>;
  id?: InputMaybe<Array<Scalars['ID']>>;
  not?: InputMaybe<CategoryFilter>;
  or?: InputMaybe<Array<InputMaybe<CategoryFilter>>>;
};

export enum CategoryHasFilter {
  Name = 'name'
}

export type CategoryOrder = {
  asc?: InputMaybe<CategoryOrderable>;
  desc?: InputMaybe<CategoryOrderable>;
  then?: InputMaybe<CategoryOrder>;
};

export enum CategoryOrderable {
  Name = 'name'
}

export type CategoryPatch = {
  name?: InputMaybe<Scalars['String']>;
};

export type CategoryRef = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
};

export type City = {
  __typename?: 'City';
  name: Scalars['String'];
  state?: Maybe<State>;
};


export type CityStateArgs = {
  filter?: InputMaybe<StateFilter>;
};

export type CityAggregateResult = {
  __typename?: 'CityAggregateResult';
  count?: Maybe<Scalars['Int']>;
  nameMax?: Maybe<Scalars['String']>;
  nameMin?: Maybe<Scalars['String']>;
};

export type CityFilter = {
  and?: InputMaybe<Array<InputMaybe<CityFilter>>>;
  has?: InputMaybe<Array<InputMaybe<CityHasFilter>>>;
  name?: InputMaybe<StringHashFilter>;
  not?: InputMaybe<CityFilter>;
  or?: InputMaybe<Array<InputMaybe<CityFilter>>>;
};

export enum CityHasFilter {
  Name = 'name',
  State = 'state'
}

export type CityOrder = {
  asc?: InputMaybe<CityOrderable>;
  desc?: InputMaybe<CityOrderable>;
  then?: InputMaybe<CityOrder>;
};

export enum CityOrderable {
  Name = 'name'
}

export type CityPatch = {
  state?: InputMaybe<StateRef>;
};

export type CityRef = {
  name?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<StateRef>;
};

export type ContainsFilter = {
  point?: InputMaybe<PointRef>;
  polygon?: InputMaybe<PolygonRef>;
};

export type CustomHttp = {
  body?: InputMaybe<Scalars['String']>;
  forwardHeaders?: InputMaybe<Array<Scalars['String']>>;
  graphql?: InputMaybe<Scalars['String']>;
  introspectionHeaders?: InputMaybe<Array<Scalars['String']>>;
  method: HttpMethod;
  mode?: InputMaybe<Mode>;
  secretHeaders?: InputMaybe<Array<Scalars['String']>>;
  skipIntrospection?: InputMaybe<Scalars['Boolean']>;
  url: Scalars['String'];
};

export type DateTimeFilter = {
  between?: InputMaybe<DateTimeRange>;
  eq?: InputMaybe<Scalars['DateTime']>;
  ge?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  le?: InputMaybe<Scalars['DateTime']>;
  lt?: InputMaybe<Scalars['DateTime']>;
};

export type DateTimeRange = {
  max: Scalars['DateTime'];
  min: Scalars['DateTime'];
};

export type DeleteCategoryPayload = {
  __typename?: 'DeleteCategoryPayload';
  category?: Maybe<Array<Maybe<Category>>>;
  msg?: Maybe<Scalars['String']>;
  numUids?: Maybe<Scalars['Int']>;
};


export type DeleteCategoryPayloadCategoryArgs = {
  filter?: InputMaybe<CategoryFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<CategoryOrder>;
};

export type DeleteCityPayload = {
  __typename?: 'DeleteCityPayload';
  city?: Maybe<Array<Maybe<City>>>;
  msg?: Maybe<Scalars['String']>;
  numUids?: Maybe<Scalars['Int']>;
};


export type DeleteCityPayloadCityArgs = {
  filter?: InputMaybe<CityFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<CityOrder>;
};

export type DeleteDonationPayload = {
  __typename?: 'DeleteDonationPayload';
  donation?: Maybe<Array<Maybe<Donation>>>;
  msg?: Maybe<Scalars['String']>;
  numUids?: Maybe<Scalars['Int']>;
};


export type DeleteDonationPayloadDonationArgs = {
  filter?: InputMaybe<DonationFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<DonationOrder>;
};

export type DeleteDonorPayload = {
  __typename?: 'DeleteDonorPayload';
  donor?: Maybe<Array<Maybe<Donor>>>;
  msg?: Maybe<Scalars['String']>;
  numUids?: Maybe<Scalars['Int']>;
};


export type DeleteDonorPayloadDonorArgs = {
  filter?: InputMaybe<DonorFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<DonorOrder>;
};

export type DeleteProjectPayload = {
  __typename?: 'DeleteProjectPayload';
  msg?: Maybe<Scalars['String']>;
  numUids?: Maybe<Scalars['Int']>;
  project?: Maybe<Array<Maybe<Project>>>;
};


export type DeleteProjectPayloadProjectArgs = {
  filter?: InputMaybe<ProjectFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<ProjectOrder>;
};

export type DeleteSchoolPayload = {
  __typename?: 'DeleteSchoolPayload';
  msg?: Maybe<Scalars['String']>;
  numUids?: Maybe<Scalars['Int']>;
  school?: Maybe<Array<Maybe<School>>>;
};


export type DeleteSchoolPayloadSchoolArgs = {
  filter?: InputMaybe<SchoolFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<SchoolOrder>;
};

export type DeleteStatePayload = {
  __typename?: 'DeleteStatePayload';
  msg?: Maybe<Scalars['String']>;
  numUids?: Maybe<Scalars['Int']>;
  state?: Maybe<Array<Maybe<State>>>;
};


export type DeleteStatePayloadStateArgs = {
  filter?: InputMaybe<StateFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<StateOrder>;
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

export type Donation = {
  __typename?: 'Donation';
  amount?: Maybe<Scalars['Float']>;
  donor?: Maybe<Donor>;
  id: Scalars['ID'];
  project?: Maybe<Project>;
};


export type DonationDonorArgs = {
  filter?: InputMaybe<DonorFilter>;
};


export type DonationProjectArgs = {
  filter?: InputMaybe<ProjectFilter>;
};

export type DonationAggregateResult = {
  __typename?: 'DonationAggregateResult';
  amountAvg?: Maybe<Scalars['Float']>;
  amountMax?: Maybe<Scalars['Float']>;
  amountMin?: Maybe<Scalars['Float']>;
  amountSum?: Maybe<Scalars['Float']>;
  count?: Maybe<Scalars['Int']>;
};

export type DonationFilter = {
  and?: InputMaybe<Array<InputMaybe<DonationFilter>>>;
  has?: InputMaybe<Array<InputMaybe<DonationHasFilter>>>;
  id?: InputMaybe<Array<Scalars['ID']>>;
  not?: InputMaybe<DonationFilter>;
  or?: InputMaybe<Array<InputMaybe<DonationFilter>>>;
};

export enum DonationHasFilter {
  Amount = 'amount',
  Donor = 'donor',
  Project = 'project'
}

export type DonationOrder = {
  asc?: InputMaybe<DonationOrderable>;
  desc?: InputMaybe<DonationOrderable>;
  then?: InputMaybe<DonationOrder>;
};

export enum DonationOrderable {
  Amount = 'amount'
}

export type DonationPatch = {
  amount?: InputMaybe<Scalars['Float']>;
  donor?: InputMaybe<DonorRef>;
  project?: InputMaybe<ProjectRef>;
};

export type DonationRef = {
  amount?: InputMaybe<Scalars['Float']>;
  donor?: InputMaybe<DonorRef>;
  id?: InputMaybe<Scalars['ID']>;
  project?: InputMaybe<ProjectRef>;
};

export type Donor = {
  __typename?: 'Donor';
  amount?: Maybe<Scalars['Float']>;
  donations?: Maybe<Array<Maybe<Donation>>>;
  donationsAggregate?: Maybe<DonationAggregateResult>;
  id: Scalars['ID'];
  name: Scalars['String'];
};


export type DonorDonationsArgs = {
  filter?: InputMaybe<DonationFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<DonationOrder>;
};


export type DonorDonationsAggregateArgs = {
  filter?: InputMaybe<DonationFilter>;
};

export type DonorAggregateResult = {
  __typename?: 'DonorAggregateResult';
  amountAvg?: Maybe<Scalars['Float']>;
  amountMax?: Maybe<Scalars['Float']>;
  amountMin?: Maybe<Scalars['Float']>;
  amountSum?: Maybe<Scalars['Float']>;
  count?: Maybe<Scalars['Int']>;
  nameMax?: Maybe<Scalars['String']>;
  nameMin?: Maybe<Scalars['String']>;
};

export type DonorFilter = {
  and?: InputMaybe<Array<InputMaybe<DonorFilter>>>;
  has?: InputMaybe<Array<InputMaybe<DonorHasFilter>>>;
  id?: InputMaybe<Array<Scalars['ID']>>;
  name?: InputMaybe<StringTermFilter>;
  not?: InputMaybe<DonorFilter>;
  or?: InputMaybe<Array<InputMaybe<DonorFilter>>>;
};

export enum DonorHasFilter {
  Amount = 'amount',
  Donations = 'donations',
  Name = 'name'
}

export type DonorOrder = {
  asc?: InputMaybe<DonorOrderable>;
  desc?: InputMaybe<DonorOrderable>;
  then?: InputMaybe<DonorOrder>;
};

export enum DonorOrderable {
  Amount = 'amount',
  Name = 'name'
}

export type DonorPatch = {
  amount?: InputMaybe<Scalars['Float']>;
  donations?: InputMaybe<Array<InputMaybe<DonationRef>>>;
  name?: InputMaybe<Scalars['String']>;
};

export type DonorRef = {
  amount?: InputMaybe<Scalars['Float']>;
  donations?: InputMaybe<Array<InputMaybe<DonationRef>>>;
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
};

export type FloatFilter = {
  between?: InputMaybe<FloatRange>;
  eq?: InputMaybe<Scalars['Float']>;
  ge?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  le?: InputMaybe<Scalars['Float']>;
  lt?: InputMaybe<Scalars['Float']>;
};

export type FloatRange = {
  max: Scalars['Float'];
  min: Scalars['Float'];
};

export type GenerateMutationParams = {
  add?: InputMaybe<Scalars['Boolean']>;
  delete?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<Scalars['Boolean']>;
};

export type GenerateQueryParams = {
  aggregate?: InputMaybe<Scalars['Boolean']>;
  get?: InputMaybe<Scalars['Boolean']>;
  password?: InputMaybe<Scalars['Boolean']>;
  query?: InputMaybe<Scalars['Boolean']>;
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
  eq?: InputMaybe<Scalars['Int64']>;
  ge?: InputMaybe<Scalars['Int64']>;
  gt?: InputMaybe<Scalars['Int64']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int64']>>>;
  le?: InputMaybe<Scalars['Int64']>;
  lt?: InputMaybe<Scalars['Int64']>;
};

export type Int64Range = {
  max: Scalars['Int64'];
  min: Scalars['Int64'];
};

export type IntFilter = {
  between?: InputMaybe<IntRange>;
  eq?: InputMaybe<Scalars['Int']>;
  ge?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  le?: InputMaybe<Scalars['Int']>;
  lt?: InputMaybe<Scalars['Int']>;
};

export type IntRange = {
  max: Scalars['Int'];
  min: Scalars['Int'];
};

export type IntersectsFilter = {
  multiPolygon?: InputMaybe<MultiPolygonRef>;
  polygon?: InputMaybe<PolygonRef>;
};

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
  addCategory?: Maybe<AddCategoryPayload>;
  addCity?: Maybe<AddCityPayload>;
  addDonation?: Maybe<AddDonationPayload>;
  addDonor?: Maybe<AddDonorPayload>;
  addProject?: Maybe<AddProjectPayload>;
  addSchool?: Maybe<AddSchoolPayload>;
  addState?: Maybe<AddStatePayload>;
  deleteCategory?: Maybe<DeleteCategoryPayload>;
  deleteCity?: Maybe<DeleteCityPayload>;
  deleteDonation?: Maybe<DeleteDonationPayload>;
  deleteDonor?: Maybe<DeleteDonorPayload>;
  deleteProject?: Maybe<DeleteProjectPayload>;
  deleteSchool?: Maybe<DeleteSchoolPayload>;
  deleteState?: Maybe<DeleteStatePayload>;
  updateCategory?: Maybe<UpdateCategoryPayload>;
  updateCity?: Maybe<UpdateCityPayload>;
  updateDonation?: Maybe<UpdateDonationPayload>;
  updateDonor?: Maybe<UpdateDonorPayload>;
  updateProject?: Maybe<UpdateProjectPayload>;
  updateSchool?: Maybe<UpdateSchoolPayload>;
};


export type MutationAddCategoryArgs = {
  input: Array<AddCategoryInput>;
};


export type MutationAddCityArgs = {
  input: Array<AddCityInput>;
  upsert?: InputMaybe<Scalars['Boolean']>;
};


export type MutationAddDonationArgs = {
  input: Array<AddDonationInput>;
};


export type MutationAddDonorArgs = {
  input: Array<AddDonorInput>;
};


export type MutationAddProjectArgs = {
  input: Array<AddProjectInput>;
};


export type MutationAddSchoolArgs = {
  input: Array<AddSchoolInput>;
};


export type MutationAddStateArgs = {
  input: Array<AddStateInput>;
  upsert?: InputMaybe<Scalars['Boolean']>;
};


export type MutationDeleteCategoryArgs = {
  filter: CategoryFilter;
};


export type MutationDeleteCityArgs = {
  filter: CityFilter;
};


export type MutationDeleteDonationArgs = {
  filter: DonationFilter;
};


export type MutationDeleteDonorArgs = {
  filter: DonorFilter;
};


export type MutationDeleteProjectArgs = {
  filter: ProjectFilter;
};


export type MutationDeleteSchoolArgs = {
  filter: SchoolFilter;
};


export type MutationDeleteStateArgs = {
  filter: StateFilter;
};


export type MutationUpdateCategoryArgs = {
  input: UpdateCategoryInput;
};


export type MutationUpdateCityArgs = {
  input: UpdateCityInput;
};


export type MutationUpdateDonationArgs = {
  input: UpdateDonationInput;
};


export type MutationUpdateDonorArgs = {
  input: UpdateDonorInput;
};


export type MutationUpdateProjectArgs = {
  input: UpdateProjectInput;
};


export type MutationUpdateSchoolArgs = {
  input: UpdateSchoolInput;
};

export type NearFilter = {
  coordinate: PointRef;
  distance: Scalars['Float'];
};

export type Point = {
  __typename?: 'Point';
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
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
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
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

export type Project = {
  __typename?: 'Project';
  category?: Maybe<Category>;
  donations?: Maybe<Array<Maybe<Donation>>>;
  donationsAggregate?: Maybe<DonationAggregateResult>;
  grade?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  school?: Maybe<School>;
  title: Scalars['String'];
};


export type ProjectCategoryArgs = {
  filter?: InputMaybe<CategoryFilter>;
};


export type ProjectDonationsArgs = {
  filter?: InputMaybe<DonationFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<DonationOrder>;
};


export type ProjectDonationsAggregateArgs = {
  filter?: InputMaybe<DonationFilter>;
};


export type ProjectSchoolArgs = {
  filter?: InputMaybe<SchoolFilter>;
};

export type ProjectAggregateResult = {
  __typename?: 'ProjectAggregateResult';
  count?: Maybe<Scalars['Int']>;
  gradeMax?: Maybe<Scalars['String']>;
  gradeMin?: Maybe<Scalars['String']>;
  titleMax?: Maybe<Scalars['String']>;
  titleMin?: Maybe<Scalars['String']>;
};

export type ProjectFilter = {
  and?: InputMaybe<Array<InputMaybe<ProjectFilter>>>;
  grade?: InputMaybe<StringHashFilter>;
  has?: InputMaybe<Array<InputMaybe<ProjectHasFilter>>>;
  id?: InputMaybe<Array<Scalars['ID']>>;
  not?: InputMaybe<ProjectFilter>;
  or?: InputMaybe<Array<InputMaybe<ProjectFilter>>>;
  title?: InputMaybe<StringTermFilter>;
};

export enum ProjectHasFilter {
  Category = 'category',
  Donations = 'donations',
  Grade = 'grade',
  School = 'school',
  Title = 'title'
}

export type ProjectOrder = {
  asc?: InputMaybe<ProjectOrderable>;
  desc?: InputMaybe<ProjectOrderable>;
  then?: InputMaybe<ProjectOrder>;
};

export enum ProjectOrderable {
  Grade = 'grade',
  Title = 'title'
}

export type ProjectPatch = {
  category?: InputMaybe<CategoryRef>;
  donations?: InputMaybe<Array<InputMaybe<DonationRef>>>;
  grade?: InputMaybe<Scalars['String']>;
  school?: InputMaybe<SchoolRef>;
  title?: InputMaybe<Scalars['String']>;
};

export type ProjectRef = {
  category?: InputMaybe<CategoryRef>;
  donations?: InputMaybe<Array<InputMaybe<DonationRef>>>;
  grade?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  school?: InputMaybe<SchoolRef>;
  title?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  aggregateCategory?: Maybe<CategoryAggregateResult>;
  aggregateCity?: Maybe<CityAggregateResult>;
  aggregateDonation?: Maybe<DonationAggregateResult>;
  aggregateDonor?: Maybe<DonorAggregateResult>;
  aggregateProject?: Maybe<ProjectAggregateResult>;
  aggregateSchool?: Maybe<SchoolAggregateResult>;
  aggregateState?: Maybe<StateAggregateResult>;
  getCategory?: Maybe<Category>;
  getCity?: Maybe<City>;
  getDonation?: Maybe<Donation>;
  getDonor?: Maybe<Donor>;
  getProject?: Maybe<Project>;
  getSchool?: Maybe<School>;
  getState?: Maybe<State>;
  queryCategory?: Maybe<Array<Maybe<Category>>>;
  queryCity?: Maybe<Array<Maybe<City>>>;
  queryDonation?: Maybe<Array<Maybe<Donation>>>;
  queryDonor?: Maybe<Array<Maybe<Donor>>>;
  queryProject?: Maybe<Array<Maybe<Project>>>;
  querySchool?: Maybe<Array<Maybe<School>>>;
  queryState?: Maybe<Array<Maybe<State>>>;
};


export type QueryAggregateCategoryArgs = {
  filter?: InputMaybe<CategoryFilter>;
};


export type QueryAggregateCityArgs = {
  filter?: InputMaybe<CityFilter>;
};


export type QueryAggregateDonationArgs = {
  filter?: InputMaybe<DonationFilter>;
};


export type QueryAggregateDonorArgs = {
  filter?: InputMaybe<DonorFilter>;
};


export type QueryAggregateProjectArgs = {
  filter?: InputMaybe<ProjectFilter>;
};


export type QueryAggregateSchoolArgs = {
  filter?: InputMaybe<SchoolFilter>;
};


export type QueryAggregateStateArgs = {
  filter?: InputMaybe<StateFilter>;
};


export type QueryGetCategoryArgs = {
  id: Scalars['ID'];
};


export type QueryGetCityArgs = {
  name: Scalars['String'];
};


export type QueryGetDonationArgs = {
  id: Scalars['ID'];
};


export type QueryGetDonorArgs = {
  id: Scalars['ID'];
};


export type QueryGetProjectArgs = {
  id: Scalars['ID'];
};


export type QueryGetSchoolArgs = {
  id: Scalars['ID'];
};


export type QueryGetStateArgs = {
  name: Scalars['String'];
};


export type QueryQueryCategoryArgs = {
  filter?: InputMaybe<CategoryFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<CategoryOrder>;
};


export type QueryQueryCityArgs = {
  filter?: InputMaybe<CityFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<CityOrder>;
};


export type QueryQueryDonationArgs = {
  filter?: InputMaybe<DonationFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<DonationOrder>;
};


export type QueryQueryDonorArgs = {
  filter?: InputMaybe<DonorFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<DonorOrder>;
};


export type QueryQueryProjectArgs = {
  filter?: InputMaybe<ProjectFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<ProjectOrder>;
};


export type QueryQuerySchoolArgs = {
  filter?: InputMaybe<SchoolFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<SchoolOrder>;
};


export type QueryQueryStateArgs = {
  filter?: InputMaybe<StateFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<StateOrder>;
};

export type School = {
  __typename?: 'School';
  city?: Maybe<City>;
  geoloc?: Maybe<Point>;
  id: Scalars['ID'];
  name: Scalars['String'];
  projects?: Maybe<Array<Maybe<Project>>>;
  projectsAggregate?: Maybe<ProjectAggregateResult>;
  type: Scalars['String'];
};


export type SchoolCityArgs = {
  filter?: InputMaybe<CityFilter>;
};


export type SchoolProjectsArgs = {
  filter?: InputMaybe<ProjectFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<ProjectOrder>;
};


export type SchoolProjectsAggregateArgs = {
  filter?: InputMaybe<ProjectFilter>;
};

export type SchoolAggregateResult = {
  __typename?: 'SchoolAggregateResult';
  count?: Maybe<Scalars['Int']>;
  nameMax?: Maybe<Scalars['String']>;
  nameMin?: Maybe<Scalars['String']>;
  typeMax?: Maybe<Scalars['String']>;
  typeMin?: Maybe<Scalars['String']>;
};

export type SchoolFilter = {
  and?: InputMaybe<Array<InputMaybe<SchoolFilter>>>;
  has?: InputMaybe<Array<InputMaybe<SchoolHasFilter>>>;
  id?: InputMaybe<Array<Scalars['ID']>>;
  name?: InputMaybe<StringTermFilter>;
  not?: InputMaybe<SchoolFilter>;
  or?: InputMaybe<Array<InputMaybe<SchoolFilter>>>;
  type?: InputMaybe<StringHashFilter>;
};

export enum SchoolHasFilter {
  City = 'city',
  Geoloc = 'geoloc',
  Name = 'name',
  Projects = 'projects',
  Type = 'type'
}

export type SchoolOrder = {
  asc?: InputMaybe<SchoolOrderable>;
  desc?: InputMaybe<SchoolOrderable>;
  then?: InputMaybe<SchoolOrder>;
};

export enum SchoolOrderable {
  Name = 'name',
  Type = 'type'
}

export type SchoolPatch = {
  city?: InputMaybe<CityRef>;
  geoloc?: InputMaybe<PointRef>;
  name?: InputMaybe<Scalars['String']>;
  projects?: InputMaybe<Array<InputMaybe<ProjectRef>>>;
  type?: InputMaybe<Scalars['String']>;
};

export type SchoolRef = {
  city?: InputMaybe<CityRef>;
  geoloc?: InputMaybe<PointRef>;
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  projects?: InputMaybe<Array<InputMaybe<ProjectRef>>>;
  type?: InputMaybe<Scalars['String']>;
};

export type State = {
  __typename?: 'State';
  name: Scalars['String'];
};

export type StateAggregateResult = {
  __typename?: 'StateAggregateResult';
  count?: Maybe<Scalars['Int']>;
  nameMax?: Maybe<Scalars['String']>;
  nameMin?: Maybe<Scalars['String']>;
};

export type StateFilter = {
  and?: InputMaybe<Array<InputMaybe<StateFilter>>>;
  has?: InputMaybe<Array<InputMaybe<StateHasFilter>>>;
  name?: InputMaybe<StringHashFilter>;
  not?: InputMaybe<StateFilter>;
  or?: InputMaybe<Array<InputMaybe<StateFilter>>>;
};

export enum StateHasFilter {
  Name = 'name'
}

export type StateOrder = {
  asc?: InputMaybe<StateOrderable>;
  desc?: InputMaybe<StateOrderable>;
  then?: InputMaybe<StateOrder>;
};

export enum StateOrderable {
  Name = 'name'
}

export type StateRef = {
  name: Scalars['String'];
};

export type StringExactFilter = {
  between?: InputMaybe<StringRange>;
  eq?: InputMaybe<Scalars['String']>;
  ge?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  le?: InputMaybe<Scalars['String']>;
  lt?: InputMaybe<Scalars['String']>;
};

export type StringFullTextFilter = {
  alloftext?: InputMaybe<Scalars['String']>;
  anyoftext?: InputMaybe<Scalars['String']>;
};

export type StringHashFilter = {
  eq?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type StringRange = {
  max: Scalars['String'];
  min: Scalars['String'];
};

export type StringRegExpFilter = {
  regexp?: InputMaybe<Scalars['String']>;
};

export type StringTermFilter = {
  allofterms?: InputMaybe<Scalars['String']>;
  anyofterms?: InputMaybe<Scalars['String']>;
};

export type UpdateCategoryInput = {
  filter: CategoryFilter;
  remove?: InputMaybe<CategoryPatch>;
  set?: InputMaybe<CategoryPatch>;
};

export type UpdateCategoryPayload = {
  __typename?: 'UpdateCategoryPayload';
  category?: Maybe<Array<Maybe<Category>>>;
  numUids?: Maybe<Scalars['Int']>;
};


export type UpdateCategoryPayloadCategoryArgs = {
  filter?: InputMaybe<CategoryFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<CategoryOrder>;
};

export type UpdateCityInput = {
  filter: CityFilter;
  remove?: InputMaybe<CityPatch>;
  set?: InputMaybe<CityPatch>;
};

export type UpdateCityPayload = {
  __typename?: 'UpdateCityPayload';
  city?: Maybe<Array<Maybe<City>>>;
  numUids?: Maybe<Scalars['Int']>;
};


export type UpdateCityPayloadCityArgs = {
  filter?: InputMaybe<CityFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<CityOrder>;
};

export type UpdateDonationInput = {
  filter: DonationFilter;
  remove?: InputMaybe<DonationPatch>;
  set?: InputMaybe<DonationPatch>;
};

export type UpdateDonationPayload = {
  __typename?: 'UpdateDonationPayload';
  donation?: Maybe<Array<Maybe<Donation>>>;
  numUids?: Maybe<Scalars['Int']>;
};


export type UpdateDonationPayloadDonationArgs = {
  filter?: InputMaybe<DonationFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<DonationOrder>;
};

export type UpdateDonorInput = {
  filter: DonorFilter;
  remove?: InputMaybe<DonorPatch>;
  set?: InputMaybe<DonorPatch>;
};

export type UpdateDonorPayload = {
  __typename?: 'UpdateDonorPayload';
  donor?: Maybe<Array<Maybe<Donor>>>;
  numUids?: Maybe<Scalars['Int']>;
};


export type UpdateDonorPayloadDonorArgs = {
  filter?: InputMaybe<DonorFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<DonorOrder>;
};

export type UpdateProjectInput = {
  filter: ProjectFilter;
  remove?: InputMaybe<ProjectPatch>;
  set?: InputMaybe<ProjectPatch>;
};

export type UpdateProjectPayload = {
  __typename?: 'UpdateProjectPayload';
  numUids?: Maybe<Scalars['Int']>;
  project?: Maybe<Array<Maybe<Project>>>;
};


export type UpdateProjectPayloadProjectArgs = {
  filter?: InputMaybe<ProjectFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<ProjectOrder>;
};

export type UpdateSchoolInput = {
  filter: SchoolFilter;
  remove?: InputMaybe<SchoolPatch>;
  set?: InputMaybe<SchoolPatch>;
};

export type UpdateSchoolPayload = {
  __typename?: 'UpdateSchoolPayload';
  numUids?: Maybe<Scalars['Int']>;
  school?: Maybe<Array<Maybe<School>>>;
};


export type UpdateSchoolPayloadSchoolArgs = {
  filter?: InputMaybe<SchoolFilter>;
  first?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<SchoolOrder>;
};

export type WithinFilter = {
  polygon: PolygonRef;
};

export type SchoolItemFragment = { __typename?: 'School', id: string, name: string, type: string, projects?: Array<{ __typename?: 'Project', title: string } | null> | null };

export type SchoolsByTermQueryVariables = Exact<{
  term: Scalars['String'];
}>;


export type SchoolsByTermQuery = { __typename?: 'Query', querySchool?: Array<{ __typename?: 'School', id: string, name: string, type: string, projects?: Array<{ __typename?: 'Project', title: string } | null> | null } | null> | null };

export const SchoolItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SchoolItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"School"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"projects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<SchoolItemFragment, unknown>;
export const SchoolsByTermDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"schoolsByTerm"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"term"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"querySchool"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"allofterms"},"value":{"kind":"Variable","name":{"kind":"Name","value":"term"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"10"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SchoolItem"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SchoolItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"School"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"projects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<SchoolsByTermQuery, SchoolsByTermQueryVariables>;