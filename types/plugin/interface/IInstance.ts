import IPlugin from './IPlugin';

export default interface IInstance {
	app: any;
	name: string;
	callerPlugin: IPlugin;
	getName(): string;
	getCallerPlugin(): IPlugin;
	isOfTypeInstance: boolean;
}
