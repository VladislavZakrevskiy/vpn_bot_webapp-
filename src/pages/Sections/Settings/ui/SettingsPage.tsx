import { Settings, useGetSettingsQuery, useUpdateSettingsMutation } from "@/entities/Settings";
import { hasChanges } from "@/shared/lib/helpers/hasChanges";
import { PageLoader } from "@/widgets/PageLoader";
import { Button, Cell, Input, Multiselectable, Text, Title } from "@telegram-apps/telegram-ui";
import { useEffect, useState } from "react";

const SettingsPage = () => {
	const { isLoading: isGetLoading, data: settings, refetch } = useGetSettingsQuery();
	const [currentSettings, setCurrentSettings] = useState<Settings | null>(null);
	const [mode, setMode] = useState<"read" | "edit">("read");
	const [updateSettings, { isLoading: isUpdateLoading }] = useUpdateSettingsMutation();

	useEffect(() => {
		if (settings) {
			setCurrentSettings(settings);
		}
	}, [settings]);

	if (isGetLoading || isUpdateLoading) return <PageLoader />;
	if (!currentSettings)
		return (
			<div className="w-screen h-screen flex justify-center items-center">
				<Title>Простите, случилась ошибка, попробуй зайти чуть позже</Title>
			</div>
		);

	const onSubmit = async () => {
		setMode("read");
		if (!hasChanges(currentSettings, settings)) {
			return;
		}
		await updateSettings(currentSettings);
		await refetch();
	};

	return (
		<div className="flex-col gap-3 items-start">
			<form onSubmit={onSubmit}>
				<div className="w-full flex justify-end">
					<Button
						type={mode === "edit" ? "submit" : undefined}
						onClick={() => setMode((prev) => (prev === "read" ? "edit" : "read"))}
					>
						{mode === "read" ? "Редактировать" : "Подтвердить изменения"}
					</Button>
				</div>
				<Input required disabled={mode === "read"} placeholder="Proxy Path (admin)" />
				<Input required disabled={mode === "read"} placeholder="Proxy Path (user)" />
				<Input required disabled={mode === "read"} placeholder="Макс. сертификатов" />
				<Cell
					Component="label"
					before={<Multiselectable disabled={mode === "read"} name="multiselect" />}
					description="Pass Component='label' to Cell to make it clickable."
					multiline
				>
					Оплата картой
				</Cell>
				<Cell
					Component="label"
					before={<Multiselectable disabled={mode === "read"} name="multiselect" />}
					description="Pass Component='label' to Cell to make it clickable."
					multiline
				>
					Оплата Stars ⭐
				</Cell>
				<Cell
					Component="label"
					before={<Multiselectable disabled={mode === "read"} name="multiselect" />}
					description="Pass Component='label' to Cell to make it clickable."
					multiline
				>
					Оплата Crypto Pay
				</Cell>
				<div className="p-2">
					<Text>Виды принимаемой криптовалюты</Text>
					{currentSettings.is_crypto_enable &&
						currentSettings.crypto_types.map(() => (
							<Input required disabled={mode === "read"} placeholder="Доступная оплата (Crypto Bot)" />
						))}
					<Button stretched>+</Button>
				</div>
			</form>
		</div>
	);
};

export default SettingsPage;
