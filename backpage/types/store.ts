export type LayoutSize = 'small' | 'middle' | 'large'
export type LanguageType = 'ja' | 'zh' | 'en'
export interface ThemeConfigProp {
	primary: string;
	isDark: boolean;
	weakOrGray: string;
	breadcrumb: boolean;
	tabs: boolean;
	footer: boolean;
}