import IInstance from './IInstance';
import IGlueStorePlugin from '../../store/interface/IGluePluginStore';

export default interface IManagesInstances {
	instances: IInstance[];
	createInstance(
		key: string,
		gluePluginStore: IGlueStorePlugin
	): IInstance;
	getInstances(): IInstance[];
}
