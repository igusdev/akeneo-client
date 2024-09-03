import { AxiosRequestConfig } from 'axios';


export type ClientParams = {
  /**
   * API host
   */
  url: string;
  /**
   * username
   */
  username: string;
  /**
   * password
   */
  password: string;
  /**
   * clientId of your app
   */
  clientId: string;
  /**
   * matching secret
   */
  secret: string;
  /**
   * Optional: axiosOptions (https://github.com/axios/axios#request-config)
   */
  axiosOptions?: AxiosRequestConfig;
};

export type PaginationType = 'page' | 'search_after';

export type ProductModelQueryParameters = {
  search?: string;
  scope?: string;
  locales?: string;
  attributes?: string;
  pagination_type?: PaginationType;
  page?: number;
  search_after?: string;
  limit?: number;
  with_count?: boolean;
};

export type CategoryQueryParameters = {
  search?: string;
  page?: number;
  limit?: number;
  with_count?: boolean;
};

export type AttributeQueryParameters = {
  search?: string;
  page?: number;
  limit?: number;
  with_count?: boolean;
};
export type AttributeOptionQueryParameters = {
  page?: number;
  limit?: number;
  with_count?: boolean;
};

export type ReferenceEntityQueryParameters = {
  search?: string;
  page?: number;
  limit?: number;
  with_count?: boolean;
};

export type FamilyQueryParameters = {
  search?: string;
  page?: number;
  limit?: number;
  with_count?: boolean;
};

export type FamilyVariantQueryParameters = {
  page?: number;
  limit?: number;
  with_count?: boolean;
};

export type ReferenceEntityRecordQueryParameters = {
  search_after?: string;
};
export type AssetFamilyQueryParameters = {
  search_after?: string;
};

export type AssetQueryParameters = {
  search?: string;
  channel?: string;
  locales?: string;
  search_after?: string;
};

export type ListResponse<T> = {
  items_count?: number;
  current_page?: number;
  items: T[];
};

type Association = {
  products: string[];
  product_models: string[];
  groups: string[];
};

export type ProductModel = {
  code: string;
  family: string;
  family_variant: string;
  parent?: string;
  categories: string[];
  values: Record<string, any>;
  created: string;
  updated: string;
  associations: Record<string, Association>;
  quantified_associations: Record<string, Association>;
  metadata: Record<string, any>;
};

export type ProductType = {
  identifier: string;
  uuid?: string;
  enabled: boolean;
  family: string;
  categories: string[];
  groups: string[];
  parent: string;
  values: Record<string, any>;
  associations: Record<string, Association>;
  created: string;
  updated: string;
  quantified_associations: Record<string, Association>;
  metadata: Record<string, any>;
};


export type Product<T extends ProductType = ProductType> = {
  identifier: string;
  uuid?: string;
  enabled: boolean;
  created: string;
  updated: string;
  family: T['family'];
  categories: T['categories'];
  groups: T['groups'];
  parent: T['parent'];
  values: T['values'];
  associations: T['associations'];
  quantified_associations: T['quantified_associations'];
  metadata: T['metadata'];
};

export type Family = {
  code: string;
  attribute_as_label: string;
  attribute_as_image: string;
  attributes: string[];
  attribute_requirements: Record<string, any>;
  labels: Record<string, any>;
};

type VariantAttributeSet = {
  level: number;
  attributes: string[];
  axes: string[];
};
export type Variant = {
  code: string;
  variant_attribute_sets: VariantAttributeSet[];
  labels: Record<string, any>;
};

export type Attribute = {
  code: string;
  type: string;
  labels: Record<string, string>;
  group: string;
  group_labels: Record<string, string>;
  sort_order: number;
  localizable: boolean;
  scopable: boolean;
  available_locales: string[];
  unique: boolean;
  useable_as_grid_filter: boolean;
  max_characters: number;
  validation_rule: string;
  validation_regexp: string;
  wysiwyg_enabled: boolean;
  number_min: string;
  number_max: string;
  decimals_allowed: boolean;
  negative_allowed: boolean;
  metric_family: string;
  default_metric_unit: string;
  date_min: string;
  date_max: string;
  allowed_extensions: string[];
  max_file_size: string;
  reference_data_name: string;
  default_value: boolean;
};

export type AttributeOption = {
  code: string;
  attribute: string;
  sort_order: number;
  labels: Record<string, string>;
};

type ValuesRecord = {
  locale: string;
  channel: string;
  data: string | string[];
};

export declare type KeyValueMap = Record<string, any>;

export type Entity = {
  code: string;
  labels: KeyValueMap;
};
export type EntityRecord = {
  code: string;
  values: Record<string, ValuesRecord[]>;
};

