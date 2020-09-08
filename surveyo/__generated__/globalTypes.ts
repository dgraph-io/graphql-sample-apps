/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum FieldType {
  Date = "Date",
  NetPromoterScore = "NetPromoterScore",
  Rating = "Rating",
  SingleChoice = "SingleChoice",
  Text = "Text",
}

export interface AddFormInput {
  title: string;
  fields: FieldRef[];
  responses?: ResponseRef[] | null;
  creator: UserRef;
}

export interface AddResponseInput {
  form: FormRef;
  entries: EntryRef[];
}

export interface EntryRef {
  id?: string | null;
  field?: FieldRef | null;
  date?: any | null;
  netPromoterScore?: number | null;
  rating?: number | null;
  singleChoice?: FieldOptionRef | null;
  text?: string | null;
}

export interface FieldOptionRef {
  id?: string | null;
  order?: number | null;
  title?: string | null;
}

export interface FieldRef {
  id?: string | null;
  order?: number | null;
  type?: FieldType | null;
  form?: FormRef | null;
  entries?: EntryRef[] | null;
  title?: string | null;
  options?: FieldOptionRef[] | null;
  required?: boolean | null;
  count?: number | null;
}

export interface FormRef {
  id?: string | null;
  title?: string | null;
  fields?: FieldRef[] | null;
  responses?: ResponseRef[] | null;
  creator?: UserRef | null;
}

export interface ResponseRef {
  id?: string | null;
  form?: FormRef | null;
  entries?: EntryRef[] | null;
}

export interface UserRef {
  id?: string | null;
  email?: string | null;
  name?: string | null;
  forms?: (FormRef | null)[] | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
