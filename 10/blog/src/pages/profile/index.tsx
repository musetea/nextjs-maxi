import { FC } from "react";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

const ProfilePage: FC = props => {
	return (
		<>
			<h1>Profile</h1>
			{JSON.stringify(props)}
		</>
	);
};
export default ProfilePage;

export const getServerSideProps: GetServerSideProps = async context => {
	const session = await getServerSession(context.req, context.res, authOptions);
	console.log(session);

	if (!session) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}
	return {
		props: {
			session,
		},
	};
};
