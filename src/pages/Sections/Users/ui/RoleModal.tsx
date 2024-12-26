import { useSwitchRoleMutation } from "@/entities/User";
import { Role } from "@/entities/User/model/types/User";
import { Button, IconButton, Modal, Placeholder } from "@telegram-apps/telegram-ui";
import { FC, useState } from "react";
import { FaRegUser } from "react-icons/fa";

interface DeleteModalProps {
	// eslint-disable-next-line @typescript-eslint/ban-types
	refetch: Function;
	id: string;
}

export const RoleModal: FC<DeleteModalProps> = ({ refetch, id }) => {
	const [deleteRate, { isLoading }] = useSwitchRoleMutation();
	const [isOpen, setIsOpen] = useState(false);

	const handleSwitchRole = (role: Role) => async () => {
		try {
			await deleteRate({ id, role }).unwrap();
			refetch();
			setIsOpen(false);
		} catch (error) {
			console.error("Ошибка при switch role:", error);
		}
	};

	return (
		<>
			<IconButton className="flex justify-center items-center" mode="bezeled" onClick={() => setIsOpen(true)}>
				<FaRegUser />
			</IconButton>

			<Modal onOpenChange={setIsOpen} open={isOpen}>
				<Placeholder
					title="Вы уверены?"
					description="Удаленный тариф невозможно будет вернуть"
					action={
						<div className="grid grid-cols-3 gap-1 w-full">
							<Button
								mode="bezeled"
								className="w-full"
								style={{ fontSize: 12 }}
								stretched
								loading={isLoading}
								onClick={handleSwitchRole(Role.SUPPORT)}
							>
								Поддеркжа
							</Button>
							<Button
								mode="bezeled"
								className="w-full"
								stretched
								style={{ fontSize: 12 }}
								loading={isLoading}
								onClick={handleSwitchRole(Role.USER)}
							>
								Пользователь
							</Button>
							<Button
								mode="bezeled"
								className="w-full"
								stretched
								style={{ fontSize: 12 }}
								loading={isLoading}
								onClick={handleSwitchRole(Role.ADMIN)}
							>
								Админ
							</Button>
						</div>
					}
				>
					<img src="/WorkCat.gif" alt="Telegram Gif" className="w-40 h-40" />
				</Placeholder>
			</Modal>
		</>
	);
};
