export interface WrapperConfig {
  remoteName: string;
  exposedModule: string;
  elementName: string;
}

export const defaultWrapperConfig: WrapperConfig = {
  remoteName: '',
  exposedModule: '',
  elementName: ''
};