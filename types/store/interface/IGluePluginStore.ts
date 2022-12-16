export default interface IGluePluginStore {
	set(key: string, value: any): any;
	get(key: string): any;
}
