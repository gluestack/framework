import IGlueStorePlugin from '../../store/interface/IGluePluginStore';

export default interface IPlugin {
	gluePluginStore: IGlueStorePlugin;
	init(): any;
	destroy(): any;
	getName(): string;
	getVersion(): string;
	runPostInstall(instanceName: string, target: string): any;
	getTemplateFolderPath(): string;
}
