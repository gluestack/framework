import IInstance from './IInstance';

export default interface IManagesInstances {
	instances: IInstance[];
	createInstance(key: string): IInstance;
	getInstances(): IInstance[];
}
