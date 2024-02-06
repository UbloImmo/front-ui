export type BootstrapIconFile = {
  type: "bootstrap";
  name: string;
  svg: string;
};

export type CustomIconFile = {
  componentName: string;
  name: string;
  nodeId: string;
  svg: string;
  unknown?: boolean;
};

export type IconFileType = "custom" | "bootstrap";

export type NormalizedIconFileDeclaration = {
  name: string;
  svg: string;
  tsx: string;
  componentName: string;
  type: IconFileType;
};

export type FileDescription = {
  /**
   * Path of the file
   */
  path: string;
  /**
   * String content of the file
   */
  contents: string;
};