export type Category<T = KeyValueMap> = {
  code: string;
  parent?: string;
  labels: T;
};

export type AssetFamily = {
  code: string;
  labels: Record<string, string>;
  attribute_as_main_media: string;
  product_link_rules: Record<string, Record<string, string>>[];
  transformations: any[];
  naming_convention: {
    source: {
      property: string;
      channel: any;
      locale: any;
    };
    pattern: string;
    abort_asset_creation_on_error: boolean;
  };
};

export type Asset = {
  code: string;
  values: Record<string, ValuesRecord[]>;
};

export type ProductQueryParameters = {
  search?: string;
  scope?: string;
  locales?: string;
  attributes?: string;
  pagination_type?: PaginationType;
  page?: number;
  search_after?: string;
  limit?: number;
  with_count?: boolean;
  with_attribute_options?: boolean;
  with_quality_scores?: boolean;
};

export type SearchQueryOperator =
  | 'IN'
  | 'NOT IN'
  | 'IN OR UNCLASSIFIED'
  | 'IN CHILDREN'
  | 'NOT IN CHILDREN'
  | 'UNCLASSIFIED'
  | 'EMPTY'
  | 'NOT EMPTY'
  | '='
  | '!='
  | '<'
  | '<='
  | '>'
  | '>='
  | 'SINCE LAST N DAYS'
  | 'BETWEEN'
  | 'NOT_BETWEEN';

export type SearchProperty = {
  name: string;
};

export type DefaultSearchParam<T = any> = {
  scope?: string;
  locale?: string;
  values: T;
  name: string;
};

export type QualityScoreLevels = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
export type QualityScoreSearchParam = DefaultSearchParam<QualityScoreLevels> & {
  name: 'quality_scores';
  operation: Extract<SearchQueryOperator, 'IN' | 'NOT IN'>;
};

export type CategorySearchParam = DefaultSearchParam<string> & {
  name: 'categories';
  operation: Extract<
    SearchQueryOperator,
    | 'IN'
    | 'NOT IN'
    | 'IN OR UNCLASSIFIED'
    | 'IN CHILDREN'
    | 'NOT IN CHILDREN'
    | 'UNCLASSIFIED'
  >;
};

export type EnabledSearchParam = DefaultSearchParam<boolean> & {
  name: 'enabled';
  operation: Extract<SearchQueryOperator, '=' | '!='>;
};

export type CompletenessSearchParam = DefaultSearchParam<number> & {
  name: 'completeness';
  operation:
    | Extract<SearchQueryOperator, '<=' | '<' | '>' | '>=' | '=' | '!='>
    | 'GREATER THAN ON ALL LOCALES'
    | 'GREATER OR EQUALS THAN ON ALL LOCALES';
};

export type GroupSearchParam = DefaultSearchParam<number> & {
  name: 'group';
  operation: Extract<
    SearchQueryOperator,
    'IN' | 'NOT IN' | 'EMPTY' | 'NOT EMPTY'
  >;
};

export type CreatedSearchParam = DefaultSearchParam<number> & {
  name: 'group';
  operation: Extract<
    SearchQueryOperator,
    | '<='
    | '<'
    | '>'
    | '>='
    | '='
    | '!='
    | 'BETWEEN'
    | 'NOT BETWEEN'
    | 'SINCE LAST N DAYS'
  >;
};

export type ParentSearchParam = DefaultSearchParam<number> & {
  name: 'parent';
};

export type ProductSpecificSearchQuery<P extends Product> = {
  operation: SearchQueryOperator;
  scope?: string;
  locale?: string;
};

export type UndefinedPropertyQuery = {
  property: undefined;
  value: Array<undefined>;
};

export type DefaultProductSearchQuery<T extends DefaultSearchParam> = {
  operation: SearchQueryOperator;
  scope?: T['scope'];
  locale?: T['locale'];
  value: Array<T['values']>;
};

export type ProductSearchQueryList<P extends Product = Product> = {
  [K in keyof P['values']]: {values: P['values'][K] } & ProductSpecificSearchQuery<P>
}

export type DefaultSearchQueryList<T extends DefaultSearchParam> = Record<
  keyof T['values'],
  DefaultProductSearchQuery<T>
>;

export type DefaultSearchQueryLists = Record<
  QualityScoreSearchParam['name'],
  DefaultProductSearchQuery<QualityScoreSearchParam>
>;

export type SearchQueryList<P extends Product = Product> =
  | ProductSearchQueryList<P>
  | DefaultSearchQueryLists;

export type ProductQuery<P extends Product = Product> =
  | ProductQueryParameters
  | ProductQueryParameters & {
      search: SearchQueryList<P>;
      attributes: Array<keyof P['values']>;
    };

