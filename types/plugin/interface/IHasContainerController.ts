import IContainerController from './IContainerController';

export default interface IHasContainerController {
	containerController: IContainerController;
	getContainerController(): IContainerController;
}
