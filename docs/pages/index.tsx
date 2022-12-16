export default function () {}
import { versions } from "../versions.json";

export async function getServerSideProps(context: any) {
  let version = Object.keys(versions[versions.length - 1])[0];
  return {
    redirect: {
      permanent: true,
      destination: "/" + version,
    },
  };
}
