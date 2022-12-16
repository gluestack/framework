import IInstance from './IInstance';

export default interface IContainerController {
	app: any;
	callerInstance: IInstance;
	getCallerInstance(): IInstance;
	getEnv(): any;
	getDockerJson(): any;
}
