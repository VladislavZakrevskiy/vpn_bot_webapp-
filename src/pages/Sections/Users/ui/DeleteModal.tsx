import { useDeleteUserMutation } from "@/entities/User";
import { Button, IconButton, Modal, Placeholder } from "@telegram-apps/telegram-ui";
import { FC, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";

interface DeleteModalProps {
	// eslint-disable-next-line @typescript-eslint/ban-types
	refetch: Function;
	id: string;
}

export const DeleteModal: FC<DeleteModalProps> = ({ refetch, id }) => {
	const [deleteRate, { isLoading }] = useDeleteUserMutation();
	const [isOpen, setIsOpen] = useState(false);

	const handleDeleteRate = async () => {
		try {
			await deleteRate({ id }).unwrap();
			refetch();
		} catch (error) {
			console.error("Ошибка при удалении:", error);
		}
	};

	return (
		<>
			<IconButton className="flex justify-center items-center" mode="bezeled" onClick={() => setIsOpen(true)}>
				<MdDeleteOutline />
			</IconButton>

			<Modal onOpenChange={setIsOpen} open={isOpen}>
				<Placeholder
					title="Вы уверены?"
					description="Удаленный тариф невозможно будет вернуть"
					action={
						<div className="grid grid-cols-2 gap-1 w-full">
							<Button className="w-full" stretched loading={isLoading} onClick={() => setIsOpen(false)}>
								Отмена
							</Button>
							<Button
								className="w-full"
								style={{ backgroundColor: "var(--tgui--destructive_text_color)" }}
								loading={isLoading}
								onClick={handleDeleteRate}
							>
								Удалить
							</Button>
						</div>
					}
				>
					<img src="/AnimatedSticker-ezgif.com-gif-maker.gif" alt="Telegram Gif" className="w-40 h-40" />
				</Placeholder>
			</Modal>
		</>
	);
};
