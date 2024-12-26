import { useAddTagMutation, useUpdateTagMutation } from "@/entities/Support";
import { Button, IconButton, Input, Modal, Title } from "@telegram-apps/telegram-ui";
import { FC, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";

interface DeleteModalProps {
	// eslint-disable-next-line @typescript-eslint/ban-types
	refetch: Function;
	id?: string;
	mode: "create" | "update";
	value?: string;
}

export const CreateUpdateModal: FC<DeleteModalProps> = ({ refetch, id, mode, value }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [addTag, { isLoading: isAddTagLoading }] = useAddTagMutation();
	const [updateTag, { isLoading: isUpdateTagsLoading }] = useUpdateTagMutation();
	const [currentValue, setCurrentValue] = useState<string>("");

	useEffect(() => {
		setCurrentValue(value || "");
	}, []);

	const onSubmitHandle = async () => {
		try {
			if (mode === "create") {
				await addTag({ value: currentValue }).unwrap();
				refetch();
				setIsOpen(false);
			} else {
				await updateTag({ id: id ? id : "", value: currentValue }).unwrap();
				refetch();
				setIsOpen(false);
			}
			setCurrentValue("");
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<>
			<IconButton className="flex justify-center items-center" mode="bezeled" onClick={() => setIsOpen(true)}>
				{mode === "create" ? <FaPlus /> : <GrUpdate />}
			</IconButton>

			<Modal onOpenChange={setIsOpen} open={isOpen}>
				<Title className="text-center">{mode === "create" ? "Добавление тега" : "Изменение тега"}</Title>
				<Input
					placeholder="Название тега"
					required={mode === "create"}
					value={currentValue}
					onChange={(e) => setCurrentValue(e.target.value)}
				/>
				<div className="p-3">
					<Button stretched loading={isAddTagLoading || isUpdateTagsLoading} onClick={onSubmitHandle}>
						Подтвердить
					</Button>
				</div>
			</Modal>
		</>
	);
};
