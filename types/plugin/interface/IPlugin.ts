export default interface IPlugin {
	getName(): string;
	getVersion(): string;
	runPostInstall(target: string): any;
	runBootstrap(): any;
	getTemplateFolderPath(): string;
}
