export default interface IPlugin {
	init(): any;
	destroy(): any;
	getName(): string;
	getVersion(): string;
	runPostInstall(target: string): any;
	getTemplateFolderPath(): string;
}
