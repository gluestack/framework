import IPlugin from './IPlugin';
import IApp from '../../app/interface/IApp';

export default interface IInstance {
	app: IApp;
	name: string;
	callerPlugin: IPlugin;
	init(): any;
	destroy(): any;
	getName(): string;
	getCallerPlugin(): IPlugin;
	isOfTypeInstance: boolean;
}
