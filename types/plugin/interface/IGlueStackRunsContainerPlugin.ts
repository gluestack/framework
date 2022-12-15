import GlueStackContainerRunner from '../../../lib/plugins/GlueStackContainerRunner';

export default interface IGlueStackRunsContainerPlugin {
	containerRunner: any;
	setContainerRunner(): GlueStackContainerRunner;
}
