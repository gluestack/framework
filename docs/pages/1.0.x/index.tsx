export default function () {}
import { indexSlugFileName } from '../../docs.config';

export async function getServerSideProps(context: any) {
	return {
		redirect: {
			permanent: false,
			destination: context.resolvedUrl + '/' + indexSlugFileName,
		},
	};
}
