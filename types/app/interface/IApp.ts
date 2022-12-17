import IProgram from './IProgram';

export default interface IApp {
	addCommand(command: (program: any) => void): any;
	doctor(): any;
	dispatchEvent(eventName: string): any;
	addEventListener(eventName: string, callback: any): any;
	createPluginInstance(src: string, target: string): any;
}
