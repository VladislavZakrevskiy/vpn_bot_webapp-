import { Purchase } from "@/entities/Purchase";
import { Message, Ticket } from "@/entities/Support";

export interface UserSchema {
	user: User | null;
	tgUser: TgUser | null;
	tgInitData: Record<string, string> | null;

	_inited: boolean;
}

export interface TgUser {
	id: number;
	first_name: string;
	last_name?: string;
	username: string;
	language_code: string;
	allows_write_to_pm: boolean;
}

export interface User<isPurchases extends boolean = false> {
	id: string;
	tg_id: string;
	role: Role;
	vpn_uuid: string;
	is_active: boolean;
	was_trial: boolean;
	purchases: isPurchases extends true ? Purchase[] : undefined;
	vpn: {
		added_by_uuid: boolean;
		comment: string;
		current_usage_GB: number;
		ed25519_private_key: string;
		ed25519_public_key: string;
		enable: boolean;
		id: number;
		is_active: boolean;
		lang: string;
		last_online: string;
		last_reset_time: string;
		mode: string;
		name: string;
		package_days: number;
		start_date: string;
		telegram_id: number;
		usage_limit_GB: number;
		uuid: string;
		wg_pk: string;
		wg_psk: string;
		wg_pub: string;
	};
	messages?: Message[]
	tickets?: Ticket[]
}

export enum Role {
	ADMIN = 'ADMIN',
	USER = 'USER',
	SUPPORT = "SUPPORT"
}
