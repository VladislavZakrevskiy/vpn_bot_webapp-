import { Settings, useGetSettingsQuery, useUpdateSettingsMutation } from "@/entities/Settings";
import { hasChanges } from "@/shared/lib/helpers/hasChanges";
import { PageLoader } from "@/widgets/PageLoader";
import { Button, Cell, IconButton, Input, Multiselectable, Text, Title } from "@telegram-apps/telegram-ui";
import { useEffect, useState } from "react";
import { MdOutlineCancel } from "react-icons/md";

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
				{JSON.stringify(settings)}
			</div>
		);

	const onSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setMode(mode === "edit" ? "read" : "edit");
		if (mode === "read") {
			return;
		}
		if (!hasChanges(currentSettings, settings)) {
			return;
		}
		await updateSettings(currentSettings);
		await refetch();
	};
	console.log(currentSettings);

	return (
		<div className="flex-col gap-3 items-start">
			<div>
				<div className="w-full flex justify-end p-3">
					<Button onClick={onSubmit} type={mode === "edit" ? "submit" : undefined}>
						{mode === "read" ? "Редактировать" : "Подтвердить изменения"}
					</Button>
				</div>
				<Input
					value={currentSettings.admin_proxy_path}
					onChange={(e) => setCurrentSettings((prev) => ({ ...prev!, admin_proxy_path: e.target.value }))}
					required
					disabled={mode === "read"}
					header="Proxy Path (admin)"
				/>
				<Input
					value={currentSettings.user_proxy_path}
					onChange={(e) => setCurrentSettings((prev) => ({ ...prev!, user_proxy_path: e.target.value }))}
					required
					disabled={mode === "read"}
					header="Proxy Path (user)"
				/>
				<Input
					value={currentSettings.max_sert || ""}
					onChange={(e) => setCurrentSettings((prev) => ({ ...prev!, max_sert: +e.target.value }))}
					required
					disabled={mode === "read"}
					header="Макс. сертификатов"
				/>
				<Cell
					onClick={
						mode === "read"
							? undefined
							: () => setCurrentSettings((prev) => ({ ...prev!, is_cart_enable: !prev!.is_cart_enable }))
					}
					Component="label"
					disabled={mode === "read"}
					before={
						<Multiselectable
							checked={currentSettings.is_cart_enable}
							disabled={mode === "read"}
							// onClick={() => setCurrentSettings((prev) => ({ ...prev!, is_crypto_enable: !prev!.is_crypto_enable }))}
							onChange={() => setCurrentSettings((prev) => ({ ...prev!, is_cart_enable: !prev!.is_cart_enable }))}
						/>
					}
				>
					Оплата картой
				</Cell>
				<Cell
					onClick={
						mode === "read"
							? () => {}
							: () => setCurrentSettings((prev) => ({ ...prev!, is_star_enable: !prev!.is_star_enable }))
					}
					Component="label"
					disabled={mode === "read"}
					before={
						<Multiselectable
							checked={currentSettings.is_star_enable}
							disabled={mode === "read"}
							onChange={() => setCurrentSettings((prev) => ({ ...prev!, is_star_enable: !prev!.is_star_enable }))}
						/>
					}
				>
					Оплата Stars ⭐
				</Cell>
				<Cell
					disabled={mode === "read"}
					onClick={
						mode === "read"
							? () => {}
							: () => setCurrentSettings((prev) => ({ ...prev!, is_crypto_enable: !prev!.is_crypto_enable }))
					}
					Component="label"
					before={
						<Multiselectable
							checked={currentSettings.is_crypto_enable}
							disabled={mode === "read"}
							onChange={() => setCurrentSettings((prev) => ({ ...prev!, is_crypto_enable: !prev!.is_crypto_enable }))}
						/>
					}
				>
					Оплата Crypto Pay
				</Cell>
				<div className="p-[22px]">
					<Text>Виды принимаемой криптовалюты</Text>
					{currentSettings.is_crypto_enable &&
						currentSettings.crypto_types.map((crypto_type, i) => (
							<Input
								after={
									mode === "edit" && (
										<IconButton
											mode="plain"
											onClick={() =>
												setCurrentSettings((prev) => ({
													...prev!,
													crypto_types: prev!.crypto_types.filter((_, index) => index !== i),
												}))
											}
										>
											<MdOutlineCancel />
										</IconButton>
									)
								}
								value={crypto_type}
								onChange={(e) =>
									setCurrentSettings((prev) => ({
										...prev!,
										crypto_types: prev!.crypto_types.map((value, index) => (index === i ? e.target.value : value)),
									}))
								}
								required
								disabled={mode === "read"}
								placeholder="Доступная оплата (Crypto Bot)"
							/>
						))}
					<Button
						disabled={mode === "read"}
						stretched
						onClick={() => setCurrentSettings((prev) => ({ ...prev!, crypto_types: [...prev!.crypto_types, ""] }))}
					>
						+
					</Button>
				</div>
			</div>
		</div>
	);
};

export default SettingsPage;
