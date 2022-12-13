import IGlueStackPlugin from '@gluestack/framework/types/plugin/interface';
//@ts-ignore
import packageJSON from "../package.json";
import { postInstall } from "./postInstall";

export class GlueStackPlugin implements IGlueStackPlugin {
	name: string = 'My Plugin';
	 
	getVersion(): string {
		return packageJSON.version;
	}
	
	getConfig(): string {
		return './.env';
	}
	
	getDockerFile(): string {
		return './Dockerfile';
	}
	
	getYmlFile(): string {
		return './my-plugin.yml';
	}

	runBootstrap() {
		console.log(`Booting ${this.name}...`);
	}

	async runPostInstall(target: string) {
		return await postInstall(target);
	}
	
	getTemplateFolder(): string {
		return './src';
	}
	
	getEnv(): string {
		return './env';
	}
}
