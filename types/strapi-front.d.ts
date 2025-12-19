// src/types/strapi/pageContent.ts
import type { paths, operations } from "@/types/strapi-api";

/**
 * Helpers
 */
type JsonOf<T> =
  T extends { content: { "application/json": infer J } } ? J : never;

type Ok200<T> =
  T extends { responses: { 200: infer R } } ? JsonOf<R> : never;

type ReqBody<T> =
  T extends { requestBody?: infer RB } ? JsonOf<NonNullable<RB>> : never;

/**
 * Operations (generated keys)
 */
type PageContentListOp = operations["page-content/get/page_contents"];
type PageContentCreateOp = operations["page-content/post/page_contents"];
type PageContentGetByIdOp = operations["page-content/get/page_contents_by_id"];
type PageContentUpdateByIdOp = operations["page-content/put/page_contents_by_id"];
type PageContentDeleteByIdOp = operations["page-content/delete/page_contents_by_id"];

/**
 * Query / Path params
 */
export type PageContentListQuery = NonNullable<PageContentListOp["parameters"]["query"]>;
export type PageContentGetByIdPath = PageContentGetByIdOp["parameters"]["path"]; // { id: string }
export type PageContentUpdateByIdPath = PageContentUpdateByIdOp["parameters"]["path"]; // { id: string }
export type PageContentDeleteByIdPath = PageContentDeleteByIdOp["parameters"]["path"]; // { id: string }

/**
 * Request bodies (JSON)
 * - Strapi形式: { data: {...} }
 */
export type PageContentCreateRequest = ReqBody<PageContentCreateOp>;
export type PageContentUpdateRequest = ReqBody<PageContentUpdateByIdOp>;

/**
 * Responses (200 JSON)
 */
export type PageContentListResponse = Ok200<PageContentListOp>; // { data: PageContent[] }
export type PageContentGetByIdResponse = Ok200<PageContentGetByIdOp>; // { data: PageContent }
export type PageContentCreateResponse = Ok200<PageContentCreateOp>; // { data: PageContent }
export type PageContentUpdateResponse = Ok200<PageContentUpdateByIdOp>; // { data: PageContent }
export type PageContentDeleteResponse = Ok200<PageContentDeleteByIdOp>; // { data: PageContent }

/**
 * Entity types (PageContent)
 * operationsのresponseから「中身のdata要素」を抜くのが一番ズレない
 */
export type PageContent =
  PageContentListResponse["data"][number];

export type PageContentSingle =
  PageContentGetByIdResponse["data"];

/**
 * もし paths 側から取りたいならこう書けます（operationsと同じ結果になるはず）
 */
export type PageContentListResponseFromPaths =
  paths["/page-contents"]["get"]["responses"][200]["content"]["application/json"];

export type PageContentCreateRequestFromPaths =
  paths["/page-contents"]["post"]["requestBody"]["content"]["application/json"];

export type postmanResponse = {
  initialArray: number[];
  sortedArray: number[];
  steps: number[][];
}