import IProgram from './IProgram';
import IPlugin from '../../plugin/interface/IPlugin';

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
	getPluginByName(plugiName: string): any;
}
