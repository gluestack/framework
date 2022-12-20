import IInstance from './IInstance';
import IGlueStorePlugin from '../../store/interface/IGluePluginStore';

export default interface IManagesInstances {
	instances: IInstance[];
	createInstance(
		key: string,
		gluePluginStore: IGlueStorePlugin,
		installationPath: string
	): IInstance;
	getInstances(): IInstance[];
}
