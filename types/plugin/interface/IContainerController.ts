import IApp from '../../app/interface/IApp';
import IInstance from './IInstance';

export default interface IContainerController {
	app: IApp;
	status: 'up' | 'down';
	portNumber: string;
	containerId: string;
	callerInstance: IInstance;
	getCallerInstance(): IInstance;
	getEnv(): any;
	getDockerJson(): any;
	getStatus(): 'up' | 'down';
	getContainerId(): string;
	getPortNumber(): string;
	getConfig(): any;
	up(): any;
	down(): any;
	build(): any;
}
