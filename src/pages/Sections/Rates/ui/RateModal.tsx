import { Rate, RateCreateInput, RateUpdateInput } from "@/entities/Rate";
import { useAddRateMutation, useUpdateRateMutation } from "@/entities/Rate/api/rates.api";
import { Button, Input, Modal, Title } from "@telegram-apps/telegram-ui";
import { FC, useState } from "react";

interface RateModalProps {
	mode: "create" | "update";
	rate?: Rate;
	// eslint-disable-next-line @typescript-eslint/ban-types
	refetch: Function;
}

export const RateModal: FC<RateModalProps> = ({ mode, rate, refetch }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [newRate, setNewRate] = useState<RateCreateInput>({
		name: "",
		price: 0,
		description: "",
		expiresIn: 0,
		GB_limit: 0,
		max_devices: 0,
		MB_speed: 0,
		price_XTR: 0,
	});
	const [updatedRate, setUpdatedRate] = useState<RateUpdateInput>(rate!);
	const [addRate, { isLoading: isCreateLoading }] = useAddRateMutation();
	const [updateRate, { isLoading: isUpdateLoading }] = useUpdateRateMutation();

	const handleAddRate = async () => {
		try {
			await addRate(newRate).unwrap();
			setNewRate({
				name: "",
				price: 0,
				description: "",
				expiresIn: 0,
				GB_limit: 0,
				max_devices: 0,
				MB_speed: 0,
				price_XTR: 0,
			});
		} catch (error) {
			console.error("Ошибка при добавлении:", error);
		}
	};

	const handleUpdateRate = async () => {
		try {
			await updateRate({
				where: { id: updatedRate.id || "" },
				data: updatedRate,
			}).unwrap();
		} catch (error) {
			console.error("Ошибка при обновлении:", error);
		}
	};

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			if (mode === "create") handleAddRate();
			else handleUpdateRate();
			setIsOpen(false);
			refetch();
		} catch (e) {
			console.log(e);
		}
	};

	const handleUpdateInput = (key: keyof Rate, value: string) => {
		if (mode === "create") {
			setNewRate((prev) => ({
				...prev,
				[key]: typeof newRate[key as keyof RateCreateInput] === "number" ? +value : value,
			}));
		} else {
			setUpdatedRate((prev) => ({
				...prev,
				[key]: typeof newRate[key as keyof RateCreateInput] === "number" ? +value : value,
			}));
		}
	};

	const getValue = (key: keyof Rate) =>
		mode === "create" ? newRate[key as keyof RateCreateInput] : updatedRate[key as keyof RateCreateInput];

	return (
		<>
			<Button size={mode === "create" ? "m" : "s"} onClick={() => setIsOpen(true)}>
				{mode === "create" ? "Добавить" : "Изменить"}
			</Button>

			<Modal onOpenChange={setIsOpen} open={isOpen}>
				<Title className="p-[22px]">{mode === "create" ? "Создание тарифа" : "Обновление тарифа"}</Title>
				<form onSubmit={onSubmit}>
					<Input
						required={mode === "create"}
						header={"Название"}
						value={getValue("name")}
						onChange={(e) => handleUpdateInput("name", e.target.value)}
					/>
					<Input
						required={mode === "create"}
						header={"Описание"}
						value={getValue("description")}
						onChange={(e) => handleUpdateInput("description", e.target.value)}
					/>
					<Input
						required={mode === "create"}
						header={"Срок (в днях)"}
						value={getValue("expiresIn")}
						onChange={(e) => handleUpdateInput("expiresIn", e.target.value)}
					/>
					<Input
						required={mode === "create"}
						header={"Лимит ГБ"}
						value={getValue("GB_limit")}
						onChange={(e) => handleUpdateInput("GB_limit", e.target.value)}
					/>
					<Input
						required={mode === "create"}
						header={"Скорость ГБит"}
						value={getValue("MB_speed")}
						onChange={(e) => handleUpdateInput("MB_speed", e.target.value)}
					/>
					<Input
						required={mode === "create"}
						header={"Макс. устройств"}
						value={getValue("max_devices")}
						onChange={(e) => handleUpdateInput("max_devices", e.target.value)}
					/>
					<Input
						required={mode === "create"}
						header={"Цена в руб."}
						value={getValue("price")}
						onChange={(e) => handleUpdateInput("price", e.target.value)}
					/>
					<Input
						required={mode === "create"}
						header={"Цена в ⭐"}
						value={getValue("price_XTR")}
						onChange={(e) => handleUpdateInput("price_XTR", e.target.value)}
					/>
					<div className="p-[22px]">
						<Button type="submit" loading={isCreateLoading || isUpdateLoading} stretched>
							{mode === "create" ? "Добавить" : "Изменить"}
						</Button>
					</div>
				</form>
			</Modal>
		</>
	);
};
