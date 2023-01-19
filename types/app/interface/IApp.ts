import IProgram from './IProgram';
import IPlugin from '../../plugin/interface/IPlugin';
import IHasContainerController from '../../plugin/interface/IHasContainerController';

export default interface IApp {
	addCommand(command: (program: any) => void): any;
	doctor(): any;
	dispatchEvent(eventName: string): any;
	addEventListener(eventName: string, callback: any): any;
	createPluginInstance(
		plugin: IPlugin,
		instanceName: string,
		src: string,
		target: string
	): any;
	getPluginByName(pluginName: string): any;
	getContainerTypePluginInstances(
		bottomToTop?: boolean,
		returnWithTree?: boolean
	): (IPlugin & IHasContainerController)[];
}
