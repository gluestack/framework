export default interface IGlueStackCreatesPluginInstance {
	getName(): string;
	getVersion(): string;
	runPostInstall(target: string): any;
	runBootstrap(): any;
	getTemplateFolderPath(): string;
}
