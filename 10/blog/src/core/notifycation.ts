export enum NotifycationStatusType {
	none,
	success,
	error,
	pending,
}

export type NotifycationType = {
	status: NotifycationStatusType;
	title: string;
	message: string;
};
