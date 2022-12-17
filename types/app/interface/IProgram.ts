export default interface IProgram {
	command(command: string): () => any;
	description(description: string): () => any;
	action(callback: any): () => any;
}
