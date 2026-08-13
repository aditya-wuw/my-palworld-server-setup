import chokidar from "chokidar";
import { file } from "../index.ts";
import path from "node:path";

export const FolderWatcher = () => {
  const Dir = "/backups";

  const watcher = chokidar.watch(Dir, {
    ignored: (path, stats) =>
      Boolean(stats?.isFile() && !path.endsWith(".tar.gz")), // only watch tar zip files
    persistent: true,
    ignoreInitial: true,
    awaitWriteFinish: {
      stabilityThreshold: 2000,
      pollInterval: 100,
    },
  });

  watcher
    .on("add", (filepath) => {
      console.log(`Directory ${filepath} has been added`);
      UploadAndDelete(filepath);
    })
    .on("unlinkDir", (filepath) =>
      console.log(`Directory ${filepath} has been removed`),
    )
    .on("error", (error) => console.log(`Watcher error: ${error}`));
};

const UploadAndDelete = async (filepath: string) => {
  try {
    const UploadEndPoint = process.env.UPLOAD_PATH;
    const FileName = path.basename(filepath);
    const Filedata = await file.readFile(filepath);
    const formdata = new FormData();
    formdata.append("file", new Blob([Filedata]), FileName);

    const res = await fetch(`${UploadEndPoint}/api/backup`, {
      method: "POST",
      body: formdata,
    });
    if (!res.ok) {
      throw new Error(`Upload failed with status ${res.status}`);
    }
    await file.unlink(filepath);
  } catch (e) {
    console.error(`Somthing went wrong :${e}`);
  }
};
