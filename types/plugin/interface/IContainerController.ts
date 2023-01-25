import IApp from '../../app/interface/IApp';
import IInstance from './IInstance';

export interface IRoutes {
	method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS" | "CONNECT" | "TRACE";
	path: string;
}

export default interface IContainerController {
	app: IApp;
	status: 'up' | 'down';
	portNumber: number;
	containerId: string;
	callerInstance: IInstance;
	getCallerInstance(): IInstance;
	getEnv(): any;
	getDockerJson(): any;
	getStatus(): 'up' | 'down';
	setStatus(status: 'up' | 'down'): 'up' | 'down';
	getContainerId(): string;
	getPortNumber(): number;
	getConfig(): any;
	up(): any;
	down(): any;
	build(): any;

	watch?: () => Promise<string[]>;
	getRoutes?: () => Promise<IRoutes[]>;
}
