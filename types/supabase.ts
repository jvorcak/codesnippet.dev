/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/": {
    get: {
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/snippets": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.snippets.id"];
          created_at?: parameters["rowFilter.snippets.created_at"];
          content?: parameters["rowFilter.snippets.content"];
          /** Author of a snippet */
          author?: parameters["rowFilter.snippets.author"];
          /** Title of a snippet */
          title?: parameters["rowFilter.snippets.title"];
          slug?: parameters["rowFilter.snippets.slug"];
          imagePath?: parameters["rowFilter.snippets.imagePath"];
          updated_at?: parameters["rowFilter.snippets.updated_at"];
          imageLayout?: parameters["rowFilter.snippets.imageLayout"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["snippets"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** snippets */
          snippets?: definitions["snippets"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.snippets.id"];
          created_at?: parameters["rowFilter.snippets.created_at"];
          content?: parameters["rowFilter.snippets.content"];
          /** Author of a snippet */
          author?: parameters["rowFilter.snippets.author"];
          /** Title of a snippet */
          title?: parameters["rowFilter.snippets.title"];
          slug?: parameters["rowFilter.snippets.slug"];
          imagePath?: parameters["rowFilter.snippets.imagePath"];
          updated_at?: parameters["rowFilter.snippets.updated_at"];
          imageLayout?: parameters["rowFilter.snippets.imageLayout"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.snippets.id"];
          created_at?: parameters["rowFilter.snippets.created_at"];
          content?: parameters["rowFilter.snippets.content"];
          /** Author of a snippet */
          author?: parameters["rowFilter.snippets.author"];
          /** Title of a snippet */
          title?: parameters["rowFilter.snippets.title"];
          slug?: parameters["rowFilter.snippets.slug"];
          imagePath?: parameters["rowFilter.snippets.imagePath"];
          updated_at?: parameters["rowFilter.snippets.updated_at"];
          imageLayout?: parameters["rowFilter.snippets.imageLayout"];
        };
        body: {
          /** snippets */
          snippets?: definitions["snippets"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
}

export interface definitions {
  snippets: {
    /**
     * Format: bigint
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    created_at?: string;
    /** Format: text */
    content?: string;
    /**
     * Format: uuid
     * @description Author of a snippet
     * @default auth.uid()
     */
    author: string;
    /**
     * Format: character varying
     * @description Title of a snippet
     */
    title?: string;
    /** Format: character varying */
    slug: string;
    /** Format: text */
    imagePath?: string;
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    updated_at: string;
    /** Format: json */
    imageLayout?: unknown;
  };
}

export interface parameters {
  /**
   * @description Preference
   * @enum {string}
   */
  preferParams: "params=single-object";
  /**
   * @description Preference
   * @enum {string}
   */
  preferReturn: "return=representation" | "return=minimal" | "return=none";
  /**
   * @description Preference
   * @enum {string}
   */
  preferCount: "count=none";
  /** @description Filtering Columns */
  select: string;
  /** @description On Conflict */
  on_conflict: string;
  /** @description Ordering */
  order: string;
  /** @description Limiting and Pagination */
  range: string;
  /**
   * @description Limiting and Pagination
   * @default items
   */
  rangeUnit: string;
  /** @description Limiting and Pagination */
  offset: string;
  /** @description Limiting and Pagination */
  limit: string;
  /** @description snippets */
  "body.snippets": definitions["snippets"];
  /** Format: bigint */
  "rowFilter.snippets.id": string;
  /** Format: timestamp with time zone */
  "rowFilter.snippets.created_at": string;
  /** Format: text */
  "rowFilter.snippets.content": string;
  /**
   * Format: uuid
   * @description Author of a snippet
   */
  "rowFilter.snippets.author": string;
  /**
   * Format: character varying
   * @description Title of a snippet
   */
  "rowFilter.snippets.title": string;
  /** Format: character varying */
  "rowFilter.snippets.slug": string;
  /** Format: text */
  "rowFilter.snippets.imagePath": string;
  /** Format: timestamp with time zone */
  "rowFilter.snippets.updated_at": string;
  /** Format: json */
  "rowFilter.snippets.imageLayout": string;
}

export interface operations {}

export interface external {}
