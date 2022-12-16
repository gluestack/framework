import IPlugin from './IPlugin';

export default interface IInstance {
	app: any;
	name: string;
	callerPlugin: IPlugin;
	init(): any;
	destroy(): any;
	getName(): string;
	getCallerPlugin(): IPlugin;
	isOfTypeInstance: boolean;
}
