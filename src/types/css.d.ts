interface CssModule {
  [key: string]: string;
}
declare module "*.module.css" {
  const module: CssModule;
  export default module;
}
declare module "*.module.scss" {
  const module: CssModule;
  export default module;
}
declare module "*.module.sass" {
  const module: CssModule;
  export default module;
}
