import { Document } from "mongodb";

export interface ContactType extends Document {
	email: string;
	name: string;
	message: string;
	createAt?: Date;
}
