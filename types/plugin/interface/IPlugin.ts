export default interface IPlugin {
	init(): any;
	destroy(): any;
	getName(): string;
	getVersion(): string;
	runPostInstall(instanceName: string, target: string): any;
	getTemplateFolderPath(): string;
}
