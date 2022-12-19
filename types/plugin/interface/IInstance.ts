import IPlugin from './IPlugin';
import IApp from '../../app/interface/IApp';
import IGlueStorePlugin from '../../store/interface/IGluePluginStore';

export default interface IInstance {
	app: IApp;
	name: string;
	callerPlugin: IPlugin;
	gluePluginStore: IGlueStorePlugin;
	init(): any;
	destroy(): any;
	getName(): string;
	getCallerPlugin(): IPlugin;
	isOfTypeInstance: boolean;
}
