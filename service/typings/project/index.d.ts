interface PackageJson {
  name: string;
  version: string;
  description?: string;
  keywords?: string[];
  homepage?: string;
  repository?: {
    type: string;
    url: string;
  };
  author?: string | AuthorInfo;
  contributors?: string[] | AuthorInfo[];
  license?: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  scripts: Record<string, string>;
  main?: string;
  typings?: string;
  files?: string[];
  bin?: Record<string, string>;
  engines?: Record<string, string>;
  private?: boolean;
}
