import { useDeleteTagMutation } from "@/entities/Support";
import { Button, IconButton, Modal, Placeholder } from "@telegram-apps/telegram-ui";
import { FC, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";

interface DeleteModalProps {
	// eslint-disable-next-line @typescript-eslint/ban-types
	refetch: Function;
	id: string;
}

export const DeleteTagModal: FC<DeleteModalProps> = ({ refetch, id }) => {
	const [deleteTag, { isLoading: isDeleteTagLoading }] = useDeleteTagMutation();
	const [isOpen, setIsOpen] = useState(false);

	const handleDeleteTag = () => async () => {
		try {
			await deleteTag(id).unwrap();
			setIsOpen(false);
			refetch();
		} catch (error) {
			console.error("Ошибка при switch role:", error);
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
					description="Удаленный тег невозможно будет вернуть"
					action={
						<div className="grid grid-cols-2 gap-1 w-full">
							<Button className="w-full" stretched loading={isDeleteTagLoading} onClick={() => setIsOpen(false)}>
								Отмена
							</Button>
							<Button
								className="w-full"
								style={{ backgroundColor: "var(--tgui--destructive_text_color)" }}
								loading={isDeleteTagLoading}
								onClick={handleDeleteTag}
							>
								Удалить
							</Button>
						</div>
					}
				>
					<img src="/ThinkDuck.gif" alt="Telegram Gif" className="w-40 h-40" />
				</Placeholder>
			</Modal>
		</>
	);
};
