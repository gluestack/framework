import IApp from '../../app/interface/IApp';
import IInstance from './IInstance';

export default interface IContainerController {
	app: IApp;
	callerInstance: IInstance;
	getCallerInstance(): IInstance;
	getEnv(): any;
	getDockerJson(): any;
}
