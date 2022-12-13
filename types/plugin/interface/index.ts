export default interface IGlueStackPlugin {
	name: string;
	getVersion(): string;
	getConfig(): string;
	getDockerFile(): string;
	getTemplateFolder(): string;
	runPostInstall(target: string): any;
	getEnv(): string;
	runBootstrap(): any;
}
