import IApp from "@gluestack/framework/types/app/interface/IApp";
import IInstance from "@gluestack/framework/types/plugin/interface/IInstance";
import IContainerController from "@gluestack/framework/types/plugin/interface/IContainerController";

export class PluginInstanceContainerController implements IContainerController
{
  app: IApp;
  status: "up" | "down" = "down";
  portNumber: number;
  containerId: string;
  callerInstance: IInstance;

  constructor(app: IApp, callerInstance: IInstance) {
    this.app = app;
    this.callerInstance = callerInstance;
    this.setStatus(this.callerInstance.gluePluginStore.get("status"));
    this.setPortNumber(this.callerInstance.gluePluginStore.get("port_number"));
    this.setContainerId(
      this.callerInstance.gluePluginStore.get("container_id"),
    );
  }

  getCallerInstance(): IInstance {
    return this.callerInstance;
  }

  getEnv() {
    return "MY_VAR=5";
  }

  getDockerJson() {
    return {
      "name": "MY_NAME"
    };
  }

  getStatus(): "up" | "down" {
    return this.status;
  }

  getPortNumber(): number {
    return this.portNumber;
  }

  getContainerId(): string {
    return this.containerId;
  }

  setStatus(status: "up" | "down") {
    this.callerInstance.gluePluginStore.set("status", status || "down");
    return (this.status = status || "down");
  }

  setPortNumber(portNumber: number) {
    this.callerInstance.gluePluginStore.set("port_number", portNumber || null);
    return (this.portNumber = portNumber || null);
  }

  setContainerId(containerId: string) {
    this.callerInstance.gluePluginStore.set(
      "container_id",
      containerId || null,
    );
    return (this.containerId = containerId || null);
  }

  getConfig(): any {}

  async up() {
    return new Promise((resolve, reject) => {
      // this.setStatus("up");
      // this.setPortNumber(portNumber);
      // this.setContainerId(containerId);
      return resolve(true);
    });
  }

  async down() {
    return new Promise((resolve, reject) => {
      // this.setStatus("down");
      // this.setPortNumber(null);
      // this.setContainerId(null);
      return resolve(true);
    });
  }

  async build() {
    //
  }
}
