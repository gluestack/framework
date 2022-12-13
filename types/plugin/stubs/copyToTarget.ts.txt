import * as fs from "fs";
const path = require("path");

const fileExists = (filePath: string) =>
  fs.existsSync(filePath) ? true : false;

const createFolder = async (_folder: any) => {
  await fs.mkdirSync(_folder, { recursive: true });

  return Promise.resolve(true);
};

const copyFile = async (source: string, target: string) => {
  let targetFile = target;

  // If target is a directory, a new file with the same name will be created
  if (fileExists(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      targetFile = path.join(target, path.basename(source));
    }
  }

  await fs.writeFileSync(targetFile, fs.readFileSync(source));
};

const copyFolder = async (source: string, target: string, depth = 0) => {
  if (!source.includes(".git")) {
    let files = [];

    // Check if folder needs to be created or integrated
    const targetFolder = path.join(target, path.basename(depth ? source : "."));
    if (!(await fileExists(targetFolder))) {
      await createFolder(targetFolder);
    }

    // Copy
    if (
      fs.lstatSync(source).isDirectory() ||
      fs.lstatSync(source).isSymbolicLink()
    ) {
      files = fs.readdirSync(source);
      files.forEach(async (file) => {
        let curSource = path.join(source, file);
        if (fs.lstatSync(curSource).isDirectory()) {
          await copyFolder(curSource, targetFolder, depth++);
        } else {
          await copyFile(curSource, targetFolder);
        }
      });
    }
  }
};

export async function copyToTarget(sourceFolder: string, targetFolder: string) {
  await copyFolder(sourceFolder, targetFolder);
}
